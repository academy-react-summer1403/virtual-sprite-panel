import { Search } from "react-feather";
import { createUser } from "../../../core/services/api/User/CreateUser.api";

// ** Reactstrap Imports
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { getTopUsers } from "../../../core/services/api/User/userTop.api";
import TableHover from "../UserTables/TableHover";
import { tableHover } from "../UserTables/TableSourceCode";

import "@styles/react/libs/react-select/_react-select.scss";
import { selectThemeColors } from "@utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

import admin from "@src/assets/images/portrait/small/admin.png";
import employee from "@src/assets/images/portrait/small/employee.png";
import mentor from "@src/assets/images/portrait/small/mentor.png";
import referee from "@src/assets/images/portrait/small/referee.png";
import student from "@src/assets/images/portrait/small/student.png";
import support from "@src/assets/images/portrait/small/support.png";
import teacher from "@src/assets/images/portrait/small/teacher.png";
import tourAdmin from "@src/assets/images/portrait/small/tourAdmin.png";
import writer from "@src/assets/images/portrait/small/writer.png";

const UserManagement = () => {
  const navigate = useNavigate();
  const [centeredModal, setCenteredModal] = useState(false);
  const [topUsers, setTopUsers] = useState([]);
  // const avatarGroupData = [
  //   {
  //     title: "ادمین",
  //     img: admin,
  //     imgHeight: 26,
  //     imgWidth: 26,
  //   },
  //   {
  //     title: "کارمند",
  //     img: employee,
  //     imgHeight: 26,
  //     imgWidth: 26,
  //   },
  //   {
  //     title: "منتور",
  //     img: mentor,
  //     imgHeight: 26,
  //     imgWidth: 26,
  //   },
  //   {
  //     title: "معرف",
  //     img: referee,
  //     imgHeight: 26,
  //     imgWidth: 26,
  //   },
  //   {
  //     title: "دانشجو",
  //     img: student,
  //     imgHeight: 26,
  //     imgWidth: 26,
  //   },
  //   {
  //     title: "پشتیبان",
  //     img: support,
  //     imgHeight: 26,
  //     imgWidth: 26,
  //   },
  //   {
  //     title: "استاد",
  //     img: teacher,
  //     imgHeight: 26,
  //     imgWidth: 26,
  //   },
  //   {
  //     title: "ادمین تور",
  //     img: tourAdmin,
  //     imgHeight: 26,
  //     imgWidth: 26,
  //   },
  //   {
  //     title: "نویسنده",
  //     img: writer,
  //     imgHeight: 26,
  //     imgWidth: 26,
  //   },
  // ];
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      gmail: data.gmail,
      password: data.password,
      phoneNumber: data.phoneNumber,
      isStudent: !!data.isStudent,
      isTeacher: !!data.isTeacher,
    };

    try {
      const response = await createUser(userData);
      console.log("کاربر جدید با موفقیت اضافه شد:", response);
      toast.success("کاربر با موفقیت اضافه شد");
      setCenteredModal(false); // بستن مودال
    } catch (error) {
      toast.error("افزودن کاربر با خطا مواجه شد");

      console.error("ایجاد کاربر با حطا مواجه شد:", error);
    }
    console.log("داده ها : ", userData);
  };

  const gotodetail = () => {
    return navigate("/user-management-detail");
  };

  const getUsers = async () => {
    const result = await getTopUsers();
    setTopUsers(result.listUser);
    console.log("پاسخ topUsers: ", topUsers);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div>
        <Modal
          isOpen={centeredModal}
          toggle={() => setCenteredModal(!centeredModal)}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>
            لطفا اطلاعات کاربر را وارد نمایید
          </ModalHeader>
          <ModalBody>
            <Card>
              {/* <CardHeader>
                <CardTitle tag="h4">ایجاد کاربر جدید</CardTitle>
              </CardHeader> */}
              <CardBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
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
                          {" "}
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
                        <Label for="phoneNumber" className="mt-2">
                          شماره موبایل
                        </Label>
                        <Controller
                          name="phoneNumber"
                          control={control}
                          rules={{
                            required: "شماره موبایل ضروری است",
                          }}
                          render={({ field }) => (
                            <Input
                              {...field}
                              id="phoneNumber"
                              placeholder="09111111111"
                              type="text"
                              invalid={errors.phoneNumber ? true : false}
                            />
                          )}
                        />
                        <FormFeedback>
                          {errors.phoneNumber?.message}
                        </FormFeedback>
                        <Label for="password" className="mt-2">
                          رمز عبور
                        </Label>
                        <Controller
                          name="password"
                          control={control}
                          rules={{
                            required: "  رمز عبور ضروری است",
                          }}
                          render={({ field }) => (
                            <Input
                              {...field}
                              id="password"
                              placeholder="******"
                              type="password"
                              invalid={errors.password ? true : false}
                            />
                          )}
                        />
                        <FormFeedback>{errors.password?.message}</FormFeedback>
                      </Col>
                      <Row className="mt-2">
                        <Col>
                          <Label for="isStudent" className="mx-1">
                            دانشجو
                          </Label>
                          <Controller
                            name="isStudent"
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                id="isStudent"
                                type="checkbox"
                                invalid={errors.isStudent ? true : false}
                              />
                            )}
                          />
                          <Label for="isTeacher" className="mx-1">
                            استاد
                          </Label>
                          <Controller
                            name="isTeacher"
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                id="isTeacher"
                                type="checkbox"
                                invalid={errors.isTeacher ? true : false}
                              />
                            )}
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                  </Row>
                  {/* <Row>
                    <Col sm="12">
                      <FormGroup >
                        <Label for="lastName">نام خانوادگی</Label>
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
                      </FormGroup>
                    </Col>
                  </Row> */}
                  {/* <Row>
                    <Col sm="12">
                      <FormGroup>
                        <Label for="email"> پست الکترونیکی</Label>
                        <Controller
                          name="email"
                          control={control}
                          rules={{
                            required: "پست الکترونیکی ضروری است",
                          }}
                          render={({ field }) => (
                            <Input
                              {...field}
                              id="email"
                              placeholder="virtualsprite@gmail.com"
                              type="text"
                              invalid={errors.email ? true : false}
                            />
                          )}
                        />
                        <FormFeedback>{errors.email?.message}</FormFeedback>
                      </FormGroup>
                    </Col>
                  </Row> */}

                  {/* <Row>
                    <Col sm="12" className="mb-1">
                      <FormGroup>
                        <Label for="mobile"> شماره موبایل </Label>
                        <Controller
                          name="mobile"
                          control={control}
                          rules={{
                            required: "شماره موبایل ضروری است",
                          }}
                          render={({ field }) => (
                            <Input
                              {...field}
                              id="mobile"
                              placeholder="09111111111"
                              type="text"
                              invalid={errors.mobile ? true : false}
                            />
                          )}
                        />
                        <FormFeedback>{errors.mobile?.message}</FormFeedback>
                      </FormGroup>
                    </Col>
                  </Row> */}

                  {/* <Row>
                    <Col sm="12" className="mb-1">
                      <FormGroup>
                        <Label for="pass">رمز عبور</Label>
                        <Controller
                          name="pass"
                          control={control}
                          rules={{
                            required: "  رمز عبور ضروری است",
                          }}
                          render={({ field }) => (
                            <Input
                              {...field}
                              id="pass"
                              placeholder="******"
                              type="password"
                              invalid={errors.pass ? true : false}
                            />
                          )}
                        />
                        <FormFeedback>{errors.pass?.message}</FormFeedback>
                      </FormGroup>
                    </Col>
                  </Row> */}
                  {/* <Row>
                    <Col sm="4">
                      <Label> تعیین نقش</Label>{" "}
                      <FormGroup  className="d-flex">
                        <Label for="roleStudent"  className="mx-1"> دانشجو</Label>
                        <Controller
                          name="roleStudent"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              id="roleStudent"
                              type="checkbox"
                              invalid={errors.roleStudent ? true : false}
                            />
                          )}
                        />
                        <Label for="roleTeacher" className="mx-1"> استاد</Label>
                        <Controller
                          name="roleTeacher"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              id="roleTeacher"
                              type="checkbox"
                              invalid={errors.roleTeacher ? true : false}
                            />
                          )}
                        />
                      </FormGroup>
                    </Col>
                  </Row> */}
                  <Row>
                    <Col sm="12">
                      <div className="d-flex">
                        <Button
                          className="me-1"
                          color="primary"
                          type="submit"
                          // onClick={(e) => e.preventDefault()}
                        >
                          ثبت
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
      <Col>
        <Row lg={3}>
          <Col md="4" className="mb-1">
            <Label className="form-label" for="level">
              نقش
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
          <Col md="4" className="mb-1">
            <Label className="form-label" for="level">
              مرتب سازی
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
        <Col className="mt-1">
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
                    <Input type="text" placeholder="عبارت مورد جستجو" />
                    <Button color="primary" outline>
                      جستجو
                    </Button>
                  </InputGroup>
                </Col>
                <Col lg={4} className="mt-2">
                  <Button
                    color="primary"
                    onClick={() => setCenteredModal(!centeredModal)}
                  >
                    اضافه کردن کاربر جدید
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card code={tableHover} noBody>
                <CardBody>
                  <CardText></CardText>
                </CardBody>
                <TableHover data={topUsers} />
              </Card>
            </Col>
          </Row>
        </Col>
      </Col>
    </>
  );
};

export default UserManagement;
