'use client'

import { FC, useContext, useState } from 'react'

import { SpiritAnimalContext } from '@/context/spirit-animal'
import { SpiritAnimal, getSpiritAnimal } from '../helpers/constants/animal-data'
import { MessagesContext } from '@/context/messages'


import { useMutation } from '@tanstack/react-query'

import { Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'

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

  const {
    messages,
    addMessage,
    removeAllMessages,
  } = useContext(MessagesContext)

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
      removeAllMessages();
      addMessage({
        id: '',
        isUserMessage: false,
        text: `*${animal.sounds}* I am your Spirit ${animal.name}. How may I be of service?`,
      })
    },
    onSuccess: async (stream) => {
      if (!stream) {
        throw new Error('Stream is undefined')
      }
    },
  })

  // check to see if we've generated an animal image

  const overlaidBtnClassName = animal.length === 1 ? null : "absolute bottom-4 left-4"

  return (
    isLoading ? 
    <Loader2 className='my-4 w-6 h-6 animate-spin' />
    :
    <button 
      disabled={isLoading}
      className={
        cn(
          overlaidBtnClassName,
          'text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
        )
      }
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