
import { getAccount } from "@/app/landing-page";
import { decimalToBigInt } from "@/game/src/utils/BigIntDecimalConversions";
import { createWalletClient, custom, http } from "viem";
import { seiTestnet } from "viem/chains";




  
  export const initWalletClient = async (account?: `0x${string}`) => {
    if(!account){

        const account = await getAccount(); // Now returns Address
    }

  
    return createWalletClient({
      account,
      chain: seiTestnet,
      transport: custom(window.ethereum),
    }); 
  };
  
  export const transferSEIToken = async (to: `0x${string}`, value:bigint) => {
    try {
      //  if(window.ethereum){
      //   console.error("Eth provider not found")
      //   console.log(window.ethereum)
      //  }
  console.log("this is us",window.ethereum)
      const client = await initWalletClient();
      const rpcUrl = process.env.RPC_PROVIDER_URL_SEI;
      const account = await getAccount();

        const hash = await  client.sendTransaction({
            account: account as `0x${string}`,
     
            to: "0xE0cA75B7A935033D52dE30ac525486692578a74a",
            value: 100000000000n,
        });
        console.log("hash", hash)
      return hash;
    } catch (error) {
      console.error("Transfer failed:", error);
      throw error;
    }
  };