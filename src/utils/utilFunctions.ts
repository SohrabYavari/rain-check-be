//? sql arrays are in object brackets??
//? need to have util function to make [] to {}
//* e.g., ["sam", "lee"] to '{"sam","lee"}'

export function sqlArrayFormatter(array?: string[]) {
  if (!array || array.length === 0) return "{}";
  return `{${array.map((value) => `"${value}"`).join(",")}}`;
}
