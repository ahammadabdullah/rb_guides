import { auth } from "@/auth";
import GuideCard from "@/components/home/guideCard";
import HomePage from "@/components/home/Home";
import prisma from "@/lib/db";

export default async function Home() {
  return (
    <main>
      <HomePage />
    </main>
  );
}
