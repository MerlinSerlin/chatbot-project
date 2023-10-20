import Image from 'next/image'
import ImageGenerator from './components/ImageGenerator'

export default function Home() {
  return (
    <main className='absolute inset-0 flex justify-center items-center'>
      <ImageGenerator/>
    </main>
  )
}
