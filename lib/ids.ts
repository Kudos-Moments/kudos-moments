const CODE_ALPHABET =
  "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";

function randomString(length: number): string {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  }
  return result;
}

/** Unguessable capability token, 21+ chars per spec (contribution/reveal codes). */
export function generateCapabilityCode(): string {
  return randomString(24);
}

export function generateId(prefix: string): string {
  return `${prefix}_${randomString(16)}`;
}
