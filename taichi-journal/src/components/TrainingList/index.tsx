"use client";
import { type JSX } from "react";
import { useState, useEffect } from "react";
import { Button, List, ListItem, ListItemText } from "@mui/material";
import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts";
import TrainingDialog from "../TrainingDialog";
import StatusBadge from "../StatusBadge";
import Link from "next/link";
import { Training, mockData } from "mockData";
import styles from "./styles.module.css";

const TrainingList = (): JSX.Element => {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Setting trainings from mock data
    // TODO: Fetch data trainings from API endpoints or GraphQL
    setTrainings(mockData);
  }, []);

  const handleCreate = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleCreate}>
        Add a new training
      </Button>
      <List>
        {trainings.map((training, index) => (
          <ListItem key={index}>
            <SportsMartialArtsIcon />
            <StatusBadge status={training.status}>
              {/* TODO: Very dirty workaround! Ask backend to add id to the training. */}
              <Link href={`/trainings/${index}`}>
                <ListItemText primary={training.name} />
                <p className={styles.statusText}>Status: {training.status}</p>
              </Link>
            </StatusBadge>
          </ListItem>
        ))}
      </List>
      <TrainingDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        training={null}
      />
    </>
  );
};

export default TrainingList;
