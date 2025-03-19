import { Badge } from "@mui/material";
import { TrainingStatus } from "mockData";
import { type JSX } from "react";

interface Props {
  children: React.ReactNode;
  status: TrainingStatus;
}

const StatusBadge = ({ children, status }: Props): JSX.Element => {
  const statusColor =
    status === "none" ? "info" : status === "new" ? "success" : "error";

  return (
    <Badge title={status} color={statusColor} variant="dot">
      {children}
    </Badge>
  );
};

export default StatusBadge;
