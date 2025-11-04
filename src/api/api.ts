import ky from "ky";

import { getAccessToken } from "@/lib/storage/secure-cookies";

export const api = ky.create({
  prefixUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  throwHttpErrors: false,
  hooks: {
    beforeRequest: [
      async (request): Promise<void> => {
        const token = await getAccessToken();

        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
});
