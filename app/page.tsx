'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form';

type User = {
  username: string
};

export default function WelcomePage() {
  const router = useRouter()
  const { register, formState: {errors}, handleSubmit } = useForm<User>()

  const onSubmit = () => router.push('/chat')

  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className=''>
          <Image src='/welcome.svg' width={300} height={300} alt='welcome-asset' />
        </div>
        <div className="max-w-lg text-left">
          <h1 className="text-5xl font-bold">Welcome to Avabot!</h1>
          <div className='py-5'>
            <p className="">Avabot is chatbot supported by OpenAI.</p>
            <p className="">Enter your name to start chatting.</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex justify-start items-start space-x-5'>
              <div className='flex flex-col'>
                <input 
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered input-primary"
                  {...register("username", { required: true })}
                />
                {errors.username && <span className='mt-1 text-sm'>This field is required</span>}
              </div>
              <button 
                type='submit'
                className="btn btn-primary"
              >
                Start Chat
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
