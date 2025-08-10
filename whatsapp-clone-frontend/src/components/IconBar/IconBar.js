import React from 'react';
import './IconBar.css';
import { FaBars } from 'react-icons/fa';
import { IoChatbubbleEllipsesOutline, IoCallOutline, IoSettingsOutline } from 'react-icons/io5';
import { HiOutlineStatusOnline } from "react-icons/hi";
import { TbHexagonLetterM } from "react-icons/tb";
import { CiStar } from "react-icons/ci";
import { BiArchiveIn } from "react-icons/bi";
import Avatar from '../common/Avatar';

const NavItem = ({ icon, label, active }) => (
  <div className={`nav-item ${active ? 'active' : ''}`}>
    {icon}
    <span className="nav-item-label">{label}</span>
  </div>
);

const IconBar = ({ isNavOpen, setIsNavOpen }) => {
  return (
    <div className={`icon-bar-container ${isNavOpen ? 'expanded' : ''}`}>
      <div className="icon-bar-header">
        <FaBars onClick={() => setIsNavOpen(!isNavOpen)} />
      </div>

      <div className="icon-bar-top">
        <NavItem icon={<IoChatbubbleEllipsesOutline />} label="Chats" active />
        <NavItem icon={<IoCallOutline />} label="Calls" />
        <NavItem icon={<HiOutlineStatusOnline />} label="Status" />
        <NavItem icon={<TbHexagonLetterM />} label="Meta AI" />
      </div>

      <div className="icon-bar-bottom">
        <NavItem icon={<CiStar />} label="Starred messages" />
        <NavItem icon={<BiArchiveIn />} label="Archived chats" />
        <NavItem icon={<IoSettingsOutline />} label="Settings" />
        <NavItem icon={<Avatar />} label="Profile" />
      </div>
    </div>
  );
};

export default IconBar;