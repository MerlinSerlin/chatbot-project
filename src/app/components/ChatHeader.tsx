'use client'

import { FC, useContext, useState, useEffect } from 'react'
import { SpiritAnimalContext } from '@/context/spirit-animal'
import { set } from 'zod'

const ChatHeader: FC = () => {
  const [currentChatbotName, setCurrentChatbotName] = useState('Website Chatbot')

  const { animal } = useContext(SpiritAnimalContext)
  const currentAnimalName = animal[animal.length - 1].name;

  return (
    <div className='w-full flex gap-3 justify-start items-center text-zinc-800'>
      <div className='flex flex-col items-start text-sm'>
        <p className='text-xs'>Chat with</p>
        <div className='flex gap-1.5 items-center'>
          <p className='w-2 h-2 rounded-full bg-blue-500' />
          <p className='font-medium'>Your {currentAnimalName} Spirit Animal</p>
        </div>
      </div>
    </div>
  )
}

export default ChatHeader