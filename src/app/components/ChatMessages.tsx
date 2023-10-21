'use client'

import { useEffect } from 'react'

import { MessagesContext } from '@/context/messages'
import { SpiritAnimalContext } from '@/context/spirit-animal';
import { cn } from '@/lib/utils';
import { FC, HTMLAttributes, useContext} from 'react'
import MarkdownLite from './MarkdownLite';

interface ChatMessagesProps extends HTMLAttributes<HTMLDivElement> {
  
}

const ChatMessages: FC<ChatMessagesProps> = ({className, ...props}) => {
    const { messages, removeAllMessages, addMessage } = useContext(MessagesContext);
    const inverseMessages = [...messages].reverse();

    const { animal } = useContext(SpiritAnimalContext);
    const currentAnimalName = animal[animal.length - 1].name;

    const text = animal.length === 1 ?
    'Hello! I am your Spirit Animal Guide. Click the button to generate a spirit animal or ask me a question.'
    : 
    `Hello! I am your ${currentAnimalName} Animal Spirit. How may I be of service?` 

    useEffect(() => {
      removeAllMessages();
      addMessage({
        id: '1',
        text: text,
        isUserMessage: false,
      })
    }, [animal])

    return (
        <div
          {...props}
          className={cn(
            'flex flex-col-reverse gap-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch',
            className
          )}>
          <div className='flex-1 flex-grow' />
          {inverseMessages.map((message) => {
            return (
              <div className='chat-message' key={`${message.id}-${message.id}`}>
                <div
                  className={cn('flex items-end', {
                    'justify-end': message.isUserMessage,
                  })}>
                  <div
                    className={cn('flex flex-col space-y-2 text-sm max-w-xs mx-2 overflow-x-hidden', {
                      'order-1 items-end': message.isUserMessage,
                      'order-2 items-start': !message.isUserMessage,
                    })}>
                    <p
                      className={cn('px-4 py-2 rounded-lg', {
                        'bg-blue-600 text-white': message.isUserMessage,
                        'bg-gray-200 text-gray-900': !message.isUserMessage,
                      })}>
                      <MarkdownLite text={message.text} />
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )
}

export default ChatMessages