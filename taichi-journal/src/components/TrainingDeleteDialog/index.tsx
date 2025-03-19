import { useState } from "react";
import { type JSX } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";
import { mockData, Training } from "mockData";
import styles from "./styles.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  training: null | Training;
}

const TrainingDeleteDialog = ({
  isOpen,
  onClose,
  training,
}: Props): JSX.Element => {
  const router = useRouter();
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const handleSubmit = (): void => {
    // Delete training from mock data
    // TODO: Delete training using API endpoint or GraphQL using instead id of the trainig
    const index = mockData.findIndex(
      (item) =>
        item.name.toLocaleLowerCase() === training?.name.toLocaleLowerCase()
    );
    mockData.splice(index, 1);

    setIsMessageVisible(true);
    onClose();
    router.push("/");
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ): void => {
    if (reason === "clickaway") {
      return;
    }
    setIsMessageVisible(false);
  };

  return (
    <>
      <Dialog open={isOpen} onClose={onClose} disableEnforceFocus>
        <DialogTitle>Do you really want to delete this training?</DialogTitle>
        <DialogContent>
          Are you sure to have practiced{" "}
          <span className={styles.trainingNameText}>{training?.name}</span>{" "}
          enough?
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Yes, delete</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={isMessageVisible}
        autoHideDuration={3000}
        onClose={handleClose}
        // Mock data for happy case
        // TODO: Message content will be based on request response.
        message="Training was deleted."
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </>
  );
};

export default TrainingDeleteDialog;
