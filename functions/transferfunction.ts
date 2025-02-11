'use client'
import { getAccount } from "@/app/landing-page";
import { decimalToBigInt } from "@/game/src/utils/BigIntDecimalConversions";
import { createWalletClient, custom } from "viem";
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
  
      const client = await initWalletClient();
      const account = await getAccount();
      const request = await client.prepareTransactionRequest({
        account,
        to: to,
        value: value,
      });
  console.log("request", request)
      const serializedTransaction = await client.sendTransaction(request);
      const hash = await client.sendRawTransaction({ serializedTransaction });
  
      return hash;
    } catch (error) {
      console.error("Transfer failed:", error);
      throw error;
    }
  };