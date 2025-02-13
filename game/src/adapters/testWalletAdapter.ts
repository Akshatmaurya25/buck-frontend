import { seiTestnet } from 'viem/chains';
import { addressState } from '..';
import { createWalletClient, http } from "viem";

export const testWalletAdapter =async (address: `0x${string}`)=>{
    const rpcUrl = process.env.RPC_PROVIDER_URL_SEI;
    const walletClient = createWalletClient({
        account: address as `0x${string}`,
        chain: seiTestnet,
        transport: http(rpcUrl)
    });
    const hash = await  walletClient.sendTransaction({
        // account: address as `0x${string}`,
       
     to: "0xE0cA75B7A935033D52dE30ac525486692578a74a",
            value: 100000000000n,
    });
    console.log("hash", hash)
}