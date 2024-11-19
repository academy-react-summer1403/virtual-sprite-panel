import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@components/avatar";
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power,
} from "react-feather";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import defaultAvatar from "@src/assets/images/portrait/small/avatar-s-11.jpg";
import { clearStorage } from "../../@core/components/common/storage.services";

const UserDropdown = () => {
  const navigate = useNavigate();

  // State برای مدیریت وضعیت توکن
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // بررسی توکن هنگام ورود به صفحه
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // اگر توکن وجود داشت true و در غیر این صورت false
  }, []);

  // هندل خروج
  const handleLogout = () => {
    clearStorage();
    navigate("/login");
  };

  // هندل ورود
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">John Doe</span>
          <span className="user-status">{isLoggedIn ? "ادمین" : "کاربر مهمان"}</span>
        </div>
        <Avatar
          img={defaultAvatar}
          imgHeight="40"
          imgWidth="40"
          status={isLoggedIn ? "online" : "offline"}
        />
      </DropdownToggle>
      <DropdownMenu end>
        {isLoggedIn ? (
          <>
            <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
              <User size={14} className="me-75" />
              <span className="align-middle">Profile</span>
            </DropdownItem>
            <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
              <Mail size={14} className="me-75" />
              <span className="align-middle">Inbox</span>
            </DropdownItem>
            <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
              <CheckSquare size={14} className="me-75" />
              <span className="align-middle">Tasks</span>
            </DropdownItem>
            <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
              <MessageSquare size={14} className="me-75" />
              <span className="align-middle">Chats</span>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem
              tag={Link}
              to="/pages/"
              onClick={(e) => e.preventDefault()}
            >
              <Settings size={14} className="me-75" />
              <span className="align-middle">Settings</span>
            </DropdownItem>
            <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
              <CreditCard size={14} className="me-75" />
              <span className="align-middle">Pricing</span>
            </DropdownItem>
            <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
              <HelpCircle size={14} className="me-75" />
              <span className="align-middle">FAQ</span>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={handleLogout}>
              <Power size={14} className="me-75" />
              <span className="align-middle">خروج از حساب</span>
            </DropdownItem>
          </>
        ) : (
          <DropdownItem onClick={handleLogin}>
            <Power size={14} className="me-75" />
            <span className="align-middle">ورود به حساب</span>
          </DropdownItem>
        )}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
