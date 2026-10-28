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
        Cookie: cookieStore.toString(), // передаємо всі куки як є —
                                          // бекенд сам вирішить, який токен валідний
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

    return apiRes; // завжди повний AxiosResponse
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      if (error.response) {
        return error.response; // теж повний AxiosResponse, просто з кодом помилки (401 і т.д.)
      }
    } else {
      logErrorResponse({ message: (error as Error).message });
    }
    throw error; // немає навіть response (мережева помилка) — прокидаємо далі
  }
}