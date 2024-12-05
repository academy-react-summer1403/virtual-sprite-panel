// import {
//   Nav,
//   TabPane,
//   NavItem,
//   NavLink,
//   Dropdown,
//   TabContent,
//   Table,
//   Form,
//   Card,
//   CardHeader,
//   CardBody,
//   CardTitle,
//   CardColumns,
//   CardText,
//   Col,
//   Row,
//   CardImg,
//   Label,
//   InputGroup,
//   Input,
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Alert,
//   UncontrolledPopover,
//   PopoverHeader,
//   PopoverBody,
//   Badge,
//   UncontrolledDropdown,
//   DropdownMenu,
//   DropdownItem,
//   DropdownToggle,
//   Pagination,
//   PaginationItem,
//   PaginationLink,
// } from "reactstrap";
// // ** Reactstrap Imports

// import "@styles/react/libs/react-select/_react-select.scss";
// import { Edit, Edit2, Trash2, Search } from "react-feather";
// import Select from "react-select";
// import { selectThemeColors } from "@utils";
// import TableHover from "./Table";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getCommentManeger } from "../../core/services/api/comment/Comment";
// import ReactPaginate from "react-paginate";
// const Comment = () => {
//   const [comment, setComment] = useState([]);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [totalPages, setTotalPages] = useState(10);
//   const [RowsOfPage, setRowsOfPage] = useState(5);

//   const fetchData = async () => {
//     try {
//       const result = await getCommentManeger();
//       setComment(result.comments);
//       console.log("commenttt", result);
//     } catch (error) {
//       console.error("Error fetching comment manager:", error);
//       return [];
//     }
//   };
//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <>
//       <Col>
//         <Row>
//           <Card>
//             <CardTitle className="p-2">فیلتر</CardTitle>
//             <CardBody className="">
//               <Row lg={3}>
//                 <Col md="4" className="mb-1">
//                   <Label className="form-label" for="level">
//                     وضعیت
//                   </Label>
//                   <Select
//                     theme={selectThemeColors}
//                     isClearable={false}
//                     id={`level`}
//                     className="react-select"
//                     classNamePrefix="select"
//                     // options={termOptions}
//                   />
//                 </Col>
//                 <Col md="4" className="mb-1">
//                   <Label className="form-label" for="level">
//                     وضعیت
//                   </Label>
//                   <Select
//                     theme={selectThemeColors}
//                     isClearable={false}
//                     id={`level`}
//                     className="react-select"
//                     classNamePrefix="select"
//                     // options={termOptions}
//                   />
//                 </Col>
//               </Row>
//             </CardBody>
//           </Card>
//         </Row>
//         <Col className="mt-1">
//           <Card>
//             <CardBody>
//               <Row lg={4} className="justify-content-between mb-2">
//                 <Col lg={2} className="mb-1">
//                   <Label className="form-label" for="level">
//                     نمایش
//                   </Label>
//                   <Select
//                     theme={selectThemeColors}
//                     isClearable={false}
//                     id={`level`}
//                     className="react-select"
//                     classNamePrefix="select"
//                     // options={termOptions}
//                   />
//                 </Col>
//                 <Col lg={7}>
//                   <Row>
//                     <Col className="mt-2" lg={8}>
//                       <InputGroup>
//                         <Button color="primary" outline>
//                           <Search size={12} />
//                         </Button>
//                         <Input type="text" placeholder="Button on both sides" />
//                         <Button color="primary" outline>
//                           Search !
//                         </Button>
//                       </InputGroup>
//                     </Col>
//                   </Row>
//                 </Col>
//               </Row>
//             </CardBody>
//           </Card>
//         </Col>
//         <Table
//           className="text-nowrap text-center border-bottom "
//           hover
//           responsive
//         >
//           <thead>
//             <tr>
//               <th className="text-start">کاربر</th>
//               <th>عنوان</th>
//               <th>متن</th>
//               <th>دوره</th>
//             </tr>
//           </thead>

