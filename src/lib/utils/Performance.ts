/* eslint-disable @typescript-eslint/no-explicit-any */
export const Performance = async <
  F extends (...args: any[]) => ReturnType<F> | Promise<ReturnType<F>>
>(
  callback: F,
  ...args: Parameters<F>
): Promise<ReturnType<F>> => {
  let ret: ReturnType<F> | undefined;

  console.time(callback.name);
  try {
    ret = await callback(...args);
  } finally {
    console.timeEnd(callback.name);
  }

  return ret;
};
