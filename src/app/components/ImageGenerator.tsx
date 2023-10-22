'use client'

import { FC, useContext, useState } from 'react'

import { SpiritAnimalContext } from '@/context/spirit-animal'
import { SpiritAnimal, getSpiritAnimal } from '../helpers/constants/animal-data'
import { MessagesContext } from '@/context/messages'


import { useMutation } from '@tanstack/react-query'

import { Loader2 } from 'lucide-react'
import AnimalIconLoader from './ui/animal-icon-loader'

import { cn } from '@/lib/utils'

import toast from 'react-hot-toast'

interface ImageGenerator {
    className?: string
    children?: React.ReactNode
    onClick?: () => void
}

const ImageGenerator: FC<ImageGenerator> = ({}) => {
  const { 
    animal, 
    updateAnimal,
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
      setIsAnimalUpdating(true);
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
      setIsAnimalUpdating(false);
      
    },
    onError: () => {
      toast.error('Something went wrong. Please try again');
    }
  })

  // check to see if we've generated an animal image

  const overlaidBtnClassName = animal.length === 1 ? 
    null 
    : 
    "absolute bottom-4 left-4"

  return (
    isLoading ? 
    <div className='flex justify-center w-100 h-100 md:w-200 md:h-200 lg:w-400 lg:h-400'>
      <AnimalIconLoader className='animate-spin' size={100}/>
    </div>
    :
    <button 
      disabled={isLoading}
      className={
        cn(
          overlaidBtnClassName,
          "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
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