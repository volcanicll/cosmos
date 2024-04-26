import { Keypair } from "@solana/web3.js";

import * as bs58 from "bs58";

const arr = [
  223, 56, 182, 67, 106, 142, 74, 8, 190, 217, 119, 144, 113, 86, 168, 85, 181,
  79, 197, 133, 224, 76, 144, 105, 65, 119, 70, 206, 190, 217, 145, 22, 61, 103,
  167, 202, 84, 61, 36, 201, 113, 38, 185, 57, 160, 195, 155, 173, 196, 227,
  163, 200, 178, 223, 100, 32, 44, 23, 8, 196, 94, 236,
];

// 如果私钥是 Uint8Array
const privateKeyUint8Array = Uint8Array.from([...arr]); // 你的 Uint8Array
const publicKey = bs58.encode(
  Keypair.fromSecretKey(privateKeyUint8Array).secretKey
);
console.log(publicKey);

// 如果私钥是 Uint8Array 的文件（keypair 文件路径）
// const privateKeyFromFile = new Uint8Array(JSON.parse(fs.readFileSync('').toString()));
// const publicKeyFromFile = Keypair.fromSecretKey(privateKeyFromFile).publicKey.toBase58();
// console.log(publicKeyFromFile);
