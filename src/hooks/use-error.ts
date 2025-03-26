import { HTTPError } from 'ky';
import { useToast } from '@/hooks/use-toast.ts';
import { useCallback } from 'react';
import { HTTPErrorMessageCode } from '@/types/http-error.types.ts';

type ErrorMessage = { title: string; description?: string };

type ErrorMessages = Partial<
  Record<HTTPErrorMessageCode, { title: string; description?: string }>
>;

type HandleErrorOptions = {
  defaultMessage?: { title: string; description?: string };
  messages?: ErrorMessages;
};

const UNKNOWN_ERROR: ErrorMessage = {
  title: '오류 발생',
  description: '잠시 후 다시 시도해주세요.',
};

const NETWORK_ERROR: ErrorMessage = {
  title: '네트워크 오류',
  description: '서버와의 통신 중 문제가 발생했습니다.',
};

export const useError = (options?: HandleErrorOptions) => {
  const { toast } = useToast();

  const handleHTTPError = useCallback(
    async (error: unknown) => {
      if (error instanceof HTTPError) {
        const errorData = await error.response.json<{
          message: HTTPErrorMessageCode;
        }>();

        const payload: ErrorMessage =
          options?.messages?.[errorData.message] ||
          options?.defaultMessage ||
          UNKNOWN_ERROR;

        toast({ variant: 'destructive', ...payload });
      } else {
        const payload: ErrorMessage = options?.defaultMessage || NETWORK_ERROR;
        toast({ variant: 'destructive', ...payload });
      }
    },
    [options, toast],
  );

  return { handleHTTPError };
};
