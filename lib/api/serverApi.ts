import { isAxiosError } from 'axios';
import type { AxiosResponse } from 'axios';

import { api } from '@/app/api/api';
import { logErrorResponse } from '@/app/api/_utils/utils';

export type CheckSessionResult =
  | { ok: true; response: AxiosResponse }
  | { ok: false; error: unknown };

///// {CHECK SESSION} /////

export async function checkSession(
  cookieHeader: string
): Promise<CheckSessionResult> {
  try {
    const response = await api.post('auth/refresh', null, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return { ok: true, response };
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(
        error.response?.data ?? {
          status: error.response?.status,
          message: error.message,
        }
      );
    } else {
      logErrorResponse({ message: (error as Error).message });
    }

    return { ok: false, error };
  }
}
