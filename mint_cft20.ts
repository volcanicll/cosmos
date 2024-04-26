import {
  DirectSecp256k1HdWallet,
  OfflineDirectSigner,
} from "@cosmjs/proto-signing";
import { SigningStargateClient, StargateClient } from "@cosmjs/stargate";
/* wallet info, private keys or  */
import { cft20_wallet, wallets, walletType } from "./wallets";

// test network RPC
const testRpc = "https://rpc.sentry-01.theta-testnet.polypore.xyz";

// main network RPC   https://github.com/cosmos/chain-registry/blob/master/cosmoshub/chain.json
// const mainRpc = "https://rpc-cosmoshub.pupmos.network";
const mainRpc = "https://rpc-cosmoshub.whispernode.com:443";

// true for stop
const test = false;

// number of times
const send_number = 50;

/* account */
const account = [
  {
    denom: "uatom",
    amount: "1",
  },
];

/* gas  */
const gasFee = {
  amount: [{ denom: "uatom", amount: "336" }],
  gas: "67132",
};
/* cft20 mint information，from https://www.mintscan.io/cosmos/tx */
// const init_memo = "urn:cft20:cosmoshub-4@v1;mint$tic=ASTROBUD,amt=420000000";
// const init_memo = "urn:cft20:cosmoshub-4@v1;mint$tic=ATOVERSE,amt=2500000000"  // end
// const init_memo = "urn:cft20:cosmoshub-4@v1;mint$tic=FEPE,amt=1000000000";
// const init_memo = "urn:cft20:cosmoshub-4@v1;mint$tic=MOLECULE,amt=1000000000";
// const init_memo = "urn:cft20:cosmoshub-4@v1;mint$tic=STONER,amt=1000000000";
// const init_memo = "urn:cft20:cosmoshub-4@v1;mint$tic=BADDOG,amt=10000000000";
// const init_memo = "urn:cft20:cosmoshub-4@v1;mint$tic=COOK,amt=1000000000";
// const init_memo = "urn:cft20:cosmoshub-4@v1;mint$tic=RET,amt=1000000000";
// const init_memo = "urn:cft20:cosmoshub-4@v1;mint$tic=ASCII,amt=10000000000";
// const init_memo = "urn:cft20:cosmoshub-4@v1;mint$tic=ANIMALIA,amt=25250000000";
// const init_memo = "urn:cft20:cosmoshub-4@v1;mint$tic=1PIXEL,amt=1000000000";
// const init_memo = "urn:cft20:cosmoshub-4@v1;mint$tic=RETAIL,amt=1000000000";
// const init_memo = "urn:cft20:cosmoshub-4@v1;mint$tic=NUMBERS,amt=1234000000";
// const init_memo = "urn:cft20:cosmoshub-4@v1;mint$tic=CCREATOR,amt=1000000000";
// const init_memo = "urn:cft20:cosmoshub-4@v1;mint$tic=B10D20DOWN,amt=2000000000";
// const init_memo = "urn:cft20:cosmoshub-4@v1;mint$tic=AZZ,amt=5000000000";
// const init_memo = "urn:cft20:cosmoshub-4@v1;mint$tic=WOSM,amt=588000000";
// const init_memo = "urn:cft20:cosmoshub-4@v1;mint$tic=PHMN,amt=32000000";
// const init_memo = "urn:cft20:cosmoshub-4@v1;mint$tic=CAWS,amt=1000000000";
// const init_memo =
//   "urn:cft20:cosmoshub-4@v1;mint$tic=EXTRA,amt=10000000000000000";
// const init_memo = "urn:cft20:cosmoshub-4@v1;mint$tic=RET,amt=1000000000";
const init_memo = "urn:cft20:cosmoshub-4@v1;mint$tic=DJM,amt=1000000000";
// const init_memo='pryzm1v8rzts7xvy2z2arnrn9cys63ekph69ndn6qrqv'  //toAddress cosmos1mrtta9zc0dsh30vfdqvfam8kwcgx6rgkam2jnu

const getAliceSignerFromMnemonic = async (
  wallet: string
): Promise<OfflineDirectSigner> => {
  return DirectSecp256k1HdWallet.fromMnemonic(wallet, {
    prefix: "cosmos",
  });
};

const runMint = async (props?: walletType): Promise<void> => {
  const {
    mnemonic = cft20_wallet,
    times = send_number,
    memo = init_memo,
  } = props ?? {};
  const client = await StargateClient.connect(mainRpc);

  const aliceSigner: OfflineDirectSigner = await getAliceSignerFromMnemonic(
    mnemonic
  );
  const alice = (await aliceSigner.getAccounts())[0].address;
  // chain info
  console.log(
    "With client, chain id:",
    await client.getChainId(),
    ", height:",
    await client.getHeight()
  );
  // wallet address
  console.log("wallet address:", alice);

  // wallet balance before
  console.log("wallet balance before:", await client.getAllBalances(alice));
  const signingClient = await SigningStargateClient.connectWithSigner(
    mainRpc,
    aliceSigner
  );

  // true and stop
  if (test) {
    return;
  }
  console.log("start minting");
  for (let index = 1; index <= times; index++) {
    if (index <= times) {
      await signingClient.sendTokens(alice, alice, account, gasFee, memo);
      console.log("mint result:", "times of mint:  " + index);
      console.log("block height:", await signingClient.getHeight());
    }
  }
  console.log("end mint");
  console.log("wallet balance after:", await client.getAllBalances(alice));
};

const runBatchMint = () => {
  wallets.map((wallet) => {
    runMint({ ...wallet });
  });
};

/* single wallet mint */
runMint();

/* multiple wallet mint */
// runBatchMint();
