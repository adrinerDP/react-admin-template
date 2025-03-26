import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Result } from '@/types/common.types.ts';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const runResult = async <R>(promise: Promise<R>): Promise<Result<R>> => {
  try {
    const value = await promise;
    return { type: 'success', value };
  } catch (error) {
    return { type: 'failure', error };
  }
};
