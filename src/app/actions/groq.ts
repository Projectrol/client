"use server";

import { ChatGroq } from "@langchain/groq";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";

export async function prompt(promptMsg: string, promptTemplate: string) {
  const model = new ChatGroq({
    model: "mixtral-8x7b-32768",
    temperature: 0,
    apiKey: "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",
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
