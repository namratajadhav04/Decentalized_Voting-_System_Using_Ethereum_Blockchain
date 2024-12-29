import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "../../axios";
import * as yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next'; // Import i18next translation hook


const schema = yup.object({
  name: yup.string().min(3).required("Poll name is required"),
  description: yup.string().min(10).required("Poll description is required"),
  location: yup.string().required("Location is required"),
  contactEmail: yup.string().email("Invalid email address").required("Contact email is required"),
});

interface Candidate {
  name: string;
  info: string;
}

const CandidateInput: React.FC<{
  onAdd: (candidate: Candidate) => void;
  candidates: Candidate[];
}> = ({ onAdd, candidates }) => {
  const { t } = useTranslation(); // Initialize translation
  const [name, setName] = useState<string>("");
  const [info, setInfo] = useState<string>("");

  const handleAdd = () => {
    if (name.trim() && info.trim()) {
      const duplicate = candidates.some(c => c.name === name);
      if (duplicate) {
        alert(t("Candidate with this name already exists."));
        return;
      }
      onAdd({ name, info });
      setName("");
      setInfo("");
    }
  };

  return (
    <div className="add-candidate-wrapper">
      <input
        type="text"
        placeholder={t("Add Candidate Name")}
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="candidate-input"
      />
      <input
        type="text"
        placeholder={t("Candidate Info")}
        value={info}
        onChange={(e) => setInfo(e.target.value)}
        className="candidate-input"
      />
      <button type="button" onClick={handleAdd} className="add-button">
        {t("Add Candidate")}
      </button>
    </div>
  );
};

const CandidateList: React.FC<{
  candidates: Candidate[];
  onRemove: (index: number) => void;
}> = ({ candidates, onRemove }) => {
  const { t } = useTranslation();
  return (
    <div className="candidates-container">
      {candidates.map(({ name, info }, index) => (
        <div key={index} className="candidate-card">
          <div className="candidate-info">
            <h4>{name}</h4>
            <p>{info}</p>
          </div>
          <button onClick={() => onRemove(index)} className="remove-button">
            {t("Remove")}
          </button>
        </div>
      ))}
    </div>
  );
};

const Start = () => {
  const { t } = useTranslation();
  const [candidates, setCandidates] = useState<Array<Candidate>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const handleAddCandidate = (candidate: Candidate) => {
    setCandidates([...candidates, candidate]);
  };

  const handleRemoveCandidate = (index: number) => {
    setCandidates(candidates.filter((_, i) => i !== index));
  };

  return (
    <div className="form-container">
      <h2>{t("Create Poll")}</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <Formik
        initialValues={{
          name: "",
          description: "",
          location: "",
          contactEmail: "",
        }}
        validationSchema={schema}
        onSubmit={({ name, description, location, contactEmail }) => {
          setLoading(true);
          setError("");
          setSuccess("");

          if (candidates.length < 2) {
            setError(t("At least two candidates are required."));
            setLoading(false);
            return;
          }

          axios
            .post("/polls/start", { name, description, location, contactEmail, candidates, startDate, endDate })
            .then((response) => {
              setSuccess(t("Election started successfully!"));
              toast.success(t("Election started successfully!"));
              setLoading(false);
            })
            .catch((err) => {
              let error = err.message;
              if (err?.response?.data) error = err.response.data;
              setError(error.slice(0, 50));
              toast.error(t("Failed to start election."));
              setLoading(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form className="poll-form">
            <div className="input-container">
              <Field
                type="text"
                name="name"
                placeholder={t("Poll Name")}
                className="form-input"
              />
              <ErrorMessage name="name" component="div" className="form-error-text" />
            </div>

            <div className="input-container">
              <Field
                type="text"
                name="description"
                placeholder={t("Poll Description")}
                className="form-input"
              />
              <ErrorMessage name="description" component="div" className="form-error-text" />
            </div>

            <div className="input-container">
              <Field
                type="text"
                name="location"
                placeholder={t("Location")}
                className="form-input"
              />
              <ErrorMessage name="location" component="div" className="form-error-text" />
            </div>

            <div className="input-container">
              <Field
                type="email"
                name="contactEmail"
                placeholder={t("Contact Email")}
                className="form-input"
              />
              <ErrorMessage name="contactEmail" component="div" className="form-error-text" />
            </div>

            <div className="input-container">
              <label>{t("Poll Start Date")}</label>
              <DatePicker
                selected={startDate}
                onChange={(date: React.SetStateAction<Date | null>) => setStartDate(date)}
                showTimeSelect
                dateFormat="Pp"
                className="form-input"
              />
            </div>

            <div className="input-container">
              <label>{t("Poll End Date")}</label>
              <DatePicker
                selected={endDate}
                onChange={(date: React.SetStateAction<Date | null>) => setEndDate(date)}
                showTimeSelect
                dateFormat="Pp"
                className="form-input"
              />
            </div>

            <div className="election-logo">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgycoaiqoIBQdjgWuDyc74xddomDOxBZlEPA&s" alt="" />
            </div>

            <CandidateInput
              onAdd={handleAddCandidate}
              candidates={candidates}
            />

            {candidates.length > 0 && (
              <CandidateList candidates={candidates} onRemove={handleRemoveCandidate} />
            )}

            <button
              className="submit-button"
              type="submit"
              disabled={isSubmitting || loading}
            >
              {loading ? <div className="spinner"></div> : t("Start Election")}
            </button>
          </Form>
        )}
      </Formik>

      <ToastContainer />
    </div>
  );
};

export default Start;
