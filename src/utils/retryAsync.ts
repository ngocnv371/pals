export async function retryAsync<T>(
  promiseFn: () => Promise<T>,
  maxAttempts = 3,
  delay = 1000
) {
  let attempt = 0;

  while (attempt < maxAttempts) {
    try {
      return await promiseFn();
    } catch (err) {
      attempt++;
      if (attempt === maxAttempts) {
        throw err;
      }

      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= 2;
    }
  }
}
