export interface Training {
  name: string;
  status: TrainingStatus;
}

export type TrainingStatus = "none" | "new" | "deprecated";

export const mockData: Training[] = [
  { name: "Bílá labuť rozvírá křídla", status: "deprecated" },
  { name: "Kop levou nohou", status: "new" },
  { name: "Ustoupit a překročit tygra", status: "none" },
  { name: "Sestava Ruce jako oblaka", status: "new" },
  { name: "Prvních pět forem", status: "deprecated" },
];
