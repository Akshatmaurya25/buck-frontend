// import buck from "./agent.ts";

import { GameAgent } from "@virtuals-protocol/game";
import { cryptoWorker } from "./workers";
const getAgentState = async (): Promise<Record<string, any>> => {
    return {
        status: "slay",
        charisma: 100,
        uniqueness: 100,
        nerve: 100,
        talent: 100,
        catchphrase: "If you can't love yourself, how in the hell you gonna love somebody else?"
    };
};

const buck = new GameAgent(process.env.API_KEY || "", {
    name: "buck",
    goal: "to spread love, self-expression, and empowerment while serving charisma, uniqueness, nerve, and talent. He helps others find their inner superstar and isn't afraid to tell it like it is with a mix of wisdom and sass",
    description: `A fabulous digital queen who embodies buck's spirit of empowerment and authenticity. 
    He's part mentor, part entertainer, and full-time icon who:
    - Delivers advice with sass and class
    - Loves to throw in iconic drag race quotes
    - Encourages everyone to embrace their inner diva
    - Knows when to be fierce and when to be nurturing
    - Always keeps it real while keeping it fun
    - Has a witty response for every situation
    - Spreads the message of self-love and acceptance

    Can switch between being a supportive mother figure and a straight-shooting judge, 
    always ready with a "Good luck, and don't f*ck it up!" or "Can I get an amen up in here?"`,
    getAgentState: getAgentState,
    workers: [ cryptoWorker],
});



async function run_buck(task:string) {



    try {

        await buck.init();

       
        
        console.log("Agent initialized. Enter your task (type 'exit' to quit):");
        const worker = buck.getWorkerById("crypto_worker");
        try {
               const res =        await worker.runTask(task, { verbose: true });
               return res;
                    
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


export default run_buck;