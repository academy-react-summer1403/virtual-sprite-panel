import Select from "react-select";
import { selectThemeColors } from "@utils";

import { Fragment, useEffect, useState } from "react";

import { ArrowLeft } from "react-feather";
import { Label, Row, Col, Form, Input, Button } from "reactstrap";
import { getCourses } from "../../../../../core/services/api/courses/createCourseStep1";

const Technology = ({ stepper, type }) => {
  const [techOptions, setTechOptions] = useState([]);
  const [error, setError] = useState(null);

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
      <Form onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`google-${type}`}>
              انتخاب تکنولوژی
            </Label>
            <Select
              theme={selectThemeColors}
              className="react-select w-100"
              classNamePrefix="select"
              defaultValue={techOptions[0] || { value: "", label: "انتخاب کنید" }}
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
            <span className="align-middle d-sm-inline-block d-none">قبلی</span>
          </Button>
          <Button
            color="success"
            className="btn-submit"
            onClick={() => alert("submitted")}
          >
            ثبت اطلاعات دوره
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default Technology;
