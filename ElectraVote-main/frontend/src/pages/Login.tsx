import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import LoginLayout from "../layouts/Login";
import axios from "../axios";
import { AuthContext } from "../contexts/Auth";
import { useTranslation } from "react-i18next";


const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(3, "Password must be at least 3 characters").required("Required"),
});

const Login = (): JSX.Element => {
  const { t } = useTranslation(); // Initialize t for translations
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleGoogleSuccess = (response: any) => {
    axios
      .post("/auth/google", { token: response.tokenId })
      .then((res) => {
        authContext.authenticate(res.data.user, res.data.accessToken);
        navigate("/");
      })
      .catch((err) => {
        let errorMessage = err.message;
        if (err?.response?.data) {
          errorMessage = JSON.stringify(err.response.data);
        }
        setError(errorMessage);
        setLoading(false);
      });
  };

  const handleGoogleError = (error: any) => {
    console.error(error);
    setError(t("google_login_failed"));
  };

  return (
    <LoginLayout error={error}>
      <div className="formm-container">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={schema}
          onSubmit={(values) => {
            setLoading(true);
            axios
              .post("/auth/login", values)
              .then((res) => {
                authContext.authenticate(res.data.user, res.data.accessToken);
                navigate("/home");
              })
              .catch((err) => {
                let errorMessage = err.message;
                if (err?.response?.data) {
                  errorMessage = JSON.stringify(err.response.data);
                }
                setError(errorMessage);
                setLoading(false);
              });
          }}
        >
          {({ errors, touched, getFieldProps, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <label htmlFor="email">{t("email")}</label>
                <input
                  id="email"
                  type="email"
                  placeholder={t("email_placeholder")}
                  {...getFieldProps("email")}
                />
                {touched.email && errors.email && (
                  <div className="formm-error-text">{t(errors.email)}</div>
                )}
              </div>

              <div className="input-container password-container">
                <label htmlFor="password">{t("password")}</label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("password_placeholder")}
                  {...getFieldProps("password")}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
                {touched.password && errors.password && (
                  <div className="formm-error-text">{t(errors.password)}</div>
                )}
              </div>

              <button
                className="login-button"
                type="submit"
                disabled={loading}
              >
                {loading ? t("loading") : t("login")}
              </button>
            </form>
          )}
        </Formik>

        {error && <div className="formm-error-text">{error}</div>}

        <div className="formm-info-text" onClick={() => navigate("/forgot-password")}>
          {t("forgot_password")}
        </div>

        <hr />

        <button
          onClick={() => navigate("/signup")}
          className="button-secondary"
        >
          {t("create_new_account")}
        </button>
      </div>
    </LoginLayout>
  );
};

export default Login;
