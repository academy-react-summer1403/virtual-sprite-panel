import Select from "react-select";
import { Fragment, useEffect, useState } from "react";
import { selectThemeColors } from "@utils";
import { ArrowLeft, ArrowRight } from "react-feather";
import { getCourses } from "../../../../../core/services/api/courses/createCourseStep1";

import { Label, Row, Col, Input, Form, Button } from "reactstrap";
import { Formik } from "formik";

const AccountDetails = ({ stepper, type, formData, setFormData }) => {
  const [typeOptions, setTypeOptions] = useState([]);
  const [levelOptions, setLevelOptions] = useState([]);
  const [error, setError] = useState(null);
  const handleFormChange = (values) => {
    setFormData((prev) => ({ ...prev, accountDetails: values }));
  };
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchCourseData = async () => {
      try {
        const result = await getCourses(signal);

        // نوع دوره‌ها
        const typeOptions = result.courseTypeDtos.map((item) => ({
          value: item.id,
          label: item.typeName,
        }));
        setTypeOptions(typeOptions);

        // سطح دوره‌ها
        const levelOptions = result.courseLevelDtos.map((item) => ({
          value: item.id,
          label: item.levelName,
        }));
        setLevelOptions(levelOptions);
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
      {error && <p className="text-danger text-center">{error}</p>}
      <Formik
        initialValues={formData.accountDetails}
        onSubmit={(values) => handleFormChange(values)}
      >
        {({ handleSubmit, values, handleChange }) => (
          <Form onSubmit={(e) => e.preventDefault()}>
            <Row>
              <Col md="6" className="mb-1">
                <Label className="form-label" for="Title">
                  عنوان دوره
                </Label>
                <Input
                  type="text"
                  name="Title"
                  id="Title"
                  placeholder="عنوان دوره"
                  value={values.Title || ""}
                  onChange={handleChange}
                />
              </Col>
              <Col md="6" className="mb-1">
                <Label className="form-label" for="Cost">
                  قیمت دوره
                </Label>
                <Input
                  type="text"
                  name="Cost"
                  id="Cost"
                  placeholder="1000000"
                  value={values.Cost || ""}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md="6" className="mb-1">
                <Label className="form-label" for="Capacity">
                  ظرفیت دوره
                </Label>
                <Input
                  type="text"
                  name="Capacity"
                  id="Capacity"
                  placeholder="100"
                  value={values.Capacity || ""}
                  onChange={handleChange}
                />
              </Col>
              <Col md="6" className="mb-1">
                <Label className="form-label" for="CourseTypeId">
                  نحوه برگزاری
                </Label>
                <Select
                  theme={selectThemeColors}
                  className="react-select w-100"
                  classNamePrefix="select"
                  placeholder="انتخاب  نحوه برگزاری ... "
                  value={
                    typeOptions.find(
                      (option) => option.value === values.CourseTypeId
                    ) || null
                  }
                  options={typeOptions}
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
                        name: "CourseTypeId",
                        value: selectedOption?.value || "",
                      },
                    });
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col md="6" className="mb-1">
                <Label className="form-label" for="MiniDescribe">
                  توضیح مختصر
                </Label>
                <Input
                  type="text"
                  id="MiniDescribe"
                  name="MiniDescribe"
                  placeholder="توضیح مختصر"
                  value={values.MiniDescribe || ""}
                  onChange={handleChange}
                />
              </Col>
              <Col md="6" className="mb-1">
                <Label className="form-label" for="CourseLvlId">
                  سطح برگزاری
                </Label>
                <Select
                  theme={selectThemeColors}
                  className="react-select w-100"
                  classNamePrefix="select"
                  placeholder="انتخاب سطح ... "
                  value={
                    levelOptions.find(
                      (option) => option.value === values.CourseLvlId
                    ) || null
                  }
                  options={levelOptions}
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
                        name: "CourseLvlId",
                        value: selectedOption?.value || "",
                      },
                    });
                  }}
                />
              </Col>
            </Row>

            <Row>
              <Col md="6" className="mb-1">
                <Label className="form-label" for="googleTitle">
                  تیتر گوگل
                </Label>
                <Input
                  type="text"
                  id="googleTitle"
                  placeholder="تیتر گوگل "
                  value={values.googleTitle || ""}
                  onChange={handleChange}
                />
              </Col>
              <Col md="6" className="mb-1">
                <Label className="form-label" for="googleSchema">
                  شمای گوگل
                </Label>
                <Input
                  type="text"
                  id="googleSchema"
                  placeholder="شمای گوگل "
                  value={values.googleSchema || ""}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <div className="d-flex justify-content-between">
              <Button color="secondary" className="btn-prev" outline disabled>
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
                    accountDetails: values,
                  })); // ذخیره داده در استیت اصلی
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

export default AccountDetails;
