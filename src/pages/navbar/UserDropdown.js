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

const UserDropdown = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
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
          <span className="user-status">ادمین</span>
        </div>
        <Avatar
          img={defaultAvatar}
          imgHeight="40"
          imgWidth="40"
          status="online"
        />
      </DropdownToggle>
      <DropdownMenu end>
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
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
