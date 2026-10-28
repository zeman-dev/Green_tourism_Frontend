
import { api } from '@/app/api/api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '@/app/api/_utils/utils';
import { parseSetCookie } from 'cookie';

///// {CHECK SESSION} /////

export async function checkSession() {
  const cookieStore = await cookies();

  try {
    const apiRes = await api.get('auth/refresh', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    const setCookie = apiRes.headers['set-cookie'];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

      for (const cookieStr of cookieArray) {
        const parsed = parseSetCookie(cookieStr);

        if (parsed.value) {
          cookieStore.set(parsed.name, parsed.value, parsed);
        }
      }
    }

    return apiRes;
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      if (error.response) {
        return error.response;
      }
    } else {
      logErrorResponse({ message: (error as Error).message });
    }

    throw error;
  }
}
