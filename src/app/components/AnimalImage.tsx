'use client'

import { FC, useContext } from 'react'

import Image from 'next/image'
import { SpiritAnimalContext } from '@/context/spirit-animal'

interface AnimalImageProps {
  
}

const AnimalImage: FC<AnimalImageProps> = ({}) => {
    const { animalImageUrl } = useContext(SpiritAnimalContext);
    if (!animalImageUrl) return null;

    return (
        <Image 
            src={animalImageUrl}
            alt={'a picture of an animal'}
            width={800}
            height={800}
        />
    )
}

export default AnimalImage