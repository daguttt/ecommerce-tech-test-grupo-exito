import { type Result, ResultAsync, err, ok } from "neverthrow";
import type { z } from "zod";

import { env } from "~/env";

type NetworkError = { type: "NETWORK_ERROR"; message: string; cause: unknown };

type HttpError = { type: "HTTP_ERROR"; message: string; response: Response };
type JsonParseError = {
	type: "JSON_PARSE_ERROR";
	message: string;
	cause: unknown;
};

type BodySchemaMismatchError = {
	type: "BODY_SCHEMA_MISMATCH_ERROR";
	message: string;
	cause: unknown;
};

function fetchWithErrors(
	url: string,
	requestInit?: RequestInit,
): ResultAsync<Response, NetworkError | HttpError> {
	const baseRequestInit: RequestInit = {
		signal: AbortSignal.timeout(5000),
		...requestInit,
	};

	return ResultAsync.fromPromise(
		fetch(url, baseRequestInit),
		(error): NetworkError => ({
			type: "NETWORK_ERROR",
			message: "A network error occurred while fetching products",
			cause: error,
		}),
	).andThen((response) => {
		if (!response.ok)
			return err({
				type: "HTTP_ERROR",
				message: `Response failed with status ${response.status}: ${response.statusText}`,
				response,
			} satisfies HttpError);
		return ok(response);
	});
}

function responseToJson(
	response: Response,
): ResultAsync<unknown, JsonParseError> {
	return ResultAsync.fromPromise(
		response.json() as Promise<unknown>,
		(error): JsonParseError => ({
			type: "JSON_PARSE_ERROR",
			message: "Error parsing JSON",
			cause: error,
		}),
	);
}

function parseResponseBodyWithSchema<TBodyResponse>(
	schema?: z.ZodSchema<TBodyResponse>,
): (body: unknown) => Result<TBodyResponse, BodySchemaMismatchError> {
	return (body: unknown) => {
		if (!schema) return ok(body as TBodyResponse);

		// `schema.parse()` throws error in development for debugging
		if (env.NEXT_PUBLIC_ENVIRONMENT === "development")
			return ok(schema.parse(body));

		const result = schema.safeParse(body);
		if (!result.success)
			return err({
				type: "BODY_SCHEMA_MISMATCH_ERROR",
				message: "The response body does not match the expected schema",
				cause: result.error,
			} satisfies BodySchemaMismatchError);
		return ok(result.data as TBodyResponse);
	};
}

export function fetchApi<TBodyResponse>({
	path,
	requestInit,
	schema,
	throwOnError = false,
}: {
	path: string;
	requestInit?: RequestInit;
	schema?: z.ZodSchema<TBodyResponse>;
	throwOnError?: boolean;
}) {
	return fetchWithErrors(`${env.NEXT_PUBLIC_API_URL}${path}`, requestInit)
		.andThen(responseToJson)
		.andThrough(parseResponseBodyWithSchema(schema))
		.map((data) => data as TBodyResponse)
		.mapErr((err) => {
			if (throwOnError) throw err;
			return err;
		});
}
