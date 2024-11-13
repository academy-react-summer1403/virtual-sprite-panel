// ** React Imports
import { useSkin } from "@hooks/useSkin";
import { Link, useNavigate } from "react-router-dom"; // useNavigate را وارد کنید
import { loginAPI } from "../core/services/api/Auth/auth";
// ** Icons Imports
import { Facebook, Twitter, Mail, GitHub } from "react-feather";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";

// ** Formik Imports
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/login-v2.svg";
import illustrationsDark from "@src/assets/images/pages/login-v2-dark.svg";

// ** Styles
import "@styles/react/pages/page-authentication.scss";

const Login = () => {
  const { skin } = useSkin();
  const navigate = useNavigate(); // استفاده از useNavigate برای هدایت
  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  const loginUser = async (values) => {
    console.log("Login Clicked");
    const userObj = {
      phoneOrGmail: values.loginEmail,
      password: values.loginPassword,
      rememberMe: true,
    };
    const user = await loginAPI(userObj);
    console.log(user); // بررسی محتوای پاسخ API
    if (user && user.token) {
      if (user.message.includes("موفق")) {
        localStorage.setItem("token", user.token);
        console.log(user.token);
        navigate("/home"); // هدایت به صفحه home در صورت موفقیت
      }
    } else {
      console.log("توکن موجود نیست");
    }
  };

  // Validation schema with Yup
  const validationSchema = Yup.object({
    loginEmail: Yup.string()
      .email("Invalid email address")
      .required("Required"),
    loginPassword: Yup.string().required("Password is required"),
    rememberMe: Yup.boolean(),
  });

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <svg viewBox="0 0 139 95" version="1.1" height="28">
            <defs>
              <linearGradient
                x1="100%"
                y1="10.5120544%"
                x2="50%"
                y2="89.4879456%"
                id="linearGradient-1"
              >
                <stop stopColor="#000000" offset="0%"></stop>
                <stop stopColor="#FFFFFF" offset="100%"></stop>
              </linearGradient>
              <linearGradient
                x1="64.0437835%"
                y1="46.3276743%"
                x2="37.373316%"
                y2="100%"
                id="linearGradient-2"
              >
                <stop stopColor="#EEEEEE" stopOpacity="0" offset="0%"></stop>
                <stop stopColor="#FFFFFF" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g id="Artboard" transform="translate(-400.000000, -178.000000)">
                <g id="Group" transform="translate(400.000000, 178.000000)">
                  <path
                    d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z"
                    id="Path"
                    className="text-primary"
                    style={{ fill: "currentColor" }}
                  ></path>
                  <path
                    d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z"
                    id="Path"
                    fill="url(#linearGradient-1)"
                    opacity="0.2"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
          <h2 className="brand-text text-primary ms-1">Vuexy</h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              Welcome to Vuexy! 👋
            </CardTitle>
            <CardText className="mb-2">
              Please sign-in to your account and start the adventure
            </CardText>
            <Formik
              initialValues={{}}
              validationSchema={validationSchema}
              onSubmit={loginUser}
            >
              {({ handleSubmit, handleChange, values, errors, touched }) => (
                <Form className="auth-login-form mt-2" onSubmit={handleSubmit}>
                  <div className="mb-1">
                    <Label className="form-label" for="login-email">
                      Email
                    </Label>
                    <Input
                      type="email"
                      id="login-email"
                      name="loginEmail"
                      placeholder="virtual-sprite@google.com"
                      value={values.loginEmail}
                      onChange={handleChange}
                      invalid={touched.loginEmail && !!errors.loginEmail}
                    />
                    <FormFeedback>{errors.loginEmail}</FormFeedback>
                  </div>
                  <div className="mb-1">
                    <div className="d-flex justify-content-between">
                      <Label className="form-label" for="login-password">
                        Password
                      </Label>
                      <Link to="/forgot-password">
                        <small>Forgot Password?</small>
                      </Link>
                    </div>
                    <InputPasswordToggle
                      id="login-password"
                      name="loginPassword"
                      value={values.loginPassword}
                      onChange={handleChange}
                      invalid={touched.loginPassword && !!errors.loginPassword}
                    />
                    <FormFeedback>{errors.loginPassword}</FormFeedback>
                  </div>
                  <div className="form-check mb-1">
                    <Input
                      type="checkbox"
                      id="remember-me"
                      name="rememberMe"
                      checked={values.rememberMe}
                      onChange={handleChange}
                    />
                    <Label className="form-check-label" for="remember-me">
                      Remember Me
                    </Label>
                  </div>
                  <Button type="submit" color="primary" block>
                    Sign in
                  </Button>
                </Form>
              )}
            </Formik>
            <p className="text-center mt-2">
              <span className="me-25">New on our platform?</span>
              <Link to="/register">
                <span>Create an account</span>
              </Link>
            </p>
            <div className="divider my-2">
              <div className="divider-text">or</div>
            </div>
            <div className="auth-footer-btn d-flex justify-content-center">
              <Button color="facebook">
                <Facebook size={14} />
              </Button>
              <Button color="twitter">
                <Twitter size={14} />
              </Button>
              <Button color="google">
                <Mail size={14} />
              </Button>
              <Button className="me-0" color="github">
                <GitHub size={14} />
              </Button>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
