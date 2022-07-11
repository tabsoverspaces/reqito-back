export function buildResponse(data: any, statusCode: number = 200) {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Headers": "Authorization",
    },
    body: JSON.stringify(data),
  };
}

export function buildRedirectResponse(url: string) {
  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Location: url,
    },
    statusCode: 302,
  };
}

export function buildErrorResponse(error: string, statusCode: number) {
  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    statusCode,
    error,
  };
}

export function jsonErrorResponse(error: string, statusCode: number) {
  return JSON.stringify(buildErrorResponse(error, statusCode));
}
