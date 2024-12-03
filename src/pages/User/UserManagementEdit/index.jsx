import { Fragment, useEffect, useState } from "react";
import classnames from "classnames";
import { Check, Twitter } from "react-feather";
import noUserPhoto from "../../../assets/images/portrait/small/no-user-photo.png";
import linkdin from "../../../assets/images/detail/linkdin.png";
import twiter from "../../../assets/images/detail/twiter.webp";
import activeCourse from "../../../assets/images/course/active-course.png";
import reservedCourse from "../../../assets/images/course/reserved-course.png";
// import ModalBasic from "./Modal.jsx";

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
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  Label,
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
import { UpdateUser } from "../../../core/services/api/User/UpdateUser.api.js";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const UserManagementEdit = () => {
  const [active, setActive] = useState("1");
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [centeredModal, setCenteredModal] = useState(false);
  const { id } = useParams();
  

  // console.log(id);
  const {
    register,
    handleSubmit: handleFormSubmit,
    getValues,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      gmail: "",
      gender: null,
      nationalCode: "",    },
  });

  const onSubmit = async (data) => {
    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      gmail: data.gmail,
      password: data.password,
      phoneNumber: data.phoneNumber,
      isStudent: !!data.isStudent,
      isTeacher: !!data.isTeacher,
      gender: !!data.gender,
      nationalCode: !!data.nationalCode,
    };

    try {
      // const response = await createUser(userData);
      console.log("ویرایش:");
      // toast.success("کاربر با موفقیت اضافه شد");
      setCenteredModal(false);
    } catch (error) {
      toast.error("افزودن کاربر با خطا مواجه شد");

      console.error("ایجاد کاربر با حطا مواجه شد:", error);
    }
    console.log("داده ها : ", userData);
  };

  const getUserDetails = async () => {
    if (token) {
      const result = await getUserDetailWithId(id);
      console.log("user اطلاعات", result);
      setData(result);
    } else {
      console.log("توکن وجود ندارد");
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setCenteredModal(true);
  };
   const handleSubmit = async () => {
    const obj = {
      active: false,
      id: "30258",
      firstName: getValues("firstName"),
      lastName: getValues("lastName"),
      gmail: getValues("gmail"),
      gender: getValues("gender"),
      nationalCode: getValues("nationalCode"),
    };
    try {
      console.log("داده‌های ارسالی:", obj);
      const result1 = await UpdateUser(obj);
      console.log("نتیجه ویرایش:", result1);
      setCenteredModal(false); // بستن مودال
    } catch (error) {
      console.error("خطا در ویرایش اطلاعات", error);
    }
  };
  
  
  useEffect(() => {
    if (selectedUser) {
      setValue("firstName", selectedUser?.fName || "");
      setValue("lastName", selectedUser?.lName || "");
      setValue("gmail", selectedUser?.gmail || "");
      setValue("phoneNumber", selectedUser?.phoneNumber || "");
      setValue("password", selectedUser?.password || "");
      setValue("isStudent", selectedUser?.isStudent || false);
      setValue("isTeacher", selectedUser?.isTeacher || false);
      setValue(
        "gender",
        selectedUser?.gender !== undefined ? selectedUser.gender : null
      );
      setValue("nationalCode", selectedUser?.nationalCode || "");
    }
  }, [selectedUser, setValue]);
  useEffect(() => {
    getUserDetails();
  }, [id]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [active]);

  return (
    <>
      <div>
        <Modal
          isOpen={centeredModal}
          toggle={() => setCenteredModal(!centeredModal)}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>
            اطلاعات کاربر
          </ModalHeader>
          <ModalBody>
            <Card>
              {/* <CardHeader>
                <CardTitle tag="h4">ایجاد کاربر جدید</CardTitle>
              </CardHeader> */}
              <CardBody>
              <Form onSubmit={handleFormSubmit(handleSubmit)}>                  <Row>
                    <FormGroup>
                      <Col sm="12">
                        <Label for="firstName">نام</Label>
                        <Controller
                          name="firstName"
                          control={control}
                          rules={{ required: "نام ضروری است" }}
                          render={({ field }) => (
                            <Input
                              {...field}
                              id="firstName"
                              type="text"
                              placeholder="علی"
                              invalid={errors.firstName ? true : false}
                            />
                          )}
                        />
                        <FormFeedback>{errors.firstName?.message}</FormFeedback>
                        <Label for="lastName" className="mt-2">
                          نام خانوادگی
                        </Label>
                        <Controller
                          name="lastName"
                          control={control}
                          rules={{ required: "نام خانوادگی ضروری است" }}
                          render={({ field }) => (
                            <Input
                              {...field}
                              id="lastName"
                              placeholder="علوی"
                              type="text"
                              invalid={errors.lastName ? true : false}
                            />
                          )}
                        />
                        <FormFeedback>{errors.lastName?.message}</FormFeedback>
                        <Label for="gmail" className="mt-2">
                          پست الکترونیکی
                        </Label>
                        <Controller
                          name="gmail"
                          control={control}
                          rules={{
                            required: "پست الکترونیکی ضروری است",
                          }}
                          render={({ field }) => (
                            <Input
                              {...field}
                              id="gmail"
                              placeholder="virtualsprite@gmail.com"
                              type="text"
                              invalid={errors.gmail ? true : false}
                            />
                          )}
                        />
                        <FormFeedback>{errors.gmail?.message}</FormFeedback>
                        <Label for="gender" className="mt-2">
                          جنسیت
                        </Label>
                        <Controller
                          name="gender"
                          control={control}
                          rules={{
                            validate: (value) =>
                              value !== undefined && value !== null
                                ? true
                                : "وارد کردن جنسیت ضروری است",
                          }}
                          render={({ field }) => (
                            <div>
                              <div className="form-check">
                                <input
                                  type="radio"
                                  id="gender-male"
                                  value="true"
                                  checked={field.value === true}
                                  onChange={() => {
                                    console.log("Selected value:", true); // نمایش مقدار انتخابی
                                    field.onChange(true);
                                  }}
                                  className="form-check-input"
                                />
                                <label
                                  htmlFor="gender-male"
                                  className="form-check-label"
                                >
                                  مرد
                                </label>
                              </div>
                              <div className="form-check">
                                <input
                                  type="radio"
                                  id="gender-female"
                                  value="false"
                                  checked={field.value === false}
                                  onChange={() => {
                                    console.log("Selected value:", false); // نمایش مقدار انتخابی
                                    field.onChange(false);
                                  }}
                                  className="form-check-input"
                                />
                                <label
                                  htmlFor="gender-female"
                                  className="form-check-label"
                                >
                                  زن
                                </label>
                              </div>
                              {errors.gender && (
                                <span className="text-danger">
                                  {errors.gender.message}
                                </span>
                              )}
                            </div>
                          )}
                        />

                        <FormFeedback>{errors.gender?.message}</FormFeedback>

                        <Label for="nationalCode" className="mt-2">
                          کد ملی
                        </Label>
                        <Controller
                          name="nationalCode"
                          control={control}
                          rules={{
                            required: "  کد ملی عبور ضروری است",
                          }}
                          render={({ field }) => (
                            <Input
                              {...field}
                              id="nationalCode"
                              placeholder="123456"
                              type="text"
                              invalid={errors.nationalCode ? true : false}
                            />
                          )}
                        />
                        <FormFeedback>
                          {errors.nationalCode?.message}
                        </FormFeedback>
                      </Col>
                    </FormGroup>
                  </Row>
                  <Row>
                    <Col sm="12">
                      <div className="d-flex">
                        <Button
                          className="me-1"
                          color="primary"
                          type="submit"
                          onClick={handleSubmit}
                        >
                          اعمال ویرایش
                        </Button>
                        <Button
                          outline
                          color="secondary"
                          type="reset"
                          onClick={() => setCenteredModal(false)}
                        >
                          انصراف
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </ModalBody>
        </Modal>
      </div>
      <Row>
        <Col lg="4">
          <Card>
            <CardBody>
              <CardTitle tag="h4" className="border-bottom boldYekan">
                جزییات کاربر
              </CardTitle>
              <CardColumns>
                <CardText className="d-flex flex-row align-items-center">
                  <Row>
                    <Col>
                      <img
                        src={
                          data?.currentPictureAddress &&
                          data.currentPictureAddress.includes(
                            "https://classapi.sepehracademy.ir/\\Pictures\\ProfileImageThumbnail"
                          )
                            ? data.currentPictureAddress
                            : noUserPhoto
                        }
                        alt="عکس کاربر"
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                        }}
                      />
                    </Col>
                    <Col>
                      <Row>
                        <Col>{data.fName}</Col>
                      </Row>
                      <Row>
                        <Col>{data.lName}</Col>
                      </Row>
                      <Row>
                        <Col className="d-flex flex-row regYekan">
                          <span></span>
                          <span className="text-align-fix">دوره ها :</span>
                          <span className="text-align-fix">
                            {data && data.courses ? data.courses.length : 0}
                          </span>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="d-flex flex-row regYekan">
                          <span></span>
                          <span className="text-align-fix">رزرو شده:</span>
                          <span className="text-align-fix">
                            {data && data.courses
                              ? data.coursesReseves.length
                              : 0}
                          </span>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CardText>
                <CardText className="d-flex flex-row gap-2 align-items-center">
                  <h5 className="text-align-fix boldYekan mb-0"> نقش ها:</h5>
                  <Col className="text-align-fix mb-0">
                    {data.roles && data.roles.length > 0
                      ? data.roles.map((role) => role.roleName).join(" ☻ ")
                      : "نقشی برای این کاربر تعریف نشده است"}
                  </Col>
                </CardText>

                <CardText className="d-flex flex-row gap-1 align-items-center">
                  <h5 className="boldYekan text-align-fix">نام کاربری:</h5>
                  <h5 className="regYekan text-align-fix">{data.userName}</h5>
                </CardText>
                <CardText className="d-flex flex-row gap-1 align-items-center">
                  <h5 className="boldYekan text-align-fix">ایمیل:</h5>
                  <h5 className="regYekan text-align-fix">{data.gmail}</h5>
                </CardText>
                <CardText className="d-flex flex-row gap-1 align-items-center">
                  <h5 className="boldYekan text-align-fix">وضعیت:</h5>
                  <h5
                    className={`regYekan text-align-fix ${
                      data?.active ? "status-active" : "status-inactive"
                    }`}
                  >
                    {data?.active && data.active ? "فعال" : "غیرفعال"}
                  </h5>
                </CardText>
                <CardText className="d-flex flex-row gap-1 align-items-center">
                  <h5 className="boldYekan text-align-fix">جنسیت:</h5>
                  <h5 className="regYekan text-align-fix">
                    {data?.gender && data.gender ? "مرد" : "زن"}
                  </h5>
                </CardText>
                <CardText className="d-flex flex-row gap-1 align-items-center">
                  <h5 className="boldYekan text-align-fix">کد ملی:</h5>
                  <h5 className="regYekan text-align-fix">
                    {data.nationalCode}
                  </h5>
                </CardText>
                <CardText className="d-flex flex-row gap-1 align-items-center">
                  <h5 className="boldYekan text-align-fix">
                    درصد تکمیل پروفایل:
                  </h5>
                  <h5 className="regYekan text-align-fix">
                    {data.profileCompletionPercentage}%
                  </h5>
                </CardText>
              </CardColumns>
              <div className="demo-inline-spacing">
                <Button
                  // onClick={() => handleEditClick(data.courseId)}
                  color="relief-primary"
                  // onClick={() => setCenteredModal(!centeredModal)}
                  onClick={() => handleEditUser(data)}
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
