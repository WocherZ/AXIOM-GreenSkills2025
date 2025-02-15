export function isValidJSON(text: string) {
  try {
    JSON.parse(text);
    return true;
  } catch (e: any) {
    console.log(e);
    return false;
  }
}
