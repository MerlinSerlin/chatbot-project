import { ReactNode, createContext, useState } from "react"
// import { Message } from "@/lib/validators/message"
import { SpiritAnimal } from "@/app/helpers/constants/animal-data"
import { nanoid } from "nanoid"
import { set } from "zod"

export const SpiritAnimalContext = createContext<{
    animal: SpiritAnimal[],
    animalImageUrl: string,
    updateAnimalImageUrl: (animalImageUrl: string, updateFn: (prevText: string) => string) => void,
    updateAnimal: (animal: SpiritAnimal) => void,
    isAnimalUpdating: boolean,
    setIsAnimalUpdating: (isUpdating: boolean) => void,
    // addMessage: (message: Message) => void,
    // removeMessage: (id: string) => void,
    // updateMessage: (id: string, updateFn: (prevText: string) => string) => void,
}>({
    animal: [],
    animalImageUrl: '',
    updateAnimalImageUrl: () => {},
    updateAnimal: () => {},
    isAnimalUpdating: false,
    setIsAnimalUpdating: () => {},
    // addMessage: () => {},
    // removeMessage: () => {},
    // updateMessage: () => {},
})

export function SpiritAnimalProvider( { children }: { children: ReactNode }) {
    const [isAnimalUpdating, setIsAnimalUpdating] = useState<boolean>(false)
    const [animal, setAnimal] = useState<SpiritAnimal[]>([
        {
            name: '',
            symbolism: ''
        }
    ])
    const [animalImageUrl, setAnimalImageUrl] = useState<string>('')

    const updateAnimal = (animal: SpiritAnimal) => {
        setAnimal(prevAnimal => [...prevAnimal, animal])
    }

    const updateAnimalImageUrl = (animalImageUrl: string) => {
        setAnimalImageUrl(prevAnimalImageUrl => prevAnimalImageUrl = animalImageUrl)
    }

    // const removeMessage = (id: string) => {
    //     setMessages(prevMessages => prevMessages.filter(message => message.id !== id))
    // }

    // const updateMessage = (id: string, updateFn: (prevText: string) => string) => {
    //     setMessages(prevMessages => prevMessages.map((message) => {
    //         if (message.id === id){
    //             return {
    //                 ...message,
    //                 text: updateFn(message.text)
    //             }
    //         }
    //         return message;
    //     }))
    // }

    return <SpiritAnimalContext.Provider value={{
        animal,
        animalImageUrl,
        updateAnimal,
        updateAnimalImageUrl,
        isAnimalUpdating,
        setIsAnimalUpdating,
        // addMessage,
        // removeMessage,
        // updateMessage,

    }}>
        {children}
    </SpiritAnimalContext.Provider>
}