
import { createPublicClient, createWalletClient, http, formatEther, Account } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { seiTestnet } from "viem/chains";
import dotenv from 'dotenv';
import CurrencyConverter from '../utils/rateconversion';
import { bigIntToDecimal } from "../utils/BigIntDecimalConversions";
import { addressState } from ".."; // Ensure this import is correct and addressState is initialized properly
import { walletSEIClient } from "@/app/page";
import { initWalletClient } from "@/functions/transferfunction";

dotenv.config();

export class WalletAdapter {
    private publicClient;
    private walletClient;
    private account;
    // private address1 = addressState.address || '0xssdasd';

    constructor() {
      
        const privateKey = process.env.WALLET_PRIVATE_KEY;
        const rpcUrl = process.env.RPC_PROVIDER_URL_SEI;

        if (!privateKey?.startsWith('0x')) {
            console.error('Invalid WALLET_PRIVATE_KEY format');
        }
        if (!rpcUrl) {
            throw new Error('RPC_PROVIDER_URL is required');
        }

        this.account = privateKeyToAccount(privateKey as `0x${string}`);
        // this.publicClient = createPublicClient({
        //     chain: seiTestnet,
        //     transport: http(rpcUrl)
        // });
        this.publicClient = walletSEIClient
        
  
        this.walletClient = createWalletClient({
            account: addressState._address as `0x${string}`,
            chain: seiTestnet,
            transport: http(rpcUrl)
        });
    }

    async getBalance() {
        try {
            const address = addressState._address;
            const balance = await this.publicClient.getBalance({
                address: address as `0x${string}`,
            });

            return {
                success: true,
                balance: bigIntToDecimal(balance),
                address: this.account.address
            };
        } catch (error) {
            console.error("Error fetching balance:", error);
            throw error;
        }
    }

    async transferTokenSEI(to: `0x${string}`, amount: bigint) {
        try {
            const address = addressState._address ;
    
            const walletClient1 = await initWalletClient();
            const hash = await  this.walletClient.sendTransaction({
                account: address as `0x${string}`,
                to,
                value: amount,
            });
        //     const request = await this.walletClient.prepareTransactionRequest({
        //         account: address as `0x${string}`,
        //         to: to,
        //         value: amount,
        //       });
        //   console.log("request", request)
        //       const serializedTransaction = await this.walletClient.sendTransaction({
        //         ...request
        //         account : address as `0x${string}`,
        //       });
        //       const hash = await this.walletClient.sendRawTransaction({ serializedTransaction });
          
            console.log("Transaction url:", `https://seitrace.com/tx/${hash}?chain=atlantic-2`);
            return {
                success: true,
                hash: hash,
                address: this.account.address
            };
        } catch (error) {
            console.error("Error transferring token:", error);
            console.error("Error transferring token - account:", to);
            throw error;
        }
    }
}

export const walletAdapterSEI = new WalletAdapter();
