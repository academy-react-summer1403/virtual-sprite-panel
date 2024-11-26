import { Fragment, useEffect, useState } from "react";
// ** Third Party Components
import classnames from "classnames";
import { Check, Twitter } from "react-feather";
import linkdin from "../../../assets/images/detail/linkdin.png";
import twiter from "../../../assets/images/detail/twiter.webp";
// import ModalBasic from "./Modal.jsx";
// ** Reactstrap Imports
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
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardColumns,
  CardText,
  Col,
  Row,
  CardImg,
  Button,
} from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";

const UserManagementDetail = () => {
  const [active, setActive] = useState("1");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const toggle = (tab) => {
    setActive(tab);
  };
  return (
    <>
      <Row>
        <Col lg="4">
          <Card>
            <CardImg></CardImg>
            <CardTitle></CardTitle>
            <CardBody>
              <CardTitle tag="h4" className="border-bottom">
                جزيیات
              </CardTitle>
              <CardColumns>
                <CardText className="d-flex flex-row gap-2">
                  <h3 className="mt-2 ">نام کاربری:</h3>{" "}
                  <h5 className="mt-2"></h5>
                </CardText>
                <CardText className="d-flex flex-row gap-2">
                  <h3 className="mt-2 "> ایمیل:</h3> <h5 className="mt-2"></h5>
                </CardText>
                <CardText className="d-flex flex-row gap-2">
                  <h3 className="mt-2 ">وضعیت :</h3> <h5 className="mt-2"></h5>
                </CardText>
                <CardText className="d-flex flex-row gap-2">
                  <h3 className="mt-2 ">درصد تکمیل پروفایل:</h3>{" "}
                  <h5 className="mt-2"></h5>
                </CardText>
                <CardText className="d-flex flex-row gap-2">
                  <h3 className="mt-2 "> جنسیت:</h3> <h5 className="mt-2"></h5>
                </CardText>
              </CardColumns>
            </CardBody>
          </Card>
        </Col>

        <Col lg="8" className=".bg-light-subtle">
          <Nav pills>
            <NavItem>
              <NavLink
                active={active === "1"}
                onClick={() => {
                  toggle("1");
                }}
              >
                دوره ها
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={active === "2"}
                onClick={() => {
                  toggle("2");
                }}
              >
                دوره های رزرو
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                active={active === "3"}
                onClick={() => {
                  toggle("3");
                }}
              >
                کامنت ها
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={active === "4"}
                onClick={() => {
                  toggle("4");
                }}
              >
                سایر اطلاعات کاربر
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={active === "5"}
                onClick={() => {
                  toggle("5");
                }}
              >
                ارتباط با کاربر
              </NavLink>
            </NavItem>
          </Nav>
          <Card>
            <TabContent className="py-50" activeTab={active}>
              <TabPane tabId="1">
                <Table
                  className="text-nowrap text-center border-bottom"
                  responsive
                >
                  <thead>
                    <tr>
                      <th className="text-start">نام دوره </th>
                      <th>توضیحات دوره </th>
                      <th> تاریخ آخرین بروزرسانی</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-start">
                        <img></img>
                        دپدو
                      </td>
                      <td>نتمن</td>
                      <td>دپدپن</td>
                    </tr>
                  </tbody>
                </Table>
              </TabPane>
              <TabPane tabId="2">
                <Table
                  className="text-nowrap text-center border-bottom"
                  responsive
                >
                  <thead>
                    <tr>
                      <th className="text-start">نام دوره </th>
                      <th>تاریخ رزرو</th>
                      <th>وضعیت دوره</th>
                      <th>عملیات</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-start">نمنپم</td>
                      <td>jmn</td>
                      <td>
                        <Button.Ripple outline color="danger">
                          رزرو شده
                        </Button.Ripple>
                      </td>
                      <td>
                        <Button.Ripple gradiant color="secondary">
                          جزيیات
                        </Button.Ripple>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </TabPane>
              <TabPane tabId="3">
                <Table
                  className="text-nowrap text-center border-bottom"
                  responsive
                >
                  <thead>
                    <tr>
                      <th className="text-start"> نام دوره</th>
                      <th>عنوان کامنت </th>
                      <th>وضعیت </th>
                      <th>اقدام</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-start"></td>
                      <td>jmn</td>
                      <td>
                        <Button.Ripple className="round" color="success">
                          تایید شده
                        </Button.Ripple>
                      </td>
                      <td>...</td>
                    </tr>
                  </tbody>
                </Table>
              </TabPane>
              <TabPane tabId="4">
                <h1 className="m-2">دانشجویان مربوط به این دوره</h1>
                <Table
                  className="text-nowrap text-center border-bottom"
                  responsive
                >
                  <thead>
                    <tr>
                      <th className="text-start">نام دانشجو </th>
                      <th> نمره</th>
                      <th>وضعیت پرداخت</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-start"> m ,m</td>
                      <td>0</td>
                      <td>
                        <Button.Ripple className="round" color="danger">
                          پرداخت نشده
                        </Button.Ripple>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </TabPane>
              <TabPane tabId="5">
                <h1 className="m-2"> شبکه های اجتماعی</h1>
                <Col className="p-1">
                  <Row lg={5}>
                    <img src={twiter}></img>
                    <Col lg={8}>
                      <Card>
                        <CardTitle>telegram Id</CardTitle>
                        <CardBody>http://t.me</CardBody>
                      </Card>
                    </Col>
                  </Row>
                  <Row lg={5} className="mt-1">
                    <img src={linkdin}></img>
                    <Col lg={8}>
                      <Card>
                        <CardTitle>linkdin profile</CardTitle>
                        <CardBody>http://www.linkdin.com</CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </TabPane>
            </TabContent>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default UserManagementDetail;
