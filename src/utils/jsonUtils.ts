export function isValidJson(str: string) {
  if (str.length === 0) {
    return true;
  }

  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
