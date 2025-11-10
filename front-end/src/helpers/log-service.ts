export const logService: typeof console.log = (...props) => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(...props);
  }
};
