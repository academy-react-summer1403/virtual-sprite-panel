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
import { MoreVertical, Edit, Trash } from "react-feather";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const TableHover = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1); // صفحه فعلی
  const rowsPerPage = 5; // تعداد رکوردهای هر صفحه
  const navigate = useNavigate(); // Instantiate useNavigate

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
    navigate(`/userManagementEdit/${userId}`);
  };

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
                {user.fname ? `${user.fname} ${user.lname}` : "نام‌ثبت نشده"}
              </td>
              <td>{user.gmail}</td>
              <td>{user.phoneNumber}</td>
              <td>
                <Badge color="light-primary">{user.userRoles}</Badge>
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
                        handleEdit(user.id); // Call the handleEdit function with userId
                      }}
                    >
                      <Edit className="me-50" size={15} />{" "}
                      <span className="align-middle">ویرایش</span>
                    </DropdownItem>
                    <DropdownItem href="#" onClick={(e) => e.preventDefault()}>
                      <Trash className="me-50" size={15} />{" "}
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
          <PaginationItem
            key={index + 1}
            active={index + 1 === currentPage}
          >
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
