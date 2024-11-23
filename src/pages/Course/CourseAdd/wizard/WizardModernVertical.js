// ** React Imports
import { useRef, useState } from "react";

// ** Custom Components
import Wizard from "@components/wizard";

// ** Steps
import VisualInfo from "./steps/VisualInfo";
import Technology from "./steps/Technology";
import SecondInfo from "./steps/SecondInfo";
import AccountDetails from "./steps/AccountDetails";

// ** Icons Imports
import { FileText, User, MapPin, Link } from "react-feather";

const WizardModernVertical = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);

  const steps = [
    {
      id: "firstInfo",
      title: "اطلاعات اولیه",
      subtitle: "اطلاعات اولیه را وارد کنید",
      icon: <FileText size={18} />,
      content: <AccountDetails stepper={stepper} type="modern-vertical" />,
    },
    {
      id: "secondInfo",
      title: "اطلاعات تکمیلی",
      subtitle: "اطلاعات تکمیلی را وارد کنید",
      icon: <User size={18} />,
      content: <SecondInfo stepper={stepper} type="modern-vertical" />,
    },
    {
      id: "visualInfo",
      title: "اطلاعات بصری",
      subtitle: "عکس و ... را وارد کنید",
      icon: <MapPin size={18} />,
      content: <VisualInfo stepper={stepper} type="modern-vertical" />,
    },
    {
      id: "technology",
      title: "تکنولوژی",
      subtitle: "تکنولوژی را انتخاب کنید",
      icon: <Link size={18} />,
      content: <Technology stepper={stepper} type="modern-vertical" />,
    },
  ];

  return (
    <div className="modern-vertical-wizard">
      <Wizard
        type="modern-vertical"
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

export default WizardModernVertical;
