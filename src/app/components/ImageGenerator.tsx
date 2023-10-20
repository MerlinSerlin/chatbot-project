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
    // const [imageUrl, setImageUrl] = useState<string>('');

    const { 
      animal, 
      updateAnimal,
      isAnimalUpdating, 
      setIsAnimalUpdating 
    } = useContext(SpiritAnimalContext);

    const spiritAnimal = useContext(SpiritAnimalContext);

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
  
        return response.body;
      },
      onMutate(animal){
        updateAnimal(animal);
      },
      onSuccess: async (stream) => {
        if (!stream) {
          throw new Error('Stream is undefined')
        }
  
        // const id = nanoid();
        // const responseMessage: Message = {
        //   id,
        //   isUserMessage: false,
        //   text: ''
        // }
  
        // addMessage(responseMessage);
  
        // setIsMessageUpdating(true);
  
        // // clean up
        // setIsMessageUpdating(false);
        // setInput('');
  
        // setTimeout(() => {
        //   textAreaRef.current?.focus();
        // }, 10);
        
      },
      // onError: (_, message) => {
      //   toast.error('Something went wrong. Please try again');
      //   removeMessage(message.id);
      //   textAreaRef.current?.focus();;
      // }
    })

    // const generateImage = async () => {
    //     const response = await fetch('/api/generate-image', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({spiritAnimal})
    //       })
    
    //       if (!response.ok){
    //         throw new Error();
    //       }
          
    //       const body = await response.text();

    //       console.log(body);

    //       return body;
    // }

  return <button onClick={() => {
      const randomAnimalFromList = getSpiritAnimal();
      getAnimal(randomAnimalFromList);
  }}>Click To Generate Image</button>
}

export default ImageGenerator;