// ** React Imports
import { Fragment } from "react";

// ** Icons Imports
import { ArrowLeft, ArrowRight } from "react-feather";

// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button } from "reactstrap";
import FileUploaderSingle from "../../../../../views/apps/forms/form-elemenst/file-uploader/FileUploaderSingle";

const VisulaInfo = ({ stepper, type }) => {
  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">ویژگی های بصری</h5>
      </div>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col md="12" className="mb-1">
            <Label className="form-label" for={`pincode-${type}`}>
              آپلود عکس دوره
            </Label>
            <FileUploaderSingle />
          </Col>
        </Row>
        <Row>
          <Col md="12" className="mb-1"> <Label className="form-label" for={`pincode-${type}`}>
              آپلود فیلم دوره
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

export default VisulaInfo;
