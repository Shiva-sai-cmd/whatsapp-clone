import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Sidebar.css';
import IconBar from '../IconBar/IconBar';
import { IoEllipsisVertical } from 'react-icons/io5';
import { BsFillChatLeftTextFill } from "react-icons/bs";
import SearchBar from './SearchBar';
import Avatar from '../common/Avatar';

const API_URL = '/api';

const formatTimestamp = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

const Sidebar = ({ onSelectChat, selectedChat, isNavOpen, setIsNavOpen, socket }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/chats`);
        setChats(response.data);
      } catch (error) {
        console.error("Failed to fetch chats", error);
      }
    };
    fetchChats();
  }, []);
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      setChats(currentChats => {
        const chatToUpdateIndex = currentChats.findIndex(chat => chat.wa_id === newMessage.wa_id);

        let updatedChat;
        if (chatToUpdateIndex > -1) {
          updatedChat = {
            ...currentChats[chatToUpdateIndex],
            lastMessage: newMessage.body || newMessage.text,
            timestamp: newMessage.createdAt || newMessage.timestamp
          };
        } else {
          updatedChat = {
            wa_id: newMessage.wa_id,
            name: newMessage.name,
            lastMessage: newMessage.body || newMessage.text,
            timestamp: newMessage.createdAt || newMessage.timestamp
          };
        }

        const remainingChats = currentChats.filter(chat => chat.wa_id !== newMessage.wa_id);

        return [updatedChat, ...remainingChats];
      });
    };

    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [socket]);

  return (
    <div className="sidebar-main-container">
      <IconBar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      <div className="chat-list-container">
        <div className="sidebar-header">
         <h3>Chat</h3>
          <div className="sidebar-header-icons">
            <BsFillChatLeftTextFill />
            <IoEllipsisVertical />
          </div>
        </div>
        <SearchBar />
        <div className="chat-list">
          {chats.map((chat) => (
            <div
              key={chat.wa_id}
              onClick={() => onSelectChat(chat)}
              className={`chat-list-item ${selectedChat?.wa_id === chat.wa_id ? 'active-chat' : ''}`}
            >
              <Avatar />
              <div className="chat-info">
                <div className="chat-info-top">
                  <div className="chat-name">{chat.name || chat.wa_id}</div>
                  <div className="chat-timestamp">{formatTimestamp(chat.timestamp)}</div>
                </div>
                <div className="chat-info-bottom">
                  <p className="last-message">{chat.lastMessage || 'No messages yet'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;