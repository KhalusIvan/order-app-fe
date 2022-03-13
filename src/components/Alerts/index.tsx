import { FC } from "react";
import { getAlerts } from "../../redux/selector/alertSelector";
import { useSelector } from "react-redux";
import { Alert } from "@mui/material";
import { Alert as AlertType } from "../../types";

export const Alerts: FC = () => {
  const alerts: AlertType[] = useSelector(getAlerts);
  return (
    <div
      style={{
        position: "fixed",
        top: 30,
        left: "50%",
        transform: "translate(-50%, 0)",
        maxWidth: "90vw",
        width: 400,
        zIndex: 3000,
      }}
    >
      {alerts.map((el) => (
        <Alert key={el.id} severity={el.severity} sx={{ my: 2 }}>
          {el.text}
        </Alert>
      ))}
    </div>
  );
};
