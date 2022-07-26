import axios from "axios";

const { reqitoAuthUrl } = process.env;

interface TokenValidationResponse {
  errorMessage?: string;
  body?: string;
}

async function validation(token: string): Promise<TokenValidationResponse> {
  const result = await axios({
    method: "post",
    url: `${reqitoAuthUrl}/validateToken`,
    data: {
      token,
    },
  });

  return result.data;
}

export interface TokenValidationSuccessful {
  email: string;
  token: string;
}

export interface TokenValidationFailed {
  error: string;
}

export async function validateToken(
  token: string
): Promise<TokenValidationSuccessful | TokenValidationFailed> {
  const validToken = await validation(token);

  // Error returning code is duplicated on purpose,
  // to keep error handling clean and not overwrite the first error with the second.

  let error;

  if (validToken.errorMessage) {
    error = validToken.errorMessage;
    return { error };
  }

  if (!validToken.body) {
    error = "Token validation failed";
    return { error };
  }

  const { email } = JSON.parse(validToken.body).payload;

  return { email, token };
}
