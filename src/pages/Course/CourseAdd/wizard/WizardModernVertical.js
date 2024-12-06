import { useRef, useState } from "react";
import Wizard from "@components/wizard";
import { FileText, User, MapPin, Link } from "react-feather";
import { createCourse } from "../../../../core/services/api/courses/CreateCourseStep2.api";
import AccountDetails from "../wizard/steps/AccountDetails";
import SecondInfo from "../wizard/steps/SecondInfo";
import VisualInfo from "../wizard/steps/VisualInfo";
import Technology from "../wizard/steps/Technology";

const WizardModernVertical = () => {
  const ref = useRef(null);
  const [stepper, setStepper] = useState(null);

  const [formData, setFormData] = useState({
    accountDetails: {},
    secondInfo: {},
    visualInfo: {},
    technology: {},
  });

  const handleCreateCourse = async () => {
    try {
      console.log("formData", formData);
      // const result = await createCourse(formData);
      // console.log("Course Created Successfully:", result);
      // alert("دوره با موفقیت ایجاد شد!");
    } catch (error) {
      console.error("خطا در ایجاد دوره:", error);
      alert("ایجاد دوره با خطا مواجه شد.");
    }
  };

  const steps = [
    {
      id: "accountDetails",
      title: "اطلاعات اولیه",
      subtitle: "اطلاعات اولیه را وارد کنید",
      icon: <FileText size={18} />,
      content: (
        <AccountDetails
          formData={formData}
          setFormData={setFormData}
          stepper={stepper}
          type="modern-vertical"
          onUpdate={(data) =>
            setFormData((prev) => ({ ...prev, accountDetails: data }))
          }
        />
      ),
    },
    {
      id: "secondInfo",
      title: "اطلاعات تکمیلی",
      subtitle: "اطلاعات تکمیلی را وارد کنید",
      icon: <User size={18} />,
      content: (
        <SecondInfo
          formData={formData}
          setFormData={setFormData}
          stepper={stepper}
          type="modern-vertical"
          onUpdate={(data) =>
            setFormData((prev) => ({ ...prev, secondInfo: data }))
          }
        />
      ),
    },
    {
      id: "visualInfo",
      title: "اطلاعات بصری",
      subtitle: "عکس و ... را وارد کنید",
      icon: <MapPin size={18} />,
      content: (
        <VisualInfo
          formData={formData}
          setFormData={setFormData}
          stepper={stepper}
          type="modern-vertical"
          onUpdate={(data) =>
            setFormData((prev) => ({ ...prev, visualInfo: data }))
          }
        />
      ),
    },
    {
      id: "technology",
      title: "تکنولوژی",
      subtitle: "تکنولوژی را انتخاب کنید",
      icon: <Link size={18} />,
      content: (
        <Technology
          formData={formData}
          setFormData={setFormData}
          stepper={stepper}
          type="modern-vertical"
          onUpdate={(data) =>
            setFormData((prev) => ({ ...prev, technology: data }))
          }
        />
      ),
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
      <button className="btn btn-primary mt-2" onClick={handleCreateCourse}>
        ایجاد دوره
      </button>
    </div>
  );
};

export default WizardModernVertical;
