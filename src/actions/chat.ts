"use server";

import OpenAI from "openai";

const openai = new OpenAI();

export const gpt3 = async (prompt: string) => {
	console.log({ prompt });
	// const result = await openai.chat.completions.create({
	//   messages: [{ role: "system", content: prompt }],
	//   model: "gpt-3.5-turbo",
	// });
	const result = {
		choices: [
			{
				message: {
					content: "This is a simulated response.",
					role: "system",
				},
			},
		],
	};
	return result.choices;
};
