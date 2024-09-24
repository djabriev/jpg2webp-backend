class JoiError extends Error {}
class CustomError extends Error {}

const returnError = (message: string) => {
  return { error: message, status: 'error' };
};

const reportError = (error: Error, clientSide = false) => {
  const errorMessage = `[ERROR] ${error.name}\n${error.message}\n${error.stack}\n[END ERROR]`;

  if (clientSide) {
    console.info(errorMessage);
  } else {
    console.error(errorMessage);
  }
};

export { JoiError, CustomError, returnError, reportError };
