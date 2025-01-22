import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: Date;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome to the chat!",
      sender: "System",
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const userMessage = {
        id: Date.now(),
        text: newMessage,
        sender: "You",
        timestamp: new Date()
      };
      
      const serverMessage = {
        id: Date.now() + 1,
        text: newMessage, // Echo back the same message
        sender: "Server",
        timestamp: new Date()
      };
      
      setMessages([...messages, userMessage, serverMessage]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col ${
              message.sender === "You" ? "items-end" : "items-start"
            }`}
          >
            <div className={`max-w-[70%] rounded-lg p-3 ${
              message.sender === "You"
                ? "bg-blue-500 text-white"
                : message.sender === "System"
                ? "bg-gray-200 text-gray-900"
                : "bg-green-500 text-white"
            }`}>
              <p>{message.text}</p>
              <div className={`text-xs mt-1 ${
                message.sender === "You" 
                  ? "text-blue-100" 
                  : message.sender === "System"
                  ? "text-gray-500"
                  : "text-green-100"
              }`}>
                {message.sender} • {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Chat;