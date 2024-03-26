import { DirectSecp256k1HdWallet, OfflineDirectSigner } from "@cosmjs/proto-signing"
import { SigningStargateClient, StargateClient } from "@cosmjs/stargate"
/* 钱包信息文件，助记词或私钥 */
import { cft20_wallet } from "./wallets"

// 测试RPC
const testRpc = "https://rpc.sentry-01.theta-testnet.polypore.xyz"

// 主网RPC   https://github.com/cosmos/chain-registry/blob/master/cosmoshub/chain.json
const mainRpc = "https://rpc-cosmoshub.pupmos.network"

// 测试
const test = false

// mint 次数
const send_number = 100

/* account */
const account = [
    {
        denom: "uatom",
        amount: "1",
    },
]

/* gas  */
const gasFee = {
    amount: [{ denom: "uatom", amount: "336" }],
    gas: "67102",
}
/* cft20 mint信息，通过区块浏览器获取*/
// const memo = "urn:cft20:cosmoshub-4@v1;mint$tic=ASTROBUD,amt=420000000"
const memo = "urn:cft20:cosmoshub-4@v1;mint$tic=ATOVERSE,amt=2500000000"

const getAliceSignerFromMnemonic = async (): Promise<OfflineDirectSigner> => {
    return DirectSecp256k1HdWallet.fromMnemonic(cft20_wallet, {
        prefix: "cosmos",
    })
}

const runMint = async (): Promise<void> => {
    const client = await StargateClient.connect(mainRpc)

    const aliceSigner: OfflineDirectSigner = await getAliceSignerFromMnemonic()
    const alice = (await aliceSigner.getAccounts())[0].address
    // 查看链ID，获取当前区块高度
    console.log("With client, chain id:", await client.getChainId(), ", height:", await client.getHeight())
    // 当前mint钱包地址
    console.log("wallet address:", alice)
    // 当前钱包余额
    console.log("wallet balance before:", await client.getAllBalances(alice))
    const signingClient = await SigningStargateClient.connectWithSigner(mainRpc, aliceSigner)

    // 是否测试
    if (test) {
        return
    }
    console.log("开始mint")
    for (let index = 1; index <= send_number; index++) {
        if (index <= send_number) {
            await signingClient.sendTokens(alice, alice, account, gasFee, memo)
            console.log("Transfer result:", "mint成功：" + index + "次")
            console.log("block height:", await signingClient.getHeight())
        }
    }
    console.log("结束mint")
    console.log("wallet balance after:", await client.getAllBalances(alice))
}

runMint()
