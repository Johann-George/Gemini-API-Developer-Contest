import dotenv from "dotenv";
import readline from "readline";

import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config({path: './.env.local'});

const genAI=new GoogleGenerativeAI(process.env.API_KEY);

const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});

async function run(){
    const model=genAI.getGenerativeModel({model:"gemini-pro"});

    const chat=model.startChat({
        history:[],
        generationConfig:{
            maxOutputTokens:500,
        },
    });


    async function askandRespond(){
        rl.question("You: ",async(msg)=>{
            if(msg.toLowerCase()==="exit"){
                rl.close();
            }
            else{
                const result=await chat.sendMessage(msg);
                const response=await result.response;
                const text=response.text();
                console.log("AI: ",text);
                askandRespond();
            }
        });
    }
    askandRespond();
}

run();