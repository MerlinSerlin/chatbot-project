import { ReactNode, createContext, useContext, useState } from "react"
import { Message } from "@/lib/validators/message"
import { nanoid } from "nanoid"

export const MessagesContext = createContext<{
    messages: Message[],
    isMessageUpdating: boolean,
    addMessage: (message: Message) => void,
    removeMessage: (id: string) => void,
    removeAllMessages: () => void,
    updateMessage: (id: string, updateFn: (prevText: string) => string) => void,
    setIsMessageUpdating: (isUpdating: boolean) => void,
}>({
    messages: [],
    isMessageUpdating: false,
    addMessage: () => {},
    removeMessage: () => {},
    removeAllMessages: () => {},
    updateMessage: () => {},
    setIsMessageUpdating: () => {},
})

export function MessagesProvider( { children }: { children: ReactNode }) {
    const [isMessageUpdating, setIsMessageUpdating] = useState<boolean>(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: nanoid(),
            text: 'Hello! I am your Spirit Animal Guide. Click the button to generate a spirit animal or ask me a question.',
            isUserMessage: false
        }
    ])

    const addMessage = (message: Message) => {
        setMessages(prevMessages => [...prevMessages, message])
    }

    const removeMessage = (id: string) => {
        setMessages(prevMessages => prevMessages.filter(message => message.id !== id))
    }

    const removeAllMessages = () => {
        setMessages(prevMessages => prevMessages = [] )
    }

    const updateMessage = (id: string, updateFn: (prevText: string) => string) => {
        setMessages(prevMessages => prevMessages.map((message) => {
            if (message.id === id){
                return {
                    ...message,
                    text: updateFn(message.text)
                }
            }
            return message;
        }))
    }

    return <MessagesContext.Provider value={{
        messages,
        addMessage,
        removeMessage,
        removeAllMessages,
        updateMessage,
        isMessageUpdating,
        setIsMessageUpdating,

    }}>
        {children}
    </MessagesContext.Provider>
}