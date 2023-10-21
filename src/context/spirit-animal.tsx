import { ReactNode, createContext, useState } from "react"
import { SpiritAnimal } from "@/app/helpers/constants/animal-data"

export const SpiritAnimalContext = createContext<{
    animal: SpiritAnimal[],
    animalImageUrl: string,
    updateAnimalImageUrl: (animalImageUrl: string) => void,
    updateAnimal: (animal: SpiritAnimal) => void,
    isAnimalUpdating: boolean,
    setIsAnimalUpdating: (isUpdating: boolean) => void,
}>({
    animal: [],
    animalImageUrl: '',
    updateAnimalImageUrl: () => {},
    updateAnimal: () => {},
    isAnimalUpdating: false,
    setIsAnimalUpdating: () => {}
})

export function SpiritAnimalProvider( { children }: { children: ReactNode }) {
    const [isAnimalUpdating, setIsAnimalUpdating] = useState<boolean>(false)
    const [animal, setAnimal] = useState<SpiritAnimal[]>([
        {
            name: '',
            symbolism: '',
            when_in_balance: '',
            when_out_of_balance: '',
            to_bring_into_balance: '',
        }
    ])
    const [animalImageUrl, setAnimalImageUrl] = useState<string>('')

    const updateAnimal = (animal: SpiritAnimal) => {
        setAnimal(prevAnimal => [...prevAnimal, animal])
    }

    const updateAnimalImageUrl = (animalImageUrl: string) => {
        setAnimalImageUrl(prevAnimalImageUrl => prevAnimalImageUrl = animalImageUrl)
    }

    return <SpiritAnimalContext.Provider value={{
        animal,
        animalImageUrl,
        updateAnimal,
        updateAnimalImageUrl,
        isAnimalUpdating,
        setIsAnimalUpdating,
    }}>
        {children}
    </SpiritAnimalContext.Provider>
}