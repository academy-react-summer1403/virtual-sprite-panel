import { Fragment, useEffect, useState } from "react";
// ** Third Party Components
import classnames from "classnames";
import { Check } from "react-feather";
import noPhoto from "../../../assets/images/course/noPhoto.jpg";
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
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const [reserve, setReserve] = useState([]);
  const [comment, setComment] = useState([]);
  const [group, setGroup] = useState([]);
  const [student, setStudent] = useState([]);
  const [active, setActive] = useState("1");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const userId = localStorage.getItem("id");

  const navigate = useNavigate();

  const { id } = useParams();
  // console.log(id);
  const getDetails = async () => {
    if (token) {
      try {
        const result = await getCoursesDetail(id);
        console.log("course detail", result);
        setData(result);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    } else {
      console.log("توکن وجود ندارد");
    }
  };
  useEffect(() => {
    getDetails();
  }, [id]);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const toggle = (tab) => {
    setActive(tab);
  };

  const handleEditClick = (courseId) => {
    if (!courseId) {
      console.error("آی دی پیدا نشد");
      return;
    }
    console.log(`آی دی: ${courseId}`);
    navigate(`/course-edit/${courseId}`);
  };
  const getreserve = async () => {
    const courseId = data.courseId;
    if (token) {
      try {
        const result = await CourseReserveApi(courseId);
        console.log("course reserve", result);
        if (result) {
          setReserve(result);
        }
      } catch (error) {
        console.error("Error fetching course reserve:", error);
      }
    } else {
      console.log("توکن وجود ندارد");
    }
  };

  useEffect(() => {
    if (data?.courseId) {
      getreserve(data.courseId);
    }
  }, [data]);

  const getGroupApi = async () => {
    if (data?.teacherId && data?.courseId) {
      try {
        const result = await CourseGroup(data.teacherId, data.courseId);
        console.log("course group", result);
        if (result) {
          setGroup(result[0]);
        }
      } catch (error) {
        console.error("Error fetching course group:", error);
      }
    }
  };

  useEffect(() => {
    getGroupApi();
  }, [data.teacherId, data.courseId]);

  const changereserveapi = async () => {
    if (token) {
      try {
        const obj = {
          courseId: group?.courseId,
          courseGroupId: group?.groupId,
          studentId: reserve[0]?.studentId,
        };
        console.log("obj", obj);
        const result = await ChangeCourseReserve(obj);
        // console.log("change", result);
      } catch (error) {
        console.error("Error fetching course change:", error);
      }
    } else {
      // return <Notification>لطفا لاگین کنید</Notification>;
    }
  };
  const getstudent = async () => {
    if (token) {
      try {
        const result = await Studentapi(id);
        console.log("course student", result);
        setStudent(result);
      } catch (error) {
        console.error("Error fetching course student:", error);
      }
    } else {
      console.log("توکن وجود ندارد");
    }
  };
  useEffect(() => {
    getstudent();
  }, [id]);
  const getcomment = async () => {
    // const teacherId = data.teacherId;

    if (token) {
      try {
        if (data?.teacherId) {
          const result = await getCommentCourses(data?.teacherId, userId);
          setComment(result.comments);
          console.log("result comment", result);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    } else {
      console.log("توکن وجود ندارد");
    }
  };

  useEffect(() => {
    getcomment();
  }, [data.teacherId, userId]);

  /********* merge changes */

  // const [data, setData] = useState([]);
  // const token = localStorage.getItem("token");

  // const [active, setActive] = useState("1");
  // const [dropdownOpen, setDropdownOpen] = useState(false);

  // const navigate = useNavigate();

  // const { id } = useParams();
  // console.log(id);
  // const getDetails = async () => {
  //   if (token) {
  //     const result = await getCoursesDetail(id);
  //     console.log("course detail", result);
  //     setData(result);
  //   } else {
  //     console.log("توکن وجود ندارد");
  //   }
  // };
  // useEffect(() => {
  //   getDetails();
  // }, [id]);

  // const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // const toggle = (tab) => {
  //   setActive(tab);
  // };

  // const handleEditClick = (courseId) => {
  //   if (!courseId) {
  //     console.error("آی دی پیدا نشد");
  //     return;
  //   }
  //   console.log(`آی دی: ${courseId}`);
  //   navigate(`/course-edit/${courseId}`);
  // };

  // const getreserve = async () => {
  //   const courseId = data.courseId;
  //   if (token) {
  //     try {
  //       const result = await CourseReserveApi(courseId);
  //       console.log("course reserve", result);
  //       if (result) {
  //         setReserve(result);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching course reserve:", error);
  //     }
  //   } else {
  //     console.log("توکن وجود ندارد");
  //   }
  // };

  // useEffect(() => {
  //   if (data?.courseId) {
  //     getreserve(data.courseId);
  //   }
  // }, [data]);

  // const getGroupApi = async () => {
  //   if (data?.teacherId && data?.courseId) {
  //     try {
  //       const result = await CourseGroup(data.teacherId, data.courseId);
  //       console.log("course group", result);
  //       if (result) {
  //         setGroup(result[0]);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching course group:", error);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   getGroupApi();
  // }, [data.teacherId, data.courseId]);

  // const changereserveapi = async () => {
  //   if (token) {
  //     try {
  //       const obj = {
  //         courseId: group?.courseId,
  //         courseGroupId: group?.groupId,
  //         studentId: reserve[0]?.studentId,
  //       };
  //       console.log("obj", obj);
  //       const result = await ChangeCourseReserve(obj);
  //       // console.log("change", result);
  //     } catch (error) {
  //       console.error("Error fetching course change:", error);
  //     }
  //   } else {
  //     // return <Notification>لطفا لاگین کنید</Notification>;
  //   }
  // };
  // const getstudent = async () => {
  //   if (token) {
  //     try {
  //       const result = await Studentapi(id);
  //       console.log("course student", result);
  //       setStudent(result);
  //     } catch (error) {
  //       console.error("Error fetching course student:", error);
  //     }
  //   } else {
  //     console.log("توکن وجود ندارد");
  //   }
  // };
  // useEffect(() => {
  //   getstudent();
  // }, [id]);
  // const getcomment = async () => {
  //   // const teacherId = data.teacherId;

  //   if (token) {
  //     try {
  //       if (data?.teacherId) {
  //         const result = await getCommentCourses(data?.teacherId, userId);
  //         setComment(result.comments);
  //         console.log("result comment", result);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching comments:", error);
  //     }
  //   } else {
  //     console.log("توکن وجود ندارد");
  //   }
  // };

  // useEffect(() => {
  //   getcomment();
  // }, [data.teacherId, userId]);
  return (
    <>
      <Row className="regYekan">
        <Col lg="4">
          <Card>
            <CardImg
              src={
                data.imageAddress &&
                data.imageAddress.includes("https://classapi.sepehracademy.ir")
                  ? data.imageAddress
                  : noPhoto
              }
            />
            <CardBody>
              <CardTitle tag="h5" className="border-bottom boldYekan">
                جزییات دوره
              </CardTitle>
              <CardColumns>
                <CardText className="d-flex flex-row gap-1">
                  <h4 className="mt-2 text-align-fix boldYekan">نام دوره:</h4>{" "}
                  <h5 className="mt-2 text-align-fix">{data.title}</h5>
                </CardText>
                <CardText className="d-flex flex-row gap-2 ">
                  <h4 className="mt-2  text-align-fix boldYekan">نام استاد:</h4>{" "}
                  <h5 className="mt-2  text-align-fix">{data.teacherName}</h5>
                </CardText>
                <CardText className="d-flex flex-row gap-2">
                  <h4 className="mt-2  text-align-fix boldYekan">نام کلاس:</h4>{" "}
                  <h5 className="mt-2  text-align-fix">
                    {data.courseClassRoomName}
                  </h5>
                </CardText>
                <CardText className="d-flex flex-row gap-2">
                  <h4 className="mt-2 text-align-fix boldYekan ">وضعیت:</h4>{" "}
                  <h5 className="mt-2  text-align-fix">
                    {data.courseLevelName}
                  </h5>
                </CardText>
                <CardText className="d-flex flex-row gap-2">
                  <h4 className="mt-2 text-align-fix boldYekan ">
                    نحوه برگزاری:
                  </h4>{" "}
                  <h5 className="mt-2  text-align-fix">
                    {data.courseTypeName}
                  </h5>
                </CardText>
              </CardColumns>
              <div className="demo-inline-spacing">
                <Button
                  onClick={() => handleEditClick(data.courseId)}
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
                      {data.courseLikeTotal}
                    </CardHeader>
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
                    {reserve.map((item, index) => (
                      <tr key={index}>
                        <td className="text-start">{item.studentName}</td>
                        <td>{item.reserverDate}</td>
                        <td>
                          <Button.Ripple
                            className="round"
                            color={item.accept == true ? "success" : "danger"}
                          >
                            {item.accept ? "پذیرفته شده" : "منتظر تایید"}
                          </Button.Ripple>

                        </td>
                        <td>
                          <div className="d-flex flex-row gap-1 justify-content-center">
                            <Button.Ripple
                              color="success"
                              onClick={changereserveapi}
                            >
                              تایید
                            </Button.Ripple>
                            {/* <Button.Ripple className="" color="danger">
            *
          </Button.Ripple> */}
                          </div>

                        </td>
                      </tr>
                    ))}
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
                      <td className="text-start"> </td>
                      <td></td>
                      <td>
                        {/* <Button.Ripple className="round" color="danger">
                          پرداخت نشده
                        </Button.Ripple> */}
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

                  {comment?.map((item, index) => (
                    <tbody>
                      <tr key={index}>
                        <td className="text-start">{item.userFullName} </td>
                        <td>{item.commentTitle}</td>
                        <td>{item.describe}</td>
                        {/* <td>
                          <Button.Ripple className="round">
                            {item.isApproved ? "تایید شده" : "تایید نشده"}
                          </Button.Ripple>
                        </td> */}
                      </tr>
                    </tbody>
                  ))}
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
