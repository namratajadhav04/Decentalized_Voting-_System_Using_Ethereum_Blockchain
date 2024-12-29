import React from "react";
import { useParams } from "react-router";
import axios from "../../axios";
import { useTranslation } from "react-i18next"; // Import useTranslation

const Verify = () => {
  const { id, name } = useParams();
  const { t } = useTranslation(); // Use the useTranslation hook

  const verifyUser = () => {
    axios
      .post("/users/verify", { userId: id })
      .then((res) => console.log({ res }))
      .catch((error) => console.log({ error }));
  };

  const deleteUser = () => {
    axios
      .delete(`/users/delete/${id}`)
      .then((res) => console.log({ res }))
      .catch((error) => console.log({ error }));
  };

  return (
    <div>
      <button onClick={verifyUser} className="button-primary">
        {t("verify")} {name}
      </button>

      <button onClick={deleteUser} className="button-black">
        {t("delete")} {name}
      </button>
    </div>
  );
};

export default Verify;
