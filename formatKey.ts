import * as bs58 from "bs58";

const base58PrivateKey =
  "2kbbGTVR2tKCGumBJ8isYRoQbfBTzUKpjjkV3zECsQfTXRyG7vXRrciWeHHe5PYpqXSRZtiquqbSS9Y4UEkJGH3";
const privateKeyUint8 = bs58.decode(base58PrivateKey);
console.log(privateKeyUint8);
