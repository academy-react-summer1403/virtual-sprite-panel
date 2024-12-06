import Select from "react-select";
import { selectThemeColors } from "@utils";

import { Fragment, useEffect, useState } from "react";

import { ArrowLeft } from "react-feather";
import { Label, Row, Col, Form, Input, Button } from "reactstrap";
import { getCourses } from "../../../../../core/services/api/courses/createCourseStep1";
import { Formik } from "formik";
import { createCourse } from "../../../../../core/services/api/courses/CreateCourseStep2.api";

const Technology = ({ stepper, type, formData, setFormData }) => {
  const [techOptions, setTechOptions] = useState([]);
  const [error, setError] = useState(null);

  // const handleFormChange = (values) => {
  //   setFormData((prev) => ({ ...prev, technology: values }));
  // };
  // console.log("formData test", formData);

  const onSubmit = async (values) => {
    setFormData((prev) => ({ ...prev, technology: values }));
    try {
      // console.log("formData", formData);
      const obj = {
        ...formData.accountDetails,
        ...formData.secondInfo,
        ...formData.visualInfo,
        ...formData.technology,
      };
      console.log("obj", obj);
      const newFormData = new FormData()
      Object.entries(obj).forEach(([key, value]) => {
        newFormData.append(key, value);
      });
      await createCourse(newFormData);
      // alert("دوره با موفقیت ثبت شد");
    } catch (error) {
      console.error("خطا در ثبت دوره:", error);
      alert("مشکلی در ثبت دوره به وجود آمده است");
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchCourseData = async () => {
      try {
        const result = await getCourses(signal);
        const techOptions = result.technologyDtos.map((item) => ({
          value: item.id,
          label: item.techName,
        }));
        setTechOptions(techOptions);
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
        initialValues={formData.accountDetails}
        onSubmit={(values) => onSubmit(values)}
      >
        {({ handleSubmit, values, handleChange }) => (
          <Form onSubmit={onSubmit}>
            <Row>
              <Col md="6" className="mb-1">
                <Label className="form-label" for="tech">
                  انتخاب تکنولوژی
                </Label>
                <Select
                  theme={selectThemeColors}
                  className="react-select w-100"
                  classNamePrefix="select"
                  placeholder="انتخاب تکنولوژی ... "
                  value={
                    techOptions.find(
                      (option) => option.value === values.tech
                    ) || null
                  }
                  options={techOptions}
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
                        name: "tech",
                        value: selectedOption?.value || "",
                      },
                    });
                  }}
                />
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
                onClick={() => {
                  handleSubmit();
                  console.log("Form tech:", values); // لاگ فرم دیتا
                  setFormData((prev) => ({
                    ...prev,
                    technology: values,
                  })); // ذخیره داده در استیت اصلی
                  stepper.next();
                }}
                color="success"
                className="btn-submit"
              >
                ثبت اطلاعات دوره
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

export default Technology;
