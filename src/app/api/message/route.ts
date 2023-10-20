import {
  ChatGPTMessage,
  OpenAIStream,
  OpenAIStreamPayload,
} from '@/lib/openai-stream'
import { MessageArraySchema } from '@/lib/validators/message'

export async function POST(req: Request) {
    const { messages, prompt } = await req.json()

    const parsedMessages = MessageArraySchema.parse(messages)
    console.log(prompt);

    const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message) => {
        return {
        role: message.isUserMessage ? 'user' : 'system',
        content: message.text,
        }
    })

    outboundMessages.unshift({
        role: 'system',
        content: prompt,
    })

    const payload: OpenAIStreamPayload = {
        model: 'gpt-3.5-turbo',
        messages: outboundMessages,
        temperature: 0.4,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 150,
        stream: true,
        n: 1,
    }

    const stream = await OpenAIStream(payload);

    return new Response(stream);
}