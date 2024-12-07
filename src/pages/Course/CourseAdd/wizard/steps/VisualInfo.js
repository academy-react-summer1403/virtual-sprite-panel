// ** React Imports
import { Fragment, useState } from "react";

// ** Icons Imports
import { ArrowLeft, ArrowRight } from "react-feather";

// ** Reactstrap Imports
import { Formik } from "formik";
import { Button, Col, Form, Label, Row } from "reactstrap";
import FileUploaderSingle from "../../../../../views/apps/forms/form-elemenst/file-uploader/FileUploaderSingle";
// import { useState } from "react";
const generateUniqueString = () => {
  return `unique_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
};
const VisulaInfo = ({ stepper, type, formData, setFormData }) => {
  const uniqueString = generateUniqueString();

  const handleFormChange = (values) => {
    // setFormData((prev) => ({ ...prev, visualInfo: values }));
    const obj = {
      Image: img,
      TumbImageAddress: img,
      ImageAddress: img,
      ShortLink: "wegnfghrtyu",
      UniqeUrlString: uniqueString, // رشته یکتا
      CurrentCoursePaymentNumber: 1,
    };
    setFormData((prev) => ({ ...prev, visualInfo: obj }));
  };
  const [img, setImg] = useState();
  console.log("عکس ما", img);
  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">ویژگی های بصری</h5>
      </div>
      <Formik
        initialValues={formData.visualInfo}
        onSubmit={(values) => handleFormChange(values)}
      >
        {({ handleSubmit, values, handleChange }) => (
          <Form onSubmit={(e) => e.preventDefault()}>
            <Row>
              <Col md="12" className="mb-1">
                <Label className="form-label" for={`pincode-${type}`}>
                  آپلود عکس دوره
                </Label>
                <FileUploaderSingle setImg={setImg} />
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
                  const uniqueString = generateUniqueString();
                  setFormData((prev) => ({
                    ...prev,
                    visualInfo: {
                      Image: img,
                      TumbImageAddress: img,
                      ImageAddress: img,
                      ShortLink: uniqueString,
                      UniqeUrlString: uniqueString,
                      CurrentCoursePaymentNumber: 3,
                    },
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

export default VisulaInfo;
