/**
 * Converts Next.js search parameters to URLSearchParams
 * 
 * Handles different value types:
 * - string: converted to [key, value] pair
 * - string[]: converted to multiple [key, value] pairs (one for each array element)
 * - undefined: filtered out completely
 * 
 * @param nextjsSearchParams - Object containing search parameters from Next.js
 * @returns URLSearchParams instance with all valid parameters
 */
export function toUrlSearchParams(nextjsSearchParams: { [key: string]: string | string[] | undefined }): URLSearchParams {
  const keyValuePairs: string[][] = Object.entries(nextjsSearchParams)
    .filter((entry): entry is [string, string | string[]] => entry[1] !== undefined)
    .flatMap(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((v) => [key, v] as [string, string]);
      }

      return [[key, value] as [string, string]];
    });

  // Create URLSearchParams from the key-value pairs
  return new URLSearchParams(keyValuePairs);
}