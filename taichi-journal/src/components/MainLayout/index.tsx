"use client";
import { useRouter } from "next/navigation";
import { type JSX } from "react";
import styles from "./styles.module.css";
import { IconButton, Link, Tooltip } from "@mui/material/";
import HomeIcon from "@mui/icons-material/Home";
import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts";

interface Props {
  children: React.ReactNode;
}
const MainLayout = ({ children }: Props): JSX.Element => {
  const router = useRouter();
  const redirectHome = (): void => router.push("/");

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Tooltip title="Let's go home">
          <IconButton onClick={redirectHome}>
            <HomeIcon />
          </IconButton>
        </Tooltip>
        <h1 className={styles.headerText}>
          A very minimalistic taichi training journal
        </h1>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        Forgot the form names?
        <Link
          href="https://taiji.cz/portfolio-item/108-forem-taichi/#seznam-forem"
          target="_blank"
        >
          Check the list of forms
          <SportsMartialArtsIcon fontSize="inherit" />
        </Link>
      </footer>
    </div>
  );
};
export default MainLayout;
