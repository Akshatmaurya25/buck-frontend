
import { testWalletAdapter } from "./adapters/testWalletAdapter";
import { buck } from "./agent";



const state = {
    _responseString: '',
    get responseString() {
        return this._responseString;
    },
    set responseString(value: string) {
        this._responseString = value;
    }
};
const addressState = {
    _address: '0x', // Default to an empty 0x-prefixed string
    get address(): string {
        return this._address;
    },
    set address(value: string) {
        if (!/^0x[a-fA-F0-9]{40}$/.test(value)) {
            throw new Error("Invalid address format. Must be a 0x-prefixed 40-character hexadecimal string.");
        }
        this._address = value;
    }
};

export { state , addressState };

await buck.init();
async function runagent(task:string, address1:`0x${string}`) {



    try {


        try {
            addressState._address = address1;
            console.log("THis is our address",addressState.address)
        } catch (error) {
            console.error("Invalid address provided:", error);
            return; // Exit early if the address is invalid
        }
        
        console.log("Agent initialized. Enter your task (type 'exit' to quit):");
        const worker = buck.getWorkerById("crypto_worker");
        try {
                     const res =  await worker.runTask(task, { verbose: true });
                     console.log("Agent response", res)
                       return state.responseString;
                    
                    } catch (error) {
                        console.error("Error executing task:", error);
                    }
        // rl.on("line", async (task) => {
        //     if (task.toLowerCase() === "exit") {
        //         console.log("Exiting...");
        //         rl.close();
        //         return;
        //     }

        //     const worker = buck.getWorkerById("crypto_worker");
        //     if (worker) {
        //         console.log(`Running task: ${task}`);
        //         try {
        //             await worker.runTask(task, { verbose: true });
        //             console.log("Task completed.");
        //         } catch (error) {
        //             console.error("Error executing task:", error);
        //         }
        //     } else {
        //         console.error("Worker not found.");
        //     }

        //     console.log("\nEnter another task (or type 'exit' to quit):");
        // });

    
    } catch (error) {
        console.error("Error running agent:", error);
    }
}


export default runagent;