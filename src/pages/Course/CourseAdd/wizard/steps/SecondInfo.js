// ** React Imports
import { Fragment, useEffect, useState } from "react";
import { getCourses } from "../../../../../core/services/api/courses/createCourseStep1";

// ** Third Party Components
import { Formik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ArrowLeft, ArrowRight } from "react-feather";
import Select from "react-select";

// import EditorControlled from "../../../../../../src/views/apps/forms/form-elemenst/editor/EditorControlled";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import { Button, Col, Form, Input, Label, Row } from "reactstrap";

// ** Styles
import "@styles/react/libs/editor/editor.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import EditorControlled from "../../EditorControlled";

const SecondInfo = ({ stepper, type, formData, setFormData }) => {
  const [classOptions, setClassOptions] = useState([]);
  const [teacherOptions, setTeacherOptions] = useState([]);
  const [termOptions, setTermOptions] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState(null);

  const handleFormChange = (values) => {
    setFormData((prev) => ({ ...prev, secondInfo: values }));
    // console.log("values", values);
  };
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchCourseData = async () => {
      try {
        const result = await getCourses(signal);

        // نام کلاس
        const classOptions = result.classRoomDtos.map((item) => ({
          value: item.id,
          label: item.classRoomName,
        }));
        setClassOptions(classOptions);
        // نام استاد
        const teacherOptions = result.teachers.map((item) => ({
          value: item.teacherId,
          label: item.fullName,
        }));
        setTeacherOptions(teacherOptions);
        // ترم
        const termOptions = result.termDtos.map((item) => ({
          value: item.id,
          label: item.termName,
        }));
        setTermOptions(termOptions);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError("خطا در دریافت داده‌ها");
          console.error("خطا در دریافت داده‌ها:", error);
        }
      }
    };

    fetchCourseData();

    return () => controller.abort();
  }, []);

  return (
    <Fragment>
      <Formik
        initialValues={formData.secondInfo}
        onSubmit={(values) => handleFormChange(values)}
      >
        {({ handleSubmit, values, handleChange, setFieldValue }) => (
          <Form onSubmit={(e) => e.preventDefault()}>
            <Row>
              <Col md="6" className="mb-1">
                <Label className="form-label" for="ClassId">
                  نام کلاس
                </Label>
                <Select
                  theme={selectThemeColors}
                  className="react-select w-100"
                  classNamePrefix="select"
                  placeholder="انتخاب کلاس... "
                  value={
                    classOptions.find(
                      (option) => option.value === values.ClassId
                    ) || null
                  }
                  options={classOptions}
                  isClearable={false}
                  styles={{
                    container: (base) => ({
                      ...base,
                      width: "100%",
                    }),
                    control: (base) => ({
                      ...base,
                      minWidth: "200px",
                      maxWidth: "100%",
                    }),
                  }}
                  onChange={(selectedOption) => {
                    handleChange({
                      target: {
                        name: "ClassId",
                        value: selectedOption?.value || "",
                      },
                    });
                  }}
                />
              </Col>
              <Col md="6" className="mb-1">
                <Label className="form-label" for="SessionNumber">
                  تعداد جلسات
                </Label>
                <Input
                  type="text"
                  name="SessionNumber"
                  id="SessionNumber+++++++"
                  placeholder="تعداد جلسات"
                  value={values.SessionNumber || ""}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md="6" className="mb-1">
                <Label className="form-label" for="TeacherId">
                  نام استاد
                </Label>
                <Select
                  theme={selectThemeColors}
                  className="react-select w-100"
                  classNamePrefix="select"
                  placeholder="انتخاب استاد ... "
                  value={
                    teacherOptions.find(
                      (option) => option.value === values.TeacherId
                    ) || null
                  }
                  options={teacherOptions}
                  isClearable={false}
                  styles={{
                    container: (base) => ({
                      ...base,
                      width: "100%",
                    }),
                    control: (base) => ({
                      ...base,
                      minWidth: "200px",
                      maxWidth: "100%",
                    }),
                  }}
                  onChange={(selectedOption) => {
                    handleChange({
                      target: {
                        name: "TeacherId",
                        value: selectedOption?.value || "",
                      },
                    });
                  }}
                />
              </Col>
              <Col md="6" className="mb-1">
                <Label className="form-label" for="TermId">
                  ترم دوره
                </Label>
                <Select
                  theme={selectThemeColors}
                  className="react-select w-100"
                  classNamePrefix="select"
                  placeholder="انتخاب  ترم  ... "
                  value={
                    termOptions.find(
                      (option) => option.value === values.TermId
                    ) || null
                  }
                  options={termOptions}
                  isClearable={false}
                  styles={{
                    container: (base) => ({
                      ...base,
                      width: "100%",
                    }),
                    control: (base) => ({
                      ...base,
                      minWidth: "200px",
                      maxWidth: "100%",
                    }),
                  }}
                  onChange={(selectedOption) => {
                    handleChange({
                      target: {
                        name: "TermId",
                        value: selectedOption?.value || "",
                      },
                    });
                  }}
                />
              </Col>
            </Row>

            <Row>
              <Col md="6" className="mb-1">
                <Label className="form-label" for="StartTime">
                  تاریخ شروع
                </Label>
                <DatePicker
                  id="StartTime"
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    // console.log("date data", date);
                    setFieldValue("StartTime", date);
                  }}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="تاریخ را انتخاب کنید"
                  className="form-control"
                  isClearable
                  // maxDate={endDate}
                />
              </Col>
              <Col md="6" className="mb-1">
                <Label className="form-label" for="EndTime">
                  تاریخ پایان
                </Label>
                <DatePicker
                  id="EndTime"
                  selected={endDate}
                  // onChange={(date) => setEndDate(date)}
                  onChange={(date) => {
                    setEndDate(date);
                    console.log("date data", date);
                    setFieldValue("EndTime", date);
                  }}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="تاریخ را انتخاب کنید"
                  className="form-control"
                  isClearable
                  minDate={startDate} // حداقل تاریخ پایان برابر تاریخ شروع
                />
              </Col>
            </Row>

            <Row>
              <Col md="12" className="mb-1">
                <Label className="form-label" for="Describe">
                  توضیحات کامل دوره++++++++++++++++++++++++++++
                </Label>
                <EditorControlled setFieldValue={setFieldValue} />
              </Col>
            </Row>
            <div className="d-flex justify-content-between">
              <Button
                color="primary"
                className="btn-prev"
                onClick={() => stepper.previous()}
              >
                <ArrowLeft
                  size={14}
                  className="align-middle me-sm-25 me-0"
                ></ArrowLeft>
                <span className="align-middle d-sm-inline-block d-none">
                  قبلی
                </span>
              </Button>
              <Button
                color="primary"
                className="btn-next"
                onClick={() => {
                  handleSubmit();
                  console.log("Form Data1:", values); // لاگ فرم دیتا
                  setFormData((prev) => ({
                    ...prev,
                    secondInfo: values,
                  }));
                  stepper.next();
                }}
              >
                <span className="align-middle d-sm-inline-block d-none">
                  بعدی
                </span>
                <ArrowRight
                  size={14}
                  className="align-middle ms-sm-25 ms-0"
                ></ArrowRight>
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

export default SecondInfo;
