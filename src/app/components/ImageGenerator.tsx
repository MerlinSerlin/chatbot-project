'use client'

import { FC, useContext, useState } from 'react'

import { SpiritAnimalContext } from '@/context/spirit-animal'
import { SpiritAnimal, getSpiritAnimal } from '../helpers/constants/animal-data'


import { useMutation } from '@tanstack/react-query'

interface ImageGenerator {
    className?: string
    children?: React.ReactNode
    onClick?: () => void
}

const ImageGenerator: FC<ImageGenerator> = ({}) => {
    const { 
      animal, 
      updateAnimal,
      isAnimalUpdating, 
      setIsAnimalUpdating, 
      animalImageUrl,
      updateAnimalImageUrl,
    } = useContext(SpiritAnimalContext);

    const {mutate: getAnimal, isLoading} = useMutation({
      mutationFn: async (animal: SpiritAnimal) => {
        const response = await fetch('/api/generate-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({animal: [animal]})
        })
  
        if (!response.ok){
          throw new Error();
        }

        const url = await response.text();

        updateAnimalImageUrl(url);
  
        return response.body;
      },
      onMutate(animal){
        updateAnimal(animal);
      },
      onSuccess: async (stream) => {
        if (!stream) {
          throw new Error('Stream is undefined')
        }
      },
    })

  return (
  <button 
    className="my-4" 
    onClick={() => {
      const randomAnimalFromList = getSpiritAnimal();
      getAnimal(randomAnimalFromList);
    }}
  >
    {animalImageUrl === '' ? 'Click To Find Your Spirit Animal' : 'Get a New Spirit Animal'}
  </button>
  )
}

export default ImageGenerator;