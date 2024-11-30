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
import { getUserDetailWithId } from "../../../core/services/api/User/UserDetailsWithId.api";

const UserManagementEdit = () => {
  const [active, setActive] = useState("1");
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);

  const { id } = useParams();
  console.log(id);
  const getUserDetails = async () => {
    if (token) {
      const result = await getUserDetailWithId(id);
      console.log("user اطلاعات", result);
      setData(result);
    } else {
      console.log("توکن وجود ندارد");
    }
  };
  useEffect(() => {
    getUserDetails();
  }, [id]);

  return (
    <>
      <Row>
        <Col lg="4">
          <Card>
            <CardImg src=""></CardImg>
            <CardBody>
              <CardTitle tag="h4" className="border-bottom boldYekan">
                جزییات کاربر
              </CardTitle>
              <CardColumns>
                <CardText className="d-flex flex-row align-items-center">
                  <Row>
                    <Col>
                      <img
                        src={data.currentPictureAddress || "مسیر پیش‌فرض تصویر"}
                        alt="عکس کاربر"
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                        }}
                      />
                    </Col>
                  </Row>
                  <Col>
                    <Row>
                      <Col>{data.fName}</Col>
                    </Row>
                    <Row>
                      <Col>{data.lName}</Col>
                    </Row>
                  </Col>
                </CardText>
                <CardText className="d-flex flex-row gap-2 ">
                  <h5 className="mt-2 "> نقش ها:</h5>
                  <Col className="mt-2">
                    {data.roles && data.roles.length > 0
                      ? data.roles.map((role) => role.roleName).join(" ☻ ")
                      : "نقشی برای این کاربر تعریف نشده است"}
                  </Col>
                </CardText>
                <CardText className="d-flex flex-row gap-2">
                  <h4 className="mt-2 ">نام کلاس:</h4>
                  <h5 className="mt-2"></h5>
                </CardText>
                <CardText className="d-flex flex-row gap-2">
                  <h4 className="mt-2 ">وضعیت:</h4>
                  <h5 className="mt-2"></h5>
                </CardText>
                <CardText className="d-flex flex-row gap-2">
                  <h4 className="mt-2 ">نحوه برگزاری:</h4>
                  <h5 className="mt-2"></h5>
                </CardText>
              </CardColumns>
              <div className="demo-inline-spacing">
                <Button
                  // onClick={() => handleEditClick(data.courseId)}
                  color="relief-primary"
                >
                  ویرایش
                </Button>
                <Button outline color="warning">
                  غیرفعال کردن دوره
                </Button>
                <Button outline color="danger">
                  حذف دوره
                </Button>
              </div>
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
                مشخصات
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={active === "2"}
                onClick={() => {
                  toggle("2");
                }}
              >
                فیلم دوره
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                active={active === "3"}
                onClick={() => {
                  toggle("3");
                }}
              >
                رزرو کننده ها
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={active === "4"}
                onClick={() => {
                  toggle("4");
                }}
              >
                دانشجویان
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={active === "5"}
                onClick={() => {
                  toggle("5");
                }}
              >
                نظرات
              </NavLink>
            </NavItem>
          </Nav>
          <Card>
            <TabContent className="py-50" activeTab={active}>
              <TabPane tabId="1">
                <div className="d-flex flex-row  justify-content-around">
                  <Card className=" border border-primary">
                    <CardHeader className="text-center">
                      {/* {data.courseLikeTotal} */}
                    </CardHeader>
                    <CardBody>تعدادلایک ها</CardBody>
                  </Card>
                  <Card className="border border-danger">
                    <CardHeader></CardHeader>
                    <CardBody>تعداد رزرو ها</CardBody>
                  </Card>
                  <Card className="border border-warning">
                    <CardHeader></CardHeader>
                    <CardBody>تعداد پرداخت های ناموفق</CardBody>
                  </Card>
                  <Card className="border border-success">
                    <CardHeader></CardHeader>
                    <CardBody>تعداد دانشجویان</CardBody>
                  </Card>
                </div>
                <div>
                  <Card>
                    <CardHeader className="text-center text-lg">
                      <h2>توضیحات</h2>
                    </CardHeader>
                    <CardBody>
                      {/* {data.describe} */}
                      <CardColumns>
                        <CardText className="d-flex flex-row gap-2">
                          <h3 className="mt-2 ">قیمت:</h3>
                          <h4 className="mt-2"></h4>
                        </CardText>
                        <CardText className="d-flex flex-row gap-2">
                          <h3 className="mt-2 ">گروه های دوره:</h3>
                          <h4 className="mt-2"></h4>
                        </CardText>
                        <CardText className="d-flex flex-row gap-2">
                          <h3 className="mt-2 ">شناسه گروه :</h3>
                          <h4 className="mt-2"></h4>
                        </CardText>
                        <CardText className="d-flex flex-row gap-2">
                          <h3 className="mt-2 ">ظرفیت:</h3>
                          <h4 className="mt-2"></h4>
                        </CardText>
                        <CardText className="d-flex flex-row gap-2">
                          <h3 className="mt-2 ">نام گروه:</h3>
                          <h4 className="mt-2"></h4>
                        </CardText>
                      </CardColumns>
                      <div className="demo-inline-spacing">
                        <Button outline color="danger">
                          حذف
                        </Button>
                        {/* <Button onClick={(courseId)=>handleRowClick(courseId)} color="info">ویرایش</Button> */}
                      </div>
                      <Button className="m-1" color="relief-primary">
                        اضافه کردن گروه
                      </Button>
                    </CardBody>
                  </Card>
                </div>
              </TabPane>
              <TabPane tabId="2">
                <h1 className="m-2">فیلم مربوط به این دوره</h1>
                <p className="m-2">فیلمی موجود نیست</p>
              </TabPane>
              <TabPane tabId="3">
                <h1 className="m-2">کاربرانی که این دوره را رزرو کرده اند</h1>
                <Table
                  className="text-nowrap text-center border-bottom"
                  responsive
                >
                  <thead>
                    <tr>
                      <th className="text-start">رزرو کننده</th>
                      <th>تاریخ رزرو</th>
                      <th>وضعیت رزرو</th>
                      <th>پذیرش</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-start"> </td>
                      <td>jmn</td>
                      <td>
                        <Button.Ripple className="round" color="success">
                          تایید شده
                        </Button.Ripple>
                      </td>
                      <td>
                        <div className="d-flex flex-row gap-1 justify-content-center">
                          <Button.Ripple color="success">
                            <Check size={14} />
                          </Button.Ripple>
                          <Button.Ripple className="" color="danger">
                            *
                          </Button.Ripple>
                        </div>
                      </td>
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
                <h1 className="m-2">کامنت های مربوط به این دوره</h1>
                <Table
                  className="text-nowrap text-center border-bottom"
                  responsive
                >
                  <thead>
                    <tr>
                      <th className="text-start"> نویسنده</th>
                      <th>عنوان</th>
                      <th>متن </th>
                      <th>وضعیت</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-start"> m ,m</td>
                      <td>jmn</td>
                      <td>
                        <Button.Ripple className="round" color="danger">
                          تایید نشده
                        </Button.Ripple>
                      </td>
                      <td>
                        <div className="d-flex flex-row gap-1 justify-content-center">
                          <Button.Ripple color="success">
                            <Check size={14} />
                          </Button.Ripple>
                          <Button.Ripple className="" color="danger">
                            *
                          </Button.Ripple>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </TabPane>
            </TabContent>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default UserManagementEdit;
