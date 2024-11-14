import { Card, CardHeader, CardBody, CardTitle } from "reactstrap";
// import TableAdvSearch from "../../../@core/components/tables/data-tables/advance/TableAdvSearch";
import { getTopCourses } from '../../../core/services/api/courses/courseTop.api';
import { useState, useEffect } from "react";

const CourseDetail = () => {
  // const [topCourses, setTopCourses] = useState([]);

  // const getCourses = async () => {
  //   const result = await getTopCourses();
  //   setTopCourses(result.courseDtos);
  // };

  // useEffect(() => {
  //   getCourses();
  // }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>جزییات دوره ها</CardTitle>
      </CardHeader>
      <CardBody>
        نمایش داده های سطر انتخاب شده
      </CardBody>
    </Card>
  );
};

export default CourseDetail;
