import { GameWorker } from "@virtuals-protocol/game";
import { helloFunction } from "./functions";


export const cryptoWorker = new GameWorker({
    id: "crypto_worker",
    name: "Crypto worker",
    description: "This is the worker that will be used to interact with the crypto market, the user will be able to buy and sell crypto. Also the user will be able to see the crypto market and the crypto prices. User can also see the crypto news and the crypto trends. It is also able to transfer crypto to other wallets using wallet address",
    functions: [
        helloFunction
            
            ],
    // Optional: Provide environment to LLP
    // getEnvironment: async () => {

    //     const walletAddress = "0x1234567890123456789012345678901234567890";
    //     return {
    //         walletAddress: walletAddress,
    //     };

    // },

});

