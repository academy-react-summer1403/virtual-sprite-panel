import {
  Nav,
  TabPane,
  NavItem,
  NavLink,
  Dropdown,
  TabContent,
  Table,
  Form,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardColumns,
  CardText,
  Col,
  Row,
  CardImg,
  Label,
  InputGroup,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
// ** Reactstrap Imports

import "@styles/react/libs/react-select/_react-select.scss";
import { Edit, Edit2, Trash2, Search } from "react-feather";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import TableHover from "./Table";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCommentManeger } from "../../core/services/api/comment/Comment";
import ReactPaginate from "react-paginate";
const Comment = () => {
  const [comment, setComment] = useState([]);
  const [pageNumber, setPageNumber] = useState();
  const [totalPages, setTotalPages] = useState(10);
  const [RowsOfPage, setRowsOfPage] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {
      const result = await getCommentManeger(pageNumber, RowsOfPage);
      setComment(result.comments);
      setTotalPages(Math.ceil(result?.totalCount / RowsOfPage));
      console.log("commenttt", result);
    } catch (error) {
      console.error("Error fetching comment manager:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchData();
  }, [RowsOfPage, pageNumber]);

  const handlePageChange = (selectedPage) => {
    setPageNumber(selectedPage.selected);
  };
  return (
    <>
      <Col>
        <Col className="mt-1">
          <Card>
            <CardBody>
              <Row lg={4} className="justify-content-between mb-2">
                <Col lg={2} className="mb-1">
                  <Label className="form-label" for="level">
                    نمایش
                  </Label>

                  <Select
                    theme={selectThemeColors}
                    isClearable={false}
                    id="RowsOfPage"
                    className="react-select"
                    classNamePrefix="select"
                    options={[
                      { value: 5, label: "5" },
                      { value: 10, label: "10" },
                      { value: 15, label: "15" },
                    ]}
                    onChange={(e) => setRowsOfPage(e.value)}
                  />
                </Col>
                <Col lg={7}>
                  {/* <Row lg={3}>
                    <Col md="4" className="mb-1">
                      <Label className="form-label" for="level">
                        کاربر
                      </Label>
                      <Select
                        theme={selectThemeColors}
                        isClearable={false}
                        id="level"
                        name="level"
                        className="react-select"
                        classNamePrefix="select"
                        // options={termOptions}
                      />
                    </Col>
                  </Row> */}
                  <Row>
                    <Col className="mt-2" lg={8}>
                      <InputGroup>
                        <Button color="primary" outline>
                          <Search size={12} />
                        </Button>
                        <Input type="text" placeholder="Button on both sides" />
                        <Button color="primary" outline
                      onChange={(e) => setSearchTerm(e.target.value)}
                        
                        >
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
        <Table
          id="totalTable"
          className="text-nowrap text-center border-bottom "
          hover
          responsive
        >
          <thead>
            <tr>
              <th className="text-start">کاربر</th>
              <th>عنوان</th>
              <th>متن</th>
              <th>دوره</th>
            </tr>
          </thead>

          <tbody>
            {comment.map((item, index) => (
              <tr key={index}>
                <td className="text-start">{item.userFullName}</td>
                <td>{item.commentTitle}</td>
                <td>{item.describe}</td>
                <td>{item.courseTitle}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <nav aria-label="Page navigation">
          <ReactPaginate
            previousLabel={"قبلی"}
            nextLabel={"بعدی"}
            breakLabel={"..."}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"pagination justify-content-center"}
            activeClassName={"active"}
            previousClassName={"page-item"}
            nextClassName={"page-item"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
          />
        </nav>
      </Col>
    </>
  );
};
export default Comment;
