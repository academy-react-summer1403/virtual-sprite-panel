// ** React Imports
import { Fragment } from "react";

// ** Icons Imports
import { ArrowLeft, ArrowRight } from "react-feather";

// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button } from "reactstrap";
import FileUploaderSingle from "../../../../../views/apps/forms/form-elemenst/file-uploader/FileUploaderSingle";
import { Formik } from "formik";

const VisulaInfo = ({ stepper, type, formData, setFormData }) => {
  const handleFormChange = (values) => {
    // setFormData((prev) => ({ ...prev, visualInfo: values }));
    const obj = {
      Image: "fakestringInageAddress1",
      TumbImageAddress: "fakestringInageAddress2",
      ImageAddress: "fakestringInageAddress3",
      ShortLink: "fakeShortLink",
      UniqeUrlString: "fakeUniqeUrlString",
      CurrentCoursePaymentNumber: 3,
    };
    setFormData((prev) => ({ ...prev, visualInfo: obj }));
  };
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
                <FileUploaderSingle />
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
                  // handleSubmit();
                  console.log("visual:");
                  setFormData((prev) => ({
                    ...prev,
                    visualInfo: {
                      Image: "fakestringInageAddress1",
                      TumbImageAddress: "fakestringInageAddress2",
                      ImageAddress: "fakestringInageAddress3",
                      ShortLink: "fakeShortLink",
                      UniqeUrlString: "fakeUniqeUrlString",
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
