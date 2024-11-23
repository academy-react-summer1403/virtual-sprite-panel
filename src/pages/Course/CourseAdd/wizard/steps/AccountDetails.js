import Select from "react-select";
import { Fragment, useEffect, useState } from "react";
import { selectThemeColors } from "@utils";
import { ArrowLeft, ArrowRight } from "react-feather";
import { getCourses } from "../../../../../core/services/api/courses/createCourseStep1";

// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button } from "reactstrap";

const AccountDetails = ({ stepper, type }) => {
  const [typeOptions, setTypeOptions] = useState([]);
  const [levelOptions, setLevelOptions] = useState([]);
  const [error, setError] = useState(null);

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
      <Form onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`username-${type}`}>
              عنوان دوره
            </Label>
            <Input
              type="text"
              name={`username-${type}`}
              id={`username-${type}`}
              placeholder="عنوان دوره"
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`email-${type}`}>
              قیمت دوره
            </Label>
            <Input
              type="email"
              name={`email-${type}`}
              id={`email-${type}`}
              placeholder="100000"
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`password-${type}`}>
              ظرفیت دوره
            </Label>
            <Input type="text" id={`password-${type}`} placeholder="10" />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`confirm-password-${type}`}>
              نحوه برگزاری
            </Label>
            <Select
              theme={selectThemeColors}
              className="react-select w-100"
              classNamePrefix="select"
              defaultValue={
                typeOptions[0] || { value: "", label: "انتخاب کنید" }
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
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`short-description-${type}`}>
              توضیحات کوتاه
            </Label>
            <Input
              type="text"
              id={`short-description-${type}`}
              placeholder="توضیح مختصر"
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`level-${type}`}>
              سطح برگزاری
            </Label>
            <Select
              theme={selectThemeColors}
              className="react-select w-100"
              classNamePrefix="select"
              defaultValue={
                levelOptions[0] || { value: "", label: "انتخاب کنید" }
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
            />
          </Col>
        </Row>

        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`short-description-${type}`}>
              تیتر گوگل{" "}
            </Label>
            <Input
              type="text"
              id={`short-description-${type}`}
              placeholder="تیتر گوگل "
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`level-${type}`}>
              شمای گوگل
            </Label>
            <Input
              type="text"
              id={`short-description-${type}`}
              placeholder="شمای گوگل "
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-between">
          <Button color="secondary" className="btn-prev" outline disabled>
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">قبلی</span>
          </Button>
          <Button
            color="primary"
            className="btn-next"
            onClick={() => stepper.next()}
          >
            <span className="align-middle d-sm-inline-block d-none">بعدی</span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
            ></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default AccountDetails;
