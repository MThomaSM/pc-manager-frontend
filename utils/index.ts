import {toast, ToastOptions} from "react-toastify";

export const toastErrors = (errors?: string|string[], options?: ToastOptions<{}> | undefined) => {
  if (typeof errors === 'string') {
    toast.error(errors, options);
  } else if (Array.isArray(errors)) {
    errors.forEach((error: string) => {
      toast.error(error, options);
    });
  }
}

export const calculateDifferenceInSeconds = (lastActiveAt: number, currentDate: string = new Date().toISOString()): number => {
    const currentTime = new Date(currentDate);
    const activeAt = new Date(lastActiveAt * 1000); // Convert Unix timestamp to milliseconds
    return (currentTime.getTime() - activeAt.getTime()) / 1000;
}