import {
  Nav,
  TabPane,
  NavItem,
  NavLink,
  Dropdown,
  TabContent,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
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
} from "reactstrap";
import "@styles/react/libs/react-select/_react-select.scss";
import { Edit, Edit2, Trash2, Search } from "react-feather";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import TableHover from "./Table";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCommentManeger } from "../../core/services/api/comment/Comment";
const Comment = () => {
  const [comment, setComment] = useState([]);

  const userId = localStorage.getItem("id");
  const fetchData = async () => {
    try {
      const result = await getCommentManeger(userId);
      console.log("commenttt", result);
      setComment(result);
    } catch (error) {
      console.error("Error fetching comment manager:", error);
      return [];
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Col>
        <Row>
          <Card>
            <CardTitle className="p-2">فیلتر</CardTitle>
            <CardBody>
              <Row lg={3}>
                <Col md="4" className="mb-1">
                  <Label className="form-label" for="level">
                    وضعیت
                  </Label>
                  <Select
                    theme={selectThemeColors}
                    isClearable={false}
                    id={`level`}
                    className="react-select"
                    classNamePrefix="select"
                    // options={termOptions}
                  />
                </Col>
                <Col md="4" className="mb-1">
                  <Label className="form-label" for="level">
                    وضعیت
                  </Label>
                  <Select
                    theme={selectThemeColors}
                    isClearable={false}
                    id={`level`}
                    className="react-select"
                    classNamePrefix="select"
                    // options={termOptions}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Row>
        <Col className="mt-1">
          <Card>
            <CardBody>
              <Row lg={4} className="justify-content-between">
                <Col lg={2} className="mb-1">
                  <Label className="form-label" for="level">
                    نمایش
                  </Label>
                  <Select
                    theme={selectThemeColors}
                    isClearable={false}
                    id={`level`}
                    className="react-select"
                    classNamePrefix="select"
                    // options={termOptions}
                  />
                </Col>
                <Col lg={7}>
                  <Row>
                    <Col className="mt-2" lg={8}>
                      <InputGroup>
                        <Button color="primary" outline>
                          <Search size={12} />
                        </Button>
                        <Input type="text" placeholder="Button on both sides" />
                        <Button color="primary" outline>
                          Search !
                        </Button>
                      </InputGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
              {/* <Table
                className="text-nowrap text-center border-bottom"
                responsive
              >
                <thead>
                  <tr>
                    <th className="text-start"> کاربر </th>
                    <th> عنوان کامنت </th>
                    <th>نمایش کامنت </th>
                    <th>دوره </th>
                    <th> وضعیت </th>
                    <th>پاسخ ها </th>
                    <th>اقدام </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-start"> m ,m</td>
                    <td>0</td>
                    <td>تننتتن</td>
                    <td>تات</td>
                    <td>
                      <Button.Ripple color="flat-success">
                        تاییدشده
                      </Button.Ripple>
                    </td>
                    <td>تننتن</td>
                    <td>
                      <Button id="popBottom" color="white">
                        ...
                      </Button>
                      <UncontrolledPopover
                        placement="bottom"
                        target="popBottom"
                      >
                        <PopoverBody>
                          <Edit size={12} className="pl-1 " /> رد کردن
                        </PopoverBody>
                        <PopoverBody>
                          <Trash2 size={12} className="pl-1" /> حذف
                        </PopoverBody>
                        <PopoverBody>
                          <Edit2 size={12} className="pl-1" /> پاسخ{" "}
                        </PopoverBody>
                      </UncontrolledPopover>
                    </td>
                  </tr>
                </tbody>
              </Table> */}
              <TableHover />
            </CardBody>
          </Card>
        </Col>
      </Col>
    </>
  );
};
export default Comment;
