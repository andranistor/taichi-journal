import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";
import { type JSX } from "react";
import { mockData, Training, TrainingStatus } from "mockData";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  training: Training | null;
  onEdit?: (arg: Training) => void;
}

const TrainingDialog = ({
  isOpen,
  onClose,
  onEdit,
  training,
}: Props): JSX.Element => {
  const [newTraining, setNewTraining] = useState<Training>({
    name: training !== null ? training.name : "",
    status: training !== null ? training.status : "none",
  });
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const handleSubmit = (): void => {
    if (training === null) {
      setIsMessageVisible(true);
      // Create training in mock data
      // TODO: Create training using API endpoints or GraphQL
      mockData.push(newTraining);
    } else {
      onEdit?.(newTraining);
      // Update training in mock data
      // TODO: Update training using API endpoints or GraphQL
      const index = mockData.findIndex(
        (item) =>
          item.name.toLocaleLowerCase() === training.name.toLocaleLowerCase()
      );
      mockData.splice(index, 1, newTraining);
      setIsMessageVisible(true);
    }

    onClose();
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
        <DialogTitle>
          {training === null ? "Create" : "Edit"} training
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Training name"
            value={newTraining.name}
            onChange={(e): void =>
              setNewTraining({ ...newTraining, name: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <Select
            label="Status"
            value={newTraining.status}
            onChange={(e): void =>
              setNewTraining({
                ...newTraining,
                status: e.target.value as TrainingStatus,
              })
            }
            fullWidth
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="new">New</MenuItem>
            <MenuItem value="deprecated">Deprecated</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={isMessageVisible}
        autoHideDuration={3000}
        onClose={handleClose}
        // Mock data for happy case.
        // TODO: Message content will be based on request response.
        message={
          training === null
            ? "Training created successfully."
            : "Training updated successfully."
        }
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </>
  );
};

export default TrainingDialog;
