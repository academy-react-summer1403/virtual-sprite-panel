import { useRef, useState } from "react";
// ** Third Party Components
import classnames from "classnames";
import { Check } from "react-feather";
// ** Reactstrap Imports
import {
  Nav,
  TabPane,
  NavItem,
  NavLink,
  Dropdown,
  TabContent,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Table,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardColumns,
  CardText,
  Col,
  Row,
  CardImg,
  Button,
} from "reactstrap";
import { useParams } from "react-router-dom";

// ** Custom Components
import Wizard from "@components/wizard";

// ** Steps
import Image from "./steps-with-validation/Image";

import PersonalInfo from "./steps-with-validation/PersonalInfo";
import AccountDetails from "./steps-with-validation/AccountDetails";
const EditCourse = () => {
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);

  const steps = [
    {
      id: "account-details",
      title: "اطلاعات اولیه",
      subtitle: "اطلاعات اولیه را وارد کنید",
      content: <AccountDetails stepper={stepper} />,
    },
    {
      id: "personal-info",
      title: "ویژگی دوره",
      subtitle: "ویژگی دوره را وارد کنید",
      content: <PersonalInfo stepper={stepper} />,
    },
    {
      id: "step-address",
      title: "عکس دوره",
      subtitle: "عکس دوره را وارد کنیپ",
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
