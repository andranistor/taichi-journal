"use client";
import { usePathname, useRouter } from "next/navigation";
import TrainingDetail from "../../../components/TrainingDetail";
import MainLayout from "components/MainLayout";
import { mockData } from "mockData";

const TrainingPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const redirectHome = (): void => router.push("/");

  if (id === undefined) {
    redirectHome();
  }

  // This is only for the purpose of using mock data
  const training = mockData[Number(id)];

  return (
    <MainLayout>
      <TrainingDetail training={training} />
    </MainLayout>
  );
};

export default TrainingPage;
