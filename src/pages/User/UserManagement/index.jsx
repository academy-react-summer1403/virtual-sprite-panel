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

const UserManagement = () => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();
  const [centeredModal, setCenteredModal] = useState(false);
  const [topUsers, setTopUsers] = useState([]);
  const [topRoles, setTopRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(Infinity);
  const [currentPage, setCurrentPage] = useState(1);
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
      setCenteredModal(false);
    } catch (error) {
      toast.error("افزودن کاربر با خطا مواجه شد");

      console.error("ایجاد کاربر با حطا مواجه شد:", error);
    }
    console.log("داده ها : ", userData);
  };

  const fetchData = async () => {
    const params = {
      PageNumber: currentPage,
      RowsOfPage: rowsPerPage === Infinity ? 1000000 : rowsPerPage,
      SortingCol: "DESC",
      SortType: "InsertDate",
    };

    if (!!selectedRole) {
      params.roleId = selectedRole.value;
    }

    if (!!searchTerm) {
      params.Query = searchTerm;
    }

    try {
      const result = await getTopUsers(params);
      setTopRoles(
        result.roles.map((role) => ({
          value: role.id,
          label: role.roleName,
        }))
      );
      setTopUsers(result.listUser);
      setFilteredUsers(
        rowsPerPage === Infinity
          ? result.listUser
          : result.listUser.slice(0, rowsPerPage)
      );

      console.log("لیست کاربران:", result.listUser);
      console.log("لیست نقش‌ها:", result.roles);
      console.log("تعداد کاربران:", result.totalCount);
    } catch (error) {
      console.error("خطا در دریافت اطلاعات:", error);
    }
  };
  const handlePerPage = (event) => {
    const selectedValue =
      event.target.value === "all"
        ? Infinity
        : parseInt(event.target.value, 10);
    setRowsPerPage(selectedValue);
    setCurrentPage(1);
    fetchData();
    console.log("تعداد نمایش در هر صفحه:", selectedValue);
  };

  const handleRoleChange = (selectedOption) => {
    console.log("selectedOption", selectedOption);
    setSelectedRole(selectedOption);

    if (selectedOption) {
      const filtered = topUsers.filter((user) => {
        return user.userRoles && user.userRoles.includes(selectedOption);
      });
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(topUsers);
    }
  };

  const handleSearch = () => {
    console.log("لیست کاربران:", topUsers);
    console.log("عبارت جستجو:", searchTerm);

    if (!topUsers || topUsers.length === 0) {
      console.log("لیست کاربران خالی است.");
      return;
    }

    if (searchTerm.trim()) {
      const filtered = topUsers.filter(
        (user) =>
          user.fname &&
          user.fname.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log("کاربران فیلتر شده:", filtered);
      setFilteredUsers(filtered);
    } else {
      console.log("نمایش تمام کاربران");
      setFilteredUsers(topUsers);
    }
  };
  const handleNavigate = () => {
    navigate("/prof");
  };
  // topUsers.forEach((user) => console.log(user.fname));getTopUsers
  useEffect(() => {
    fetchData();
  }, [selectedRole, searchTerm, rowsPerPage, currentPage]);

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
              theme={(theme) => ({
                ...theme,
                borderRadius: 6,
                colors: {
                  ...theme.colors,
                  primary25: "#f3f4f6",
                  primary: "#7367f0",
                },
              })}
              isClearable={true}
              id="role"
              className="react-select"
              classNamePrefix="select"
              options={topRoles}
              placeholder="نقش مورد نظر را انتخاب کنید"
              onChange={handleRoleChange}
            />
          </Col>
          {/* <Col md="4" className="mb-1">
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
          </Col> */}
        </Row>
        <Col className="mt-1">
          <Row lg={4} className="justify-content-between">
            <Col lg={2} className="mb-1">
              <Label className="form-label" for="level">
                نمایش
              </Label>
              <Input
                className="dataTable-select"
                type="select"
                id="level"
                value={rowsPerPage === Infinity ? "all" : rowsPerPage} // مقدار پیش‌فرض
                onChange={handlePerPage} // تابع مدیریت تغییر
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value="all">همه</option> {/* گزینه "همه" */}
              </Input>
            </Col>
            <Col lg={7}>
              <Row>
                <Col className="mt-2" lg={8}>
                  <InputGroup>
                    <Button color="primary" outline onClick={handleSearch}>
                      <Search size={12} />
                    </Button>
                    <Input
                      type="text"
                      placeholder="نام مورد جستجو"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <Button color="primary" outline onClick={handleSearch}>
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
                <TableHover data={filteredUsers} />
              </Card>
            </Col>
          </Row>
        </Col>
      </Col>
    </>
  );
};

export default UserManagement;
