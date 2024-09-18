import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const apiKey = "AIzaSyByVV9wzipSNSKevwIv-TxcXaP8FxZjeFU";

export async function prompt(promptMsg: string, promptTemplate: string) {
  const model = new ChatGoogleGenerativeAI({
    model: "gemini-pro",
    maxOutputTokens: 2048,
    apiKey,
  });

  const parser = new StringOutputParser();

  const messages = [
    new SystemMessage(promptTemplate),
    new HumanMessage(promptMsg),
  ];

  const chain = model.pipe(parser);
  const result = await chain.invoke(messages);
  // const data = await parser.invoke(result);
  // console.log(data);
  return result;
}
