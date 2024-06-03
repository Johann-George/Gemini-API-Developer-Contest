import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
console.log()
const genAI=new GoogleGenerativeAI(process.env.API_KEY);
console.log(genAI);