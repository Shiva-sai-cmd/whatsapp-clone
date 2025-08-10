import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './MessageInput.css';
import { BsEmojiSmile } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import { FaMicrophone } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';

const API_URL = "https://whatsapp-clone-backend-i7np.onrender.com/api";

const MessageInput = ({ selectedChat }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "20px"; // Reset height
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [text]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const messageData = {
      to: selectedChat.wa_id,
      body: text,
      name:selectedChat.name,
    };

    try {
      await axios.post(`${API_URL}/messages`, messageData);
      setText('');
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  return (
    <div className="message-input-container">
      <div className="input-icons">
        <BsEmojiSmile />
        <ImAttachment />
      </div>
      <form className="message-input-wrapper" onSubmit={handleSubmit}>
        <textarea
          ref={textareaRef}
          className="message-textarea"
          placeholder="Type a message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={1}
        />
      </form>
      <div className="action-button">
        {text ? (
          <IoSend onClick={handleSubmit} />
        ) : (
          <FaMicrophone />
        )}
      </div>
    </div>
  );
};

export default MessageInput;