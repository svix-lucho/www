export function generateToken(length: number): string {
  const base62 = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  let str = "";
  for (let i = 0; i < array.length; i++) {
    str += base62[array[i] % base62.length];
  }
  return str;
}

function generateSvixPlayToken(echoMode = true): string {
  const prefix = echoMode ? "e_" : "";
  return `${prefix}${generateToken(27)}`;
}

export function getSvixPlayViewUrl(token: string): string {
  return `https://play.svix.com/view/${token}/`;
}

export function generateSvixPlayRequestUrl(): string {
  const token = generateSvixPlayToken();
  return `https://play.svix.com/in/${token}/`;
}

export function isSvixPlayUrl(url: string): boolean {
  return url.startsWith("https://play.svix.com/");
}

export function extractSvixPlayToken(url: string): string | null {
  const regex = new RegExp(`https://play.svix.com/in/([a-zA-Z0-9_]+)`);
  return url.match(regex)?.[1] ?? null;
}
