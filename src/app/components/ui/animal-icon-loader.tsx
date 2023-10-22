'use client'

import { FC } from "react"

import { Cat, Dog, Fish, Bug, Rat, Bird, Egg } from "lucide-react"

import { useState , useEffect } from 'react'

interface AnimalIconLoaderProps {
    className?: string
    size: number
}

const AnimalIconLoader: FC<AnimalIconLoaderProps> = ({className, size}) => {
    const [animal, setAnimal] = useState('cat');

    const animalsArray = ['dog', 'fish', 'bug', 'rat', 'bird', 'egg', 'cat']
    
    useEffect(() => {
        const interval = setInterval(() => {
            setAnimal(animalsArray[Math.floor(Math.random() * animalsArray.length)])
        }, 1000)
        return () => clearInterval(interval)
    }, [animal])

  return (
    <div className={className}>
        {animal === 'cat' ? <Cat size={size}/> 
        : animal === 'dog' ? <Dog size={size}/>
        : animal === 'fish' ? <Fish size={size}/>
        : animal === 'bug' ? <Bug size={size}/>
        : animal === 'rat' ? <Rat size={size}/>
        : animal === 'bird' ? <Bird size={size}/>
        : <Egg size={size}/>
        }
    </div>
  )
}

export default AnimalIconLoader



