import { useEffect, useRef, useState } from "react";

import { getCoursesDetail } from "../../../../core/services/api/courses/courseDetailById.api";

// ** Third Party Components
// ** Reactstrap Imports
import { useParams } from "react-router-dom";

// ** Custom Components
import Wizard from "@components/wizard";

// ** Steps
import Image from "./steps-with-validation/Image";

import AccountDetails from "./steps-with-validation/AccountDetails";
import PersonalInfo from "./steps-with-validation/PersonalInfo";
const EditCourse = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const { id } = useParams();
  console.log(id);
  const getDetails = async () => {
    if (token) {
      const result = await getCoursesDetail(id);
      console.log("course detail", result);
      setData(result);
    } else {
      console.log("توکن وجود ندارد");
    }
  };
  useEffect(() => {
    getDetails();
  }, [id]);
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);

  const steps = [
    {
      id: "account-details",
      title: "اطلاعات اولیه",
      subtitle: "اطلاعات اولیه را وارد کنید",
      content: <AccountDetails stepper={stepper} getData={data} />,
    },
    {
      id: "personal-info",
      title: "ویژگی دوره",
      subtitle: "ویژگی دوره را وارد کنید",
      content: <PersonalInfo stepper={stepper} />,
    },
    {
      id: "step-image",
      title: "عکس دوره",
      subtitle: "عکس دوره را وارد کنید",
      content: <Image stepper={stepper} />,
    },
  ];

  return (
    <div className="modern-horizontal-wizard">
      <Wizard
        type="modern-horizontal"
        ref={ref}
        steps={steps}
        options={{
          linear: false,
        }}
        instance={(el) => setStepper(el)}
      />
    </div>
  );
};

export default EditCourse;
