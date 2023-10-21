import ImageGenerator from './components/ImageGenerator'
import AnimalImage from './components/AnimalImage'

export default function Home() {
  return (
    <main className='absolute inset-0 flex flex-col justify-center items-center'>
      <div className='relative'>
        <AnimalImage />
        <ImageGenerator />
      </div>
    </main>
  )
}
