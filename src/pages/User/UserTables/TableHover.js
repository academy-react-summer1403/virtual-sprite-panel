import { useState } from "react";
import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
// import AvatarGroup from "@components/avatar-group";

import admin from "@src/assets/images/portrait/small/admin.png"; 
import employee from "@src/assets/images/portrait/small/employee.png"; 
import mentor from "@src/assets/images/portrait/small/mentor.png";
import referee from "@src/assets/images/portrait/small/referee.png";
import student from "@src/assets/images/portrait/small/student.png"; 
import support from "@src/assets/images/portrait/small/support.png";
import assistance from "@src/assets/images/portrait/small/assistance.png"; 
import teacher from "@src/assets/images/portrait/small/teacher.png"; 
import tourAdmin from "@src/assets/images/portrait/small/tourAdmin.png"; 
import writer from "@src/assets/images/portrait/small/writer.png"; 
import { MoreVertical, Edit, Trash } from "react-feather";
import { useNavigate } from "react-router-dom"; 

const TableHover = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);  
  const rowsPerPage = 5; 
  const navigate = useNavigate(); 

  // محاسبه داده‌های صفحه فعلی
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  // تعداد صفحات
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // تغییر صفحه
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // هدایت به صفحه ویرایش
  const handleEdit = (userId) => {
    navigate(`/user-management-edit/${userId}`);
  };
  const avatarGroupData = [
    {
      title: "ادمین",
      img: admin,
      imgHeight: 26,
      imgWidth: 26,
    },
    {
      title: "کارمند",
      img: employee,
      imgHeight: 26,
      imgWidth: 26,
    },
    {
      title: "منتور",
      img: mentor,
      imgHeight: 26,
      imgWidth: 26,
    },
    {
      title: "معرف",
      img: referee,
      imgHeight: 26,
      imgWidth: 26,
    },
    {
      title: "دانشجو",
      img: student,
      imgHeight: 26,
      imgWidth: 26,
    },
    {
      title: "پشتیبان",
      img: support,
      imgHeight: 26,
      imgWidth: 26,
    },
    {
      title: "استاد",
      img: teacher,
      imgHeight: 26,
      imgWidth: 26,
    },
    {
      title: "ادمین تور",
      img: tourAdmin,
      imgHeight: 26,
      imgWidth: 26,
    },
    {
      title: "نویسنده",
      img: writer,
      imgHeight: 26,
      imgWidth: 26,
    },{
      title: "دستیار",
      img: assistance,
      imgHeight: 26,
      imgWidth: 26,
    },
  ];
  console.log("پاسخ TableHover data : ", data);

  return (
    <>
      <Table hover responsive>
        <thead>
          <tr>
            <th>نام</th>
            <th>ایمیل</th>
            <th>شماره تلفن</th>
            <th>نقش کاربر</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((user) => (
            <tr key={user.id}>
              <td>
                {user.fname ? `${user.fname}` : " بدون نام "}
                {user.lname ? ` ${user.lname}` : " بدون فامیل "}
              </td>
              <td>{user.gmail}</td>
              <td>{user.phoneNumber}</td>
              <td>
                <Badge
                  color="light-primary"
                  style={{ display: "flex", gap: "0px" }}
                >
                  {user?.userRoles && (
                    <>
                      {user.userRoles.includes("Administrator") && (
                        <img
                          src={admin}
                          alt="ادمین"
                          style={{ width: "15px", height: "15px" }}
                          // hover="ادمین"
                        />
                      )}
                      {user.userRoles.includes("Teacher") && (
                        <img
                          src={teacher}
                          alt="استاد"
                          style={{ width: "15px", height: "15px" }}
                          title="استاد"

                        />
                      )}
                      {user.userRoles.includes("Employee.Admin") && (
                        <img
                          src={employee}
                          alt="کارمند"
                          style={{ width: "15px", height: "15px" }}
                        />
                      )}
                      {user.userRoles.includes("CourseAssistance") && (
                        <img
                          src={assistance}
                          alt="دستیار"
                          style={{ width: "15px", height: "15px" }}
                        />
                      )} {user.userRoles.includes("Employee.Writer") && (
                        <img
                          src={writer}
                          alt="نویسنده"
                          style={{ width: "15px", height: "15px" }}
                        />
                      )}
                      {user.userRoles.includes("Student") && (
                        <img
                          src={student}
                          alt="دانشجو"
                          style={{ width: "15px", height: "15px" }}
                        />
                      )}
                      {user.userRoles.includes("TournamentAdmin") && (
                        <img
                          src={tourAdmin}
                          alt="ادمین تور"
                          style={{ width: "15px", height: "15px" }}
                        />
                      )}
                      {user.userRoles.includes("Referee") && (
                        <img
                          src={referee}
                          alt="معرف"
                          style={{ width: "15px", height: "15px" }}
                        />
                      )}
                      {user.userRoles.includes("TournamentMentor") && (
                        <img
                          src={mentor}
                          alt="منتور"
                          style={{ width: "15px", height: "15px" }}
                        />
                      )}
                      {user.userRoles.includes("Support") && (
                        <img
                          src={support}
                          alt="پشتیبان"
                          style={{ width: "15px", height: "15px" }}
                        />
                      )}
                    </>
                  )}
                </Badge>

                {/* <Badge color="light-primary">
                  {user?.userRoles?.includes("Administrator") ? (
                    <img
                      src={admin}
                      alt="ادمین"
                      style={{ width: "20px", height: "20px" }}
                    />
                  ) : user?.userRoles?.includes("Teacher") ? (
                    <img
                      src={teacher}
                      alt="استاد"
                      style={{ width: "20px", height: "20px" }}
                    />
                  )  : user?.userRoles?.includes("Employee.Admin") ? (
                    <img
                      src={employee}
                      alt="کارمند"
                      style={{ width: "20px", height: "20px" }}
                    />
                  ) 
                  : user?.userRoles?.includes("Employee.Writer") ? (
                    <img
                      src={writer}
                      alt="نویسنده"
                      style={{ width: "20px", height: "20px" }}
                    />
                  ) : user?.userRoles?.includes("Student") ? (
                    <img
                      src={student}
                      alt="دانشجو"
                      style={{ width: "20px", height: "20px" }}
                    />
                  ) 
                  : (
                    user?.userRoles || ""
                  )}
                </Badge> */}
                {/* <Badge
                  color="light-primary"
                  style={{ display: "flex", gap: "5px" }}
                >
                  {(Array.isArray(user?.userRoles) ? user.userRoles : []).map(
                    (role) => {
                      // نقشه نقش‌ها به تصاویر
                      const roleImages = {
                        Administrator: admin,
                        Teacher: teacher,
                        "Employee.Admin": employee,
                        "Employee.Writer": writer,
                        Student: student,
                      };

                      return (
                        roleImages[role] && (
                          <img
                            key={role}
                            src={roleImages[role]}
                            alt={role} // می‌توانید alt فارسی برای هر نقش تنظیم کنید
                            style={{ width: "20px", height: "20px" }}
                          />
                        )
                      );
                    }
                  )}
                </Badge> */}
              </td>
              <td>
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="icon-btn hide-arrow"
                    color="transparent"
                    size="sm"
                    caret
                  >
                    <MoreVertical size={15} />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleEdit(user.id);
                      }}
                    >
                      <Edit className="me-50" size={15} />
                      <span className="align-middle"  onClick={() => console.log(` انتخابی منID: ${user.id}`)}>ویرایش</span>
                    </DropdownItem>
                    <DropdownItem href="#" onClick={(e) => e.preventDefault()}>
                      <Trash className="me-50" size={15} />
                      <span className="align-middle">حذف</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="d-flex justify-content-center mt-3">
        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem key={index + 1} active={index + 1 === currentPage}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                paginate(index + 1);
              }}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
      </Pagination>
    </>
  );
};

export default TableHover;
