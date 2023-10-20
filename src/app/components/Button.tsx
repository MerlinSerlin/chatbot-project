'use client'

import { FC } from 'react'

interface ButtonProps {
    className?: string
    children?: React.ReactNode
    onClick?: () => void
}

const Button: FC<ButtonProps> = ({}) => {
    const generateImage = async () => {
        const response = await fetch('/api/generate-image', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            // body: JSON.stringify({messages: [message]})
          })
    
          if (!response.ok){
            throw new Error();
          }
    
          return response.body;
    }

  return <button onClick={() => {
      generateImage();
  }}>Click To Generate Image</button>
}

export default Button