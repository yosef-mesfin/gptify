"use client";
import { gpt3 } from "@/actions/chat";
import ChatPlayground from "@/components/chat/ChatPlayground";

export default function Page() {
	const handleFinish = async (query: string) => {
		const result = await gpt3(query);
		if (result.length === 0) {
			return;
		}
	};

	return <ChatPlayground onFinish={handleFinish} />;
}
