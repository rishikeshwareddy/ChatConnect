import React from 'react'
import { useAuthContext } from "../../context/AuthContext";
import useConversation from '../../store/useConversations';
import { extractTime } from '../../utils/extractTime';
const Message = ({ message }) => {
    console.log("hi");
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation()
    const fromme = message.senderId === authUser._id
    const chatClassName = fromme ? 'chat-end' : 'chat-start';
    const profilePic = fromme ? authUser.profilePic : selectedConversation?.profilePic;
    const bubbleBgcolor = fromme ? 'bg-blue-500' : '';
    const formattedTime = extractTime(message.createdAt);
    return (
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img src={profilePic} alt="chat bubble"></img>
                </div>
            </div>
            <div className={`chat-bubble text-white ${bubbleBgcolor}`}>
                {message.message}
            </div>
            <div className='chat-folder opacity-50 text-xs flex gap-1 items-center text-white'>
                {formattedTime}
            </div>
        </div>
    )
}

export default Message