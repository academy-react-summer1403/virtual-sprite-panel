// ** React Imports
import { Fragment, useEffect, useState } from "react";
import { getCourses } from "../../../../../core/services/api/courses/createCourseStep1";

// ** Third Party Components
import Select from "react-select";
import { ArrowLeft, ArrowRight } from "react-feather";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import EditorControlled from "../../../../../../src/views/apps/forms/form-elemenst/editor/EditorControlled";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import { Label, Row, Col, Form, Input, Button } from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/editor/editor.scss";

const SecondInfo = ({ stepper, type }) => {
  const [classOptions, setClassOptions] = useState([]);
  const [teacherOptions, setTeacherOptions] = useState([]);
  const [termOptions, setTermOptions] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState(null);

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
      <Form onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`first-name-${type}`}>
              نام کلاس
            </Label>
            <Select
              theme={selectThemeColors}
              className="react-select w-100"
              classNamePrefix="select"
              defaultValue={
                classOptions[0] || { value: "", label: "انتخاب کنید" }
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
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`last-name-${type}`}>
              تعداد جلسات
            </Label>
            <Input
              type="text"
              name="last-name"
              id={`last-name-${type}`}
              placeholder="10"
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`first-name-${type}`}>
              نام استاد
            </Label>
            <Select
              theme={selectThemeColors}
              className="react-select w-100"
              classNamePrefix="select"
              defaultValue={
                teacherOptions[0] || { value: "", label: "انتخاب کنید" }
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
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`last-name-${type}`}>
              ترم دوره
            </Label>
            <Select
              theme={selectThemeColors}
              className="react-select w-100"
              classNamePrefix="select"
              defaultValue={
                termOptions[0] || { value: "", label: "انتخاب کنید" }
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
            />
          </Col>
        </Row>

        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="dateStart">
              تاریخ شروع
            </Label>
            <DatePicker
              id="dateStart"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="تاریخ را انتخاب کنید"
              className="form-control"
              isClearable
              maxDate={endDate} // حداکثر تاریخ شروع برابر تاریخ پایان
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="dateEnd">
              تاریخ پایان
            </Label>
            <DatePicker
              id="dateEnd"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
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
          <Label className="form-label" for="dateEnd">
               توضیحات کامل دوره
            </Label>
            <EditorControlled />
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

export default SecondInfo;
