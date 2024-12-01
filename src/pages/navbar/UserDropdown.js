import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import defaultAvatar from "@src/assets/images/portrait/small/adminAvatar.png";
import guest from "@src/assets/images/portrait/small/guest.png";
import { clearStorage } from "../../@core/components/common/storage.services";
import { getUserDetailWithId } from "../../core/services/api/User/UserDetailsWithId.api";

const UserDropdown = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const navigate = useNavigate();
  // const { id } = useParams();
  console.log(id);
  const getDetails = async () => {
    if (token) {
      const result = await getUserDetailWithId(id);
      console.log("what is this rezi", result);
      setData(result);
    } else {
      console.log("توکن وجود ندارد");
    }
  };
  useEffect(() => {
    getDetails();
  }, [id]);
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
          <span className="user-name fw-bold">
            {" "}
            {data.fName} {data.lName}
          </span>
          <span className="user-status">
            {isLoggedIn ? data.gmail : "کاربر مهمان"}
          </span>
        </div>
        <Avatar
          img={isLoggedIn ? defaultAvatar : guest}
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
