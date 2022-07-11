import axios from "axios";

const { reqitoAuthUrl } = process.env;

export async function validateToken(token: string) {
  const result = await axios({
    method: "post",
    url: `${reqitoAuthUrl}/validateToken`,
    data: {
      token,
    },
  });

  return result.data;
}
