import React from 'react';
import './MessageMeta.css';
import { IoCheckmark, IoCheckmarkDone } from 'react-icons/io5';

const formatTime = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
};

const MessageMeta = ({ status, timestamp }) => {
  const renderTicks = () => {
    if (!status) return null;
    if (status === 'sent') return <IoCheckmark />;
    if (status === 'delivered') return <IoCheckmarkDone />;
    if (status === 'read') return <IoCheckmarkDone />; 
    return null;
  };

  return (
    <div className="message-meta-container">
      <span className="timestamp">{formatTime(timestamp)}</span>
      <span className={`status-ticks ${status === 'read' ? 'read' : ''}`}>
        {renderTicks()}
      </span>
    </div>
  );
};

export default MessageMeta;