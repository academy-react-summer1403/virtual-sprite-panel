import { Mail, Home, Users, Airplay,BookOpen, Circle, Book, PlusCircle } from "react-feather";
// import { FaPager } from "react-icons/fa6";
export default [
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "usermanagement",
    title: "مدریت کاربران",
    icon: <Users size={20} />,
    navLink: "/user-management",
  },
  {
    id: "coursemanagement",
    title: "مدیریت دوره ها",
    icon: <BookOpen size={20} />,
    // navLink: "/course-management",
    children: [
      {
        id: "courselist",
        title: "لیست دوره ها",
        icon: <Book size={12} />,
        navLink: "/course-list",
      },
      {
        id: "courseadd",
        title: "افزودن دوره",
        icon: <PlusCircle size={12} />,
        navLink: "/course-add",
      },
    ],
  },
  {
    id: "smaplePage",
    title: "Sample Page",
    icon: <Airplay size={20} />,
    // navLink: "/sample",
    children: [
      {
        id: "invoiceList",
        title: "List",
        icon: <Circle size={12} />,
        navLink: "/apps/invoice/list",
      },
    ],
  },
];
