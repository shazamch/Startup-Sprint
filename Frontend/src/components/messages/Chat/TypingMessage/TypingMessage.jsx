import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import messageMiddleware from '../../../../redux/middleware/messageMiddleware';
import { useSocket } from "../../../../context/SocketProvider";

function TypingMessage({ isDarkMode, receiverData, LoggedUser }) {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch(); // Use dispatch to send actions
  const socket = useSocket();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      const ReceiverId = receiverData._id; // Replace with the actual user ID

      const messageData = {
        message: message,
        sender: LoggedUser.name,
        senderid: LoggedUser._id,
        receiverid: ReceiverId,
        timestamp: new Date().toISOString(),
      };
      socket.emit('chat message', { ReceiverId, message: messageData });
      // Dispatch action to send the message
      const response = await dispatch(messageMiddleware.sendMessage(ReceiverId, messageData));

      if (response.success) {
        console.log('Message sent successfully.');
      } else {
        console.error('Failed to send message:', response.message);
      }

      setMessage(''); // Clear the input field
    }
  };

  useEffect(() => {
    // You can listen for incoming messages, if needed
  }, []);

  return (
    <div className={`flex justify-between items-center p-4 rounded-xl dark:bg-gray-800 dark:text-white bg-white text-black mx-4 border border-gray-200`}>
      <form onSubmit={handleSubmit} className="flex w-full">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`flex-grow p-2 rounded-l-lg focus:outline-none dark:bg-gray-700 dark:text-white bg-gray-200 text-black`}
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className={`px-4 py-2 rounded-r-lg ml-1 bg-gradient-to-r from-blue-400 via-blue-500 to-custom-blue dark:from-yellow-400 dark:via-yellow-500 dark:to-custom-yellow text-white`}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default TypingMessage;
