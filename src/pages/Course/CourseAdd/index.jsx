import Select from "react-select";
import { selectThemeColors } from "@utils";
import { useEffect, useState } from "react";
import {
  Card,
  Table,
  CardHeader,
  CardBody,
  CardColumns,
  CardText,
  Nav,
  TabContent,
  TabPane,
  Col,
  Row,
  Button,
  NavItem,
  NavLink,
} from "reactstrap";
import { getCourses } from "../../../core/services/api/courses/createCourseStep1";

const CourseAdd = () => {
  const [createCourse, setCreateCourse] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [active, setActive] = useState("1");

  const getCreateCourses = async () => {
    try {
      const result = await getCourses();
      setCreateCourse(result.courseTypeDtos);

      // تبدیل داده‌های API به ساختار typeOptions
      const options = result.courseTypeDtos.map((item) => ({
        value: item.id,
        label: item.typeName,
      }));
      setTypeOptions(options);
    } catch (error) {
      console.error("خطا در دریافت داده‌ها:", error);
    }
  };

  useEffect(() => {
    getCreateCourses();
  }, []);

  const toggle = (tab) => {
    setActive(tab);
  };

  return (
    <>
      <Row>
        <Col lg="11" className=".bg-light-subtle">
          <Nav pills>
            <NavItem>
              <NavLink
                active={active === "1"}
                onClick={() => {
                  toggle("1");
                }}
              >
                مرحله اول
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={active === "2"}
                onClick={() => {
                  toggle("2");
                }}
              >
                مرحله دوم
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                active={active === "3"}
                onClick={() => {
                  toggle("3");
                }}
              >
                مرحله سوم
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={active === "4"}
                onClick={() => {
                  toggle("4");
                }}
              >
                مرحله چهارم
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={active === "5"}
                onClick={() => {
                  toggle("5");
                }}
              >
                مرحله پنجم
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
                    <CardHeader>{/* {data.reserveUserTotal} */}</CardHeader>
                    <CardBody>تعداد رزرو ها</CardBody>
                  </Card>
                  <Card className="border border-warning">
                    <CardHeader>{/* {data.paymentNotDoneTotal} */}</CardHeader>
                    <CardBody>تعداد پرداخت های ناموفق</CardBody>
                  </Card>
                  <Card className="border border-success">
                    <CardHeader>{/* {data.courseUserTotal} */}</CardHeader>
                    <CardBody>تعداد دانشجویان</CardBody>
                  </Card>
                </div>
                <div>
                  <Card>
                    <CardHeader className="text-center text-lg">
                      <h4>موضوع دوره : </h4>
                      <Select
                        theme={selectThemeColors}
                        className="react-select"
                        classNamePrefix="select"
                        defaultValue={typeOptions[0]}
                        options={typeOptions}
                        isClearable={false}
                      />
                    </CardHeader>
                    <CardBody>
                      {/* {data.describe} */}
                      <CardColumns>
                        <CardText className="d-flex flex-row gap-2">
                          <h4 className="mt-2 ">قیمت:</h4>{" "}
                          <h5 className="mt-2">{/* {data.cost} */}</h5>
                        </CardText>
                        <CardText className="d-flex flex-row gap-2">
                          <h4 className="mt-2 ">گروه های دوره:</h4>{" "}
                          <h5 className="mt-2">
                            {/* {data.courseGroupTotal} */}
                          </h5>
                        </CardText>
                        <CardText className="d-flex flex-row gap-2">
                          <h4 className="mt-2 ">شناسه گروه :</h4>{" "}
                          <h5 className="mt-2">5</h5>
                        </CardText>
                        <CardText className="d-flex flex-row gap-2">
                          <h4 className="mt-2 ">ظرفیت:</h4>{" "}
                          <h5 className="mt-2">5</h5>
                        </CardText>
                        <CardText className="d-flex flex-row gap-2">
                          <h4 className="mt-2 ">نام گروه:</h4>{" "}
                          <h5 className="mt-2">{/* {data.title} */}</h5>
                        </CardText>
                      </CardColumns>
                      <div className="demo-inline-spacing">
                        <Button outline color="danger">
                          حذف
                        </Button>
                        <Button
                          //  onClick={gotoedit}
                          color="info"
                        >
                          ویرایش
                        </Button>
                      </div>
                      <Button className="m-1" color="relief-primary">
                        اضافه کردن گروه
                      </Button>
                    </CardBody>
                  </Card>
                </div>
              </TabPane>
              <TabPane tabId="2">
                <p className="m-2">فیلمی موجود نیست</p>
              </TabPane>
              <TabPane tabId="3">
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
                      <td className="text-start">{/* {data.insertDate} */}</td>
                      <td>jmn</td>
                      <td>
                        <Button.Ripple className="round" color="success">
                          تایید شده
                        </Button.Ripple>
                      </td>
                      <td>
                        <div className="d-flex flex-row gap-1 justify-content-center">
                          <Button.Ripple color="success">
                            {/* <Check size={14} /> */}
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
                            {/* <Check size={14} /> */}
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

export default CourseAdd;
