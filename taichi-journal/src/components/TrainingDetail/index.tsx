"use client";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import TrainingDialog from "../TrainingDialog";
import StatusBadge from "../StatusBadge";
import TrainingDeleteDialog from "components/TrainingDeleteDialog";
import styles from "./styles.module.css";
import { Training } from "mockData";

interface Props {
  training: Training;
}

const TrainingDetail = ({ training }: Props) => {
  const [oneTraining, setOneTraining] = useState(training);
  const [isEditing, setIsEditing] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    // Setting training from mock data, workaround.
    // TODO: Set training from API endpoint or GraphQL based on its id
    setOneTraining(training);
  }, []);

  const handleEdit = (): void => {
    setIsEditing(true);
  };

  const handleDelete = (): void => {
    setIsDelete(true);
  };

  return (
    <div>
      <StatusBadge status={oneTraining.status}>
        <h2>{oneTraining.name}</h2>
      </StatusBadge>
      <p className={styles.statusText}>Status: {oneTraining.status}</p>
      <div className={styles.buttons}>
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="contained" color="primary" onClick={handleEdit}>
          Edit
        </Button>
      </div>
      <TrainingDialog
        isOpen={isEditing}
        onClose={(): void => setIsEditing(false)}
        training={oneTraining}
        onEdit={setOneTraining}
      />
      <TrainingDeleteDialog
        isOpen={isDelete}
        onClose={(): void => setIsDelete(false)}
        training={oneTraining}
      />
    </div>
  );
};

export default TrainingDetail;
