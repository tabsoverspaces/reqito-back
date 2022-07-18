import axios from "axios";

const { reqitoAuthUrl } = process.env;

interface TokenValidationResponse {
  errorMessage?: string;
  body?: string;
}

export async function validateToken(
  token: string
): Promise<TokenValidationResponse> {
  const result = await axios({
    method: "post",
    url: `${reqitoAuthUrl}/validateToken`,
    data: {
      token,
    },
  });

  return result.data;
}
