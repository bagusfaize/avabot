import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2"


export default function EmptyState() {
  return(
      <div className='text-center text-zinc-500 my-40'>
          <div className='flex justify-center m-5'><HiOutlineChatBubbleLeftRight size={40}/> </div>
          <div className='text-sm'>The chat is empty, but I'm here and ready to help. <br/>What can I do for you?</div>
      </div>
  )
}
