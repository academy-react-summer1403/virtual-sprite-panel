// ** Third Party Components
import { Search } from "react-feather";
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

const UserManagement = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const gotodetail = () => {
    return navigate("/user-management-detail");
  };

  const [centeredModal, setCenteredModal] = useState(false);

  const [topUsers, setTopUsers] = useState([]);

  const getUsers = async () => {
    const result = await getTopUsers();
    setTopUsers(result.listUser);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="vertically-centered-modal">
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
              <CardHeader>
                <CardTitle tag="h4">ایجاد کاربر جدید</CardTitle>
              </CardHeader>

              <CardBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col sm="12" className="mb-1">
                      <FormGroup>
                        <Label for="name">نام</Label>
                        <Controller
                          name="name"
                          control={control}
                          rules={{ required: "Name is required" }}
                          render={({ field }) => (
                            <Input
                              {...field}
                              id="name"
                              type="text"
                              invalid={errors.name ? true : false}
                            />
                          )}
                        />
                        <FormFeedback>{errors.name?.message}</FormFeedback>
                      </FormGroup>
                    </Col>
                    {/* <Col sm="12" className="mb-1">
                      <Label className="form-label" for="nameVertical">
                        نام خانوادگی
                      </Label>
                      <Input
                        type="text"
                        name="lastname"
                        id="nameVertical"
                        placeholder="First Name"
                      />
                    </Col>
                    <Col sm="12" className="mb-1">
                      <Label className="form-label" for="EmailVertical">
                        ایمیل
                      </Label>
                      <Input
                        type="email"
                        name="Email"
                        id="EmailVertical"
                        placeholder="Email"
                      />
                    </Col>
                    <Col sm="12" className="mb-1">
                      <Label className="form-label" for="mobileVertical">
                        شماره موبایل
                      </Label>
                      <Input
                        type="number"
                        name="mobile"
                        id="mobileVertical"
                        placeholder="Mobile"
                      />
                    </Col>
                    <Col sm="12" className="mb-1">
                      <Label className="form-label" for="passwordVertical">
                        رمز عبور
                      </Label>
                      <Input
                        type="password"
                        name="password"
                        id="passwordVertical"
                        placeholder="Password"
                      />
                    </Col>
                    <Col sm="12" className="mb-1">
                      <div className="form-check">
                        <Input
                          type="checkbox"
                          id="remember-me-vertical"
                          defaultChecked={false}
                        />
                        <Label
                          className="form-check-label"
                          for="remember-me-vertical"
                        >
                          مرا به خاطر بسپار
                        </Label>
                      </div>
                    </Col> */}
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
                        <Button outline color="secondary" type="reset">
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
                    <Button color="success" outline>
                      <Search size={12} />
                    </Button>
                    <Input type="text" placeholder="Button on both sides" />
                    <Button color="success" outline>
                      Search !
                    </Button>
                  </InputGroup>
                </Col>
                <Col lg={4} className="mt-2">
                  <Button
                    color="success"
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
              <Card title="Hoverable" code={tableHover} noBody>
                <CardBody>
                  <CardText></CardText>
                </CardBody>
                <TableHover data={topUsers} />
              </Card>
            </Col>
          </Row>
          {/* <Table className="text-nowrap text-center border-bottom" responsive> */}

          {/* <thead>
              <tr>
                <th className="text-start"> کاربر </th>
                <th> نام کاربر</th>
                <th>نقش </th>
                <th>ایمیل </th>
                <th>درصد تکمیل پروفایل </th>
                <th>وضعیت </th>
                <th>جزییات </th>
              </tr>
            </thead> 
            <tbody>
              <tr>
                <td className="text-start"> m ,m</td>
                <td>0</td>
                <td>تننتتن</td>
                <td>تات</td>
                <td>اتات</td>
                <td>تننتن</td>
                <td onClick={gotodetail}>...</td>
              </tr>
            </tbody>*/}
          {/* </Table> */}
        </Col>
      </Col>
    </>
  );
};

export default UserManagement;
