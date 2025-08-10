import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ChatWindow.css';
import MessageInput from './MessageInput';
import MessageMeta from './MessageMeta';
import { IoSearch, IoArrowBack, IoLockClosed, IoVideocamOutline, IoCallOutline } from 'react-icons/io5';
import Avatar from '../common/Avatar';

const API_URL ="https://whatsapp-clone-backend-i7np.onrender.com/api";

const ChatWindow = ({ selectedChat, socket, onGoBack }) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (selectedChat) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(`${API_URL}/chats/${selectedChat.wa_id}`);
          setMessages(response.data);
        } catch (error) {
          console.error("Failed to fetch messages for chat:", selectedChat.wa_id, error);
          setMessages([]);
        }
      };
      fetchMessages();
    } else {
      setMessages([]);
    }
  }, [selectedChat]);

  useEffect(() => {
    if (!socket || !selectedChat) return;

    const handleNewMessageInChat = (newMessage) => {
      if (newMessage.wa_id === selectedChat.wa_id) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };

    socket.on('newMessage', handleNewMessageInChat);

    return () => {
      socket.off('newMessage', handleNewMessageInChat);
    };
  }, [socket, selectedChat]);

  
if (!selectedChat) {
  return (
    <div className="chat-window-container mobile-view">
      <div className="welcome-screen">
        <div className="welcome-screen-content">
          <svg viewBox="0 0 91 91" width="250" height="250">
              <path fill="#43C960" d="M91 45.5C91 20.4 70.6 0 45.5 0S0 20.4 0 45.5 20.4 91 45.5 91 91 70.6 91 45.5z"></path>
              <path fill="#FFF" d="M62.6 52.9c-.3-1.1-1.8-1.8-3.1-2.1-1.3-.3-3.1-.3-3.1 1.3s-1.8 4.7-2.1 5.3c-.3.6-1.5 1.5-2.8.9-1.3-.6-5-2.1-9.2-6.2s-7.1-7.9-7.3-8.5c-.3-.6.9-1.5.9-2.8s-1.8-4.1-2.1-5.3c-.3-1.3-1.5-1.8-2.8-1.8-1.1 0-2.3 0-3.4 0h-.3c-1.3 0-3.3.6-4.1 3.1-.9 2.5-.9 7.6 2.1 13.2 3.1 5.6 7.9 10.6 14.7 13.5 6.8 2.8 9.9 2.1 12.3 1.2 2.5-.9 4.4-3.9 4.7-6.5z"></path>
          </svg>
          <h1>WhatsApp Web</h1>
          <p>Send and receive messages without keeping your phone online.<br/>Use WhatsApp on up to 4 linked devices and 1 phone at the same time.</p>
          <div className="welcome-screen-footer">
            <IoLockClosed className="icon" />
            End-to-end encrypted
          </div>
        </div>
      </div>
    </div>
  );
}
  return (
    <div className="chat-window-container">
      <div className="chat-header">
         <div className="chat-header-contact">
          <IoArrowBack className="back-button" onClick={onGoBack} />
          <Avatar />
          <span>{selectedChat.name || selectedChat.wa_id}</span>
        </div>
        <div className="chat-header-icons">
          <div className="call-icons">
            <IoVideocamOutline />
            <IoCallOutline />
          </div>
          <IoSearch />
        </div>
      </div>
      <div className="messages-list">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`message-bubble ${msg.from_me ? 'sent' : 'received'}`}
          >
            <span className="message-body">{msg.body || msg.text}</span> 
            <MessageMeta
              timestamp={msg.timestamp}
              status={msg.from_me ? msg.status : null}
            />
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput selectedChat={selectedChat} />
    </div>
  );
};

export default ChatWindow;