import { Fragment, useEffect, useState } from "react";
// ** Third Party Components
import classnames from "classnames";
import {  Check } from 'react-feather'
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
import { getCoursesDetail } from "../../../core/services/api/courses/courseDetailById.api";

const CoursDetail = () => {


  const [detail, setDetail] = useState([]);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const { id } = useParams();
  console.log(id);
  const getDetails = async () => {
    if (token) {
      const result = await getCoursesDetail(id);
      console.log("course detail", result);
      setData(result);
    } else {
      console.log("توکن وجود ندارد");
    }
  };
  useEffect(() => {
    getDetails();
  }, [id]);

  const [active, setActive] = useState("1");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  
  const toggle = (tab) => {
    setActive(tab);
  };
  const navigate = useNavigate();
  const gotoedit =()=>{
    return(
      navigate("/course-edit")
    )
  }
  return (
    <>
   <Row>
      <Col lg="4">
        <Card>
          <CardImg src={data.imageAddress} ></CardImg>
          <CardBody>
            <CardTitle tag="h4" className="border-bottom">
              جزيیات {id}
            </CardTitle>
            <CardColumns>
              <CardText className="d-flex flex-row gap-2">
                <h3 className="mt-2 ">نام دوره:</h3>{" "}
                <h5 className="mt-2">{data.title}</h5>
              </CardText>
              <CardText className="d-flex flex-row gap-2">
                <h3 className="mt-2 ">نام استاد:</h3>{" "}
                <h5 className="mt-2">{data.teacherName}</h5>
              </CardText>
              <CardText className="d-flex flex-row gap-2">
                <h3 className="mt-2 ">نام کلاس:</h3>{" "}
                <h5 className="mt-2">{data.courseClassRoomName}</h5>
              </CardText>
              <CardText className="d-flex flex-row gap-2">
                <h3 className="mt-2 ">وضعیت:</h3>{" "}
                <h5 className="mt-2">{data.courseLevelName}</h5>
              </CardText>
              <CardText className="d-flex flex-row gap-2">
                <h3 className="mt-2 ">نحوه برگزاری:</h3>{" "}
                <h5 className="mt-2">{data.courseTypeName}</h5>
              </CardText>
            </CardColumns>
            <div className="demo-inline-spacing">
              <Button onClick={gotoedit}  color="relief-primary"> ویرایش</Button>
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
                  <CardHeader className="text-center">{data.courseLikeTotal}</CardHeader>
                  <CardBody>تعدادلایک ها</CardBody>
                </Card>
                <Card className="border border-danger">
                  <CardHeader>{data.reserveUserTotal}</CardHeader>
                  <CardBody>تعداد رزرو ها</CardBody>
                </Card>
                <Card className="border border-warning">
                  <CardHeader>{data.paymentNotDoneTotal}</CardHeader>
                  <CardBody>تعداد پرداخت های ناموفق</CardBody>
                </Card>
                <Card className="border border-success">
                  <CardHeader>{data.courseUserTotal}</CardHeader>
                  <CardBody>تعداد دانشجویان</CardBody>
                </Card>
              </div>
              <div>
                <Card>
                  <CardHeader className="text-center text-lg">
                    <h2>توضیحات</h2>
                  </CardHeader>
                  <CardBody>
                  {data.describe}
                    <CardColumns>
                      <CardText className="d-flex flex-row gap-2">
                        <h3 className="mt-2 ">قیمت:</h3>{" "}
                        <h4 className="mt-2">{data.cost}</h4>
                      </CardText>
                      <CardText className="d-flex flex-row gap-2">
                        <h3 className="mt-2 ">گروه های دوره:</h3>{" "}
                        <h4 className="mt-2">{data.courseGroupTotal}</h4>
                      </CardText>
                      <CardText className="d-flex flex-row gap-2">
                        <h3 className="mt-2 ">شناسه گروه :</h3>{" "}
                        <h4 className="mt-2">5</h4>
                      </CardText>
                      <CardText className="d-flex flex-row gap-2">
                        <h3 className="mt-2 ">ظرفیت:</h3>{" "}
                        <h4 className="mt-2">5</h4>
                      </CardText>
                      <CardText className="d-flex flex-row gap-2">
                        <h3 className="mt-2 ">نام گروه:</h3>{" "}
                        <h4 className="mt-2">{data.title}</h4>
                      </CardText>
                    </CardColumns>
                    <div className="demo-inline-spacing">
                      <Button outline color="danger">
                        حذف
                      </Button>
                      <Button onClick={gotoedit} color="info">ویرایش</Button>
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
            <Table className='text-nowrap text-center border-bottom' responsive>
        <thead>
          <tr>
            <th className='text-start'>رزرو کننده</th>
            <th>تاریخ رزرو</th>
            <th>وضعیت رزرو</th>
            <th>پذیرش</th>
          </tr>
        </thead>
        <tbody>
        <tr >
                <td className='text-start'> {data.insertDate}</td>
                <td>
               jmn 
                </td>
                <td>
                <Button.Ripple className='round' color='success' >
       تایید شده
      </Button.Ripple>
                 
                </td>
                <td>
                  <div className="d-flex flex-row gap-1 justify-content-center">
                <Button.Ripple  color='success' >
                <Check size={14} />
      </Button.Ripple>
      <Button.Ripple className='' color='danger' >
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
            <Table className='text-nowrap text-center border-bottom' responsive>
        <thead>
          <tr>
            <th className='text-start'>نام دانشجو </th>
            <th> نمره</th>
            <th>وضعیت پرداخت</th>
          </tr>
        </thead>
        <tbody>
        <tr >
                <td className='text-start'> m ,m</td>
                <td>
               0 
                </td>
                <td>
                <Button.Ripple className='round' color='danger' >
      پرداخت نشده
      </Button.Ripple>
                 
                </td>
              </tr>
        </tbody>
        </Table>
            </TabPane>
            <TabPane tabId="5">
            <h1 className="m-2">کامنت های مربوط به این دوره</h1>
            <Table className='text-nowrap text-center border-bottom' responsive>
        <thead>
          <tr>
            <th className='text-start'> نویسنده</th>
            <th>عنوان</th>
            <th>متن </th>
            <th>وضعیت</th>
          </tr>
        </thead>
        <tbody>
        <tr >
                <td className='text-start'> m ,m</td>
                <td>
               jmn 
                </td>
                <td>
                <Button.Ripple className='round' color='danger' >
       تایید نشده
      </Button.Ripple>
                 
                </td>
                <td>
                  <div className="d-flex flex-row gap-1 justify-content-center">
                <Button.Ripple  color='success' >
                <Check size={14} />
      </Button.Ripple>
      <Button.Ripple className='' color='danger' >
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

export default CoursDetail;
