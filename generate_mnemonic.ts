import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";

const generateKey = async (): Promise<void> => {
  const wallet: DirectSecp256k1HdWallet =
    await DirectSecp256k1HdWallet.generate(24);
  process.stdout.write(wallet.mnemonic);
  const accounts = await wallet.getAccounts();
  console.error("Mnemonic with 1st account:", accounts[0].address);
};

generateKey();

/* 
guitar cheese trophy 
top nerve cupboard 
dumb simple reject 
casual version virtual 
loan outside disagree 
athlete wine yellow 
plastic ride traffic 
carpet ankle effortMnemonic 
with 1stic ride traffic 
carpet ankle effort
*/
