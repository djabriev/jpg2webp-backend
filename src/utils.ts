class JoiError extends Error {}

const returnError = (message: string) => {
  return { error: message, status: 'error' };
};

const reportError = (error: Error) => {
  console.error(
    `[ERROR] ${error.name}\n${error.message}\n${error.stack}\n[END ERROR]`
  );
};

export { JoiError, returnError, reportError };
