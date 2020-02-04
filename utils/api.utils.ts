export const apiResponse = (success, data) => {
  return JSON.stringify({
    success,
    data,
  });
}
