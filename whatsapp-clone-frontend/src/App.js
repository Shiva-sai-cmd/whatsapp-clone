import React, { useState } from 'react';
import { io } from 'socket.io-client';
import Sidebar from './components/Sidebar/Sidebar';
import ChatWindow from './components/ChatWindow/ChatWindow';
import './App.css';

const socket = io('http://localhost:3001');

function App() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  const handleGoBack = () => {
    setSelectedChat(null);
  };

  return (
    <div className="app-container">
        <div className={`main-window ${selectedChat ? 'show-chat-window' : ''}`}>
        <Sidebar onSelectChat={handleSelectChat} selectedChat={selectedChat} isNavOpen={isNavOpen}
          setIsNavOpen={setIsNavOpen} socket={socket} />
        <ChatWindow selectedChat={selectedChat} socket={socket} onGoBack={handleGoBack} />
      </div>
    </div>
  );
}

export default App;