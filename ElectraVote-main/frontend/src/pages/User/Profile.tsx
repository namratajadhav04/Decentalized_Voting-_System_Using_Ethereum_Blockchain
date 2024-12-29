import React, { useState, useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios"; 
import { AuthContext } from "../../contexts/Auth"; 
import { useTranslation } from "react-i18next"; // Import useTranslation

const Profile = () => {
  const authContext = useContext(AuthContext); 
  const [profilePic, setProfilePic] = useState("default.jpg");
  const [editMode, setEditMode] = useState(false);
  const { t } = useTranslation(); // Initialize t function

  const handlePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleEditToggle = () => setEditMode(!editMode);

  const profileSchema = Yup.object().shape({
    name: Yup.string().min(3, t("nameTooShort")).required(t("required")),
    email: Yup.string().email(t("invalidEmail")).required(t("required")),
    phone: Yup.string().min(10, t("phoneTooShort")).required(t("required")),
  });

  return (
    <div className="profile-wrapper">
      <div className="left-panel">
        <div className="person-icon">
          <img src={profilePic} alt="Profile" className="profile-pic" />
          <input type="file" id="profile-pic-upload" onChange={handlePictureUpload} />
        </div>
        <div className="text-normal username">{authContext.name}</div>
        <button onClick={authContext.logout} className="button-primary">
          {t("signOut")} {/* Translate Sign Out */}
        </button>
      </div>

      <div className="right-panel">
        <span className="title-small">{t("profile")}</span> {/* Translate Profile Title */}

        <Formik
          initialValues={{
            name: authContext.name || t("defaultName"),
            email: authContext.email || t("defaultEmail"),
            phone: "1234567890",
            address: "123 Main St, City",
            citizenshipNumber: "CIT-123456",
          }}
          validationSchema={profileSchema}
          onSubmit={(values) => {
            axios.post("/profile/update", values)
              .then((res) => {
                alert(t("profileUpdated")); // Translate Profile updated message
              })
              .catch((err) => {
                console.error(err);
              });
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <form className="profile-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="name">{t("name")}</label> {/* Translate Name label */}
                <input
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  disabled={!editMode}
                />
                {touched.name && errors.name && <div className="error">{errors.name}</div>}
              </div>

              <div className="input-group">
                <label htmlFor="email">{t("email")}</label> {/* Translate Email label */}
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  disabled={!editMode}
                />
                {touched.email && errors.email && <div className="error">{errors.email}</div>}
              </div>

              <div className="input-group">
                <label htmlFor="phone">{t("phone")}</label> {/* Translate Phone label */}
                <input
                  type="text"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  disabled={!editMode}
                />
                {touched.phone && errors.phone && <div className="error">{errors.phone}</div>}
              </div>

              <div className="input-group">
                <label htmlFor="citizenshipNumber">{t("citizenshipNumber")}</label> {/* Translate Citizenship Number label */}
                <input
                  type="text"
                  name="citizenshipNumber"
                  value={values.citizenshipNumber}
                  disabled
                />
              </div>

              {editMode && (
                <button type="submit" className="save-btn">{t("saveChanges")}</button>
              )}
            </form>
          )}
        </Formik>

        <div className="voting-history">
          <h2>{t("votingHistory")}</h2> {/* Translate Voting History */}
          <ul>
            <li>{t("voteOnProposal1")}</li>
            <li>{t("voteOnProposal2")}</li>
          </ul>
        </div>

        <div className="account-settings">
          <h2>{t("accountSettings")}</h2> {/* Translate Account Settings */}
          <p>{t("manageAccountPreferences")}</p> {/* Translate Manage Account Preferences */}
          <div className="input-group">
            <label htmlFor="notifications">{t("emailNotifications")}</label> {/* Translate Email Notifications */}
            <input type="checkbox" id="notifications" defaultChecked />
          </div>
        </div>

        <div className="activity-log">
          <h2>{t("activityLog")}</h2> {/* Translate Activity Log */}
          <ul>
            <li>{t("loginFromIP", { ip: "192.168.1.1", date: "09/19/2024" })}</li> {/* Translate Login Activity */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
