import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Formik } from "formik";
import LoginLayout from "../layouts/Login";
import * as Yup from "yup";
import axios from "../axios";
import { useTranslation } from "react-i18next";

const schema = Yup.object().shape({
  name: Yup.string().min(3).required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  citizenshipNumber: Yup.string().min(4).required("Citizenship Number is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirm: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const Signup = (): JSX.Element => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  return (
    <LoginLayout error={error} success={success}>
      <div className="formmm-container">
        <Formik
          initialValues={{
            name: "",
            email: "",
            citizenshipNumber: "",
            password: "",
            confirm: "",
          }}
          validationSchema={schema}
          onSubmit={({ name, email, citizenshipNumber, password }) => {
            axios
              .post("/auth/signup", { name, email, citizenshipNumber, password })
              .then((res) => {
                setError("");
                setSuccess(t("signup_success"));
              })
              .catch((err) => {
                let error: string = err.message;
                if (err?.response?.data) {
                  error = JSON.stringify(err.response.data);
                }
                setError(error.slice(0, 50));
              });
          }}
        >
          {({ errors, touched, getFieldProps, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <label htmlFor="name">{t("name")}:</label>
                <input
                  id="name"
                  type="text"
                  placeholder={t("name")}
                  {...getFieldProps("name")}
                />
                {touched.name && errors.name && (
                  <div className="form-error-text">{errors.name}</div>
                )}
              </div>

              <div className="input-container">
                <label htmlFor="citizenshipNumber">{t("citizenship number")}:</label>
                <input
                  id="citizenshipNumber"
                  type="text"
                  placeholder={t("citizenship number")}
                  {...getFieldProps("citizenshipNumber")}
                />
                {touched.citizenshipNumber && errors.citizenshipNumber && (
                  <div className="form-error-text">{errors.citizenshipNumber}</div>
                )}
              </div>

              <div className="input-container">
                <label htmlFor="email">{t("email")}:</label>
                <input
                  id="email"
                  type="email"
                  placeholder={t("email ")}
                  {...getFieldProps("email")}
                />
                {touched.email && errors.email && (
                  <div className="form-error-text">{errors.email}</div>
                )}
              </div>

              <div className="input-container">
                <label htmlFor="password">{t("password")}:</label>
                <input
                  id="password"
                  type="password"
                  placeholder={t("password ")}
                  {...getFieldProps("password")}
                />
                {touched.password && errors.password && (
                  <div className="form-error-text">{errors.password}</div>
                )}
              </div>

              <div className="input-container">
                <label htmlFor="confirm">{t("confirm password")}:</label>
                <input
                  id="confirm"
                  type="password"
                  placeholder={t("confirm password")}
                  {...getFieldProps("confirm")}
                />
                {touched.confirm && errors.confirm && (
                  <div className="form-error-text">{errors.confirm}</div>
                )}
              </div>

              <button className="button-primary" type="submit">
                {t("create account")}
              </button>
            </form>
          )}
        </Formik>

        {error && <div className="form-error-text">{error}</div>}
        {success && <div className="form-success-text">{success}</div>}

        <hr />
        <div className="form-info-text">{t("Already have account?")}</div>

        <button
          onClick={() => navigate("/login")}
          className="button-secondary"
          type="button"
        >
          {t("login")}
        </button>
      </div>
    </LoginLayout>
  );
};

export default Signup;