//           <tbody>
//             {comment.map((item, index) => (
//               <tr key={index}>
//                 <td className="text-start">{item.userFullName}</td>
//                 <td>{item.commentTitle}</td>
//                 <td>{item.describe}</td>
//                 <td>{item.courseTitle}</td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//         <ReactPaginate />
//       </Col>
//     </>
//   );
// };
// export default Comment;
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
  Label,
  InputGroup,
  Input,
  Button,
  Table,
} from "reactstrap";
import { Search } from "react-feather";
import Select from "react-select";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import { getCommentManeger } from "../../core/services/api/comment/Comment"; // فرض بر این است که این API برای گرفتن داده‌ها استفاده می‌شود
import { selectThemeColors } from "@utils";

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);  // تغییرات صفحه از صفر شروع می‌شود
  const [totalPages, setTotalPages] = useState(10); // تعداد کل صفحات
  const [rowsPerPage, setRowsPerPage] = useState(5); // تعداد ردیف‌ها در هر صفحه

  const fetchData = async (page) => {
    try {
      const result = await getCommentManeger({ page, rowsPerPage });
      setComments(result.comments);
      setTotalPages(result.totalPages); // این باید از پاسخ API آمده باشد
    } catch (error) {
      console.error("Error fetching comment manager:", error);
    }
  };

  useEffect(() => {
    fetchData(pageNumber); // بارگذاری داده‌ها هر بار که صفحه تغییر می‌کند
  }, [pageNumber, rowsPerPage]);

  // مدیریت تغییرات صفحه
  const handlePageChange = (selectedPage) => {
    setPageNumber(selectedPage.selected); // تغییر صفحه
  };

  return (
    <>
      <Col>
        <Row>
          <Card>
            <CardTitle className="p-2">فیلتر</CardTitle>
            <CardBody>
              <Row lg={3}>
                <Col md="4" className="mb-1">
                  <Label className="form-label" for="status">
                    وضعیت
                  </Label>
                  <Select
                    theme={selectThemeColors}
                    isClearable={false}
                    id="status"
                    className="react-select"
                    classNamePrefix="select"
                  />
                </Col>
                <Col md="4" className="mb-1">
                  <Label className="form-label" for="status">
                    وضعیت
                  </Label>
                  <Select
                    theme={selectThemeColors}
                    isClearable={false}
                    id="status"
                    className="react-select"
                    classNamePrefix="select"
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Row>

        <Col className="mt-1">
          <Card>
            <CardBody>
              <Row lg={4} className="justify-content-between mb-2">
                <Col lg={2} className="mb-1">
                  <Label className="form-label" for="rowsPerPage">
                    نمایش
                  </Label>
                  <Select
                    theme={selectThemeColors}
                    isClearable={false}
                    id="rowsPerPage"
                    className="react-select"
                    classNamePrefix="select"
                    options={[
                      { value: 5, label: "5" },
                      { value: 10, label: "10" },
                      { value: 15, label: "15" },
                    ]}
                    onChange={(e) => setRowsPerPage(e.value)} // تغییر تعداد ردیف‌ها در هر صفحه
                  />
                </Col>
                <Col lg={7}>
                  <Row>
                    <Col className="mt-2" lg={8}>
                      <InputGroup>
                        <Button color="primary" outline>
                          <Search size={12} />
                        </Button>
                        <Input type="text" placeholder="جستجو" />
                        <Button color="primary" outline>
                          جستجو
                        </Button>
                      </InputGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>

        <Table className="text-nowrap text-center border-bottom" hover responsive>
          <thead>
            <tr>
              <th className="text-start">کاربر</th>
              <th>عنوان</th>
              <th>متن</th>
              <th>دوره</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((item, index) => (
              <tr key={index}>
                <td className="text-start">{item.userFullName}</td>
                <td>{item.commentTitle}</td>
                <td>{item.describe}</td>
                <td>{item.courseTitle}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <ReactPaginate
          previousLabel={"قبلی"}
          nextLabel={"بعدی"}
          breakLabel={"..."}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </Col>
    </>
  );
};

export default Comment;

