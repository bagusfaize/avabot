'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { MdOutlineArrowForward } from 'react-icons/md';

export default function WelcomePage() {
  const router = useRouter()

  const onStartChat = () => router.push('/chat');

  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center flex-col md:flex-row">
        <div className='px-12 md:px-2'>
          <Image src='/welcome.svg' width={300} height={300} alt='welcome-asset' />
        </div>
        <div className="max-w-lg text-left px-10 mt-5 md:mt-0 md:px-2">
          <h1 className="text-4xl font-bold">Welcome to Avabot!</h1>
          <div className='py-5'>
            <p className="">Avabot is chatbot supported by OpenAI API.</p>
          </div>
          <button
            onClick={onStartChat}
            className="btn btn-primary"
          >
            <span>Start Chat</span>
            <span><MdOutlineArrowForward size={18} /></span>
          </button>
        </div>
      </div>
    </div>
  )
}
