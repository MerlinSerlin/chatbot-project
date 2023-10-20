'use client'

import { FC, useState } from 'react'

interface ImageGenerator {
    className?: string
    children?: React.ReactNode
    onClick?: () => void
}

const ImageGenerator: FC<ImageGenerator> = ({}) => {
    const [imageUrl, setImageUrl] = useState<string>('');

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
          
          const body = await response.text();

          console.log(body);

          return body;
    }

  return <button onClick={() => {
      generateImage();
  }}>Click To Generate Image</button>
}

export default ImageGenerator;