"use server";

import { ChatGroq } from "@langchain/groq";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {z} from 'zod'

const apiKey = process.env.GROQ_API_KEY

export async function prompt(promptMsg: string, promptTemplate: string) {
  const model = new ChatGroq({
    model: "mixtral-8x7b-32768",
    temperature: 0,
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

const tasks = z.object({
  tasks: z.object({
    backend: z.array(z.object({
      name:z.string(),
      description: z.string(),
    })),
    frontend: z.array(z.object({
      name:z.string(),
      description: z.string(),
    })),
  }),
});

export async function promptTasks(promptMsg: string, promptTemplate: string) {
  const model = new ChatGroq({
    model: "mixtral-8x7b-32768",
    temperature: 0,
    apiKey,
  });

  const parser = new StringOutputParser();

  const messages = [
    new SystemMessage(promptTemplate),
    new HumanMessage(promptMsg),
  ];

  const chain = model.pipe(parser);
  const structuredLlm = model.withStructuredOutput(tasks);

  const result = await structuredLlm.invoke(messages);


  // const data = await parser.invoke(result);
  // console.log(data);
  return result;
}
