import { transferSEIToken } from "./transferfunction"

export const executeResponse = async (data : any) : Promise<string>=>{
    if (data.functionName === "transfertokenSEI")
    {
        const result  = await transferSEIToken(data.args.to, data.args.value)
        console.log("Transfered" , result)
        return `Yay 🎉, your transfer was successful. \n
         Transaction Hash :  ${result} \n
        \n
        View your transaction details here: https://seitrace.com/tx/${result}?chain=atlantic-2
        `
    }   
    return `null`
}