import dotenv from "dotenv";
import * as fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config({path: './.env.local'});

const genAI=new GoogleGenerativeAI(process.env.API_KEY);

function fileToGeneratePart(path,mimeType){
    return{
        inlineData:{
            data:Buffer.from(fs.readFileSync(path)).toString("base64"),
            mimeType,
        },
    }
}

async function run(){
    const model=genAI.getGenerativeModel({ model: "gemini-pro-vision"});

    const prompt="What is happening in the image";

    const imageParts= [ fileToGeneratePart("signup_image.jpg","image/jpeg")];

    const result=await model.generateContent([prompt,...imageParts]);
    const response=await result.response;
    const text=response.text();
    console.log(text);
}

run();