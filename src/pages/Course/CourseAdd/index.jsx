import Select from "react-select";
import BreadCrumbs from '@components/breadcrumbs'
import WizardModernVertical from './wizard/WizardModernVertical.js'
import { selectThemeColors } from "@utils";
import { useEffect, useState } from "react";
import {
  Card,
  Table,
  CardHeader,
  CardBody,
  CardColumns,
  CardText,
  Nav,
  TabContent,
  TabPane,
  Col,
  Row,
  Button,
  NavItem,
  NavLink,
  Input,
} from "reactstrap";
// import { getCourses } from "../../../core/services/api/courses/createCourseStep1";

const CourseAdd = () => {
  // const [createCourse, setCreateCourse] = useState([]);
  // const [typeOptions, setTypeOptions] = useState([]);
  // const [active, setActive] = useState("1");

  // const getCreateCourses = async () => {
  //   try {
  //     const result = await getCourses();
  //     setCreateCourse(result.courseTypeDtos);

  //     const options = result.courseTypeDtos.map((item) => ({
  //       value: item.id,
  //       label: item.typeName,
  //     }));
  //     setTypeOptions(options);
  //   } catch (error) {
  //     console.error("خطا در دریافت داده‌ها:", error);
  //   }
  // };

  // useEffect(() => {
  //   getCreateCourses();
  // }, []);

  const toggle = (tab) => {
    setActive(tab);
  };

  return (
    <>
      <BreadCrumbs title='' data={[{ title: 'دوره ها' }, { title: 'افزودن دوره' }]} />
      <Row>
        <Col sm='12'>
          <WizardModernVertical />
        </Col>
      </Row>
    </>
  );
};

export default CourseAdd;
