import { Metadata } from "next";
import LandingPage from "./LandingPage";

export const metadata: Metadata = {
  title: "Standard Webhooks",
};

export default function Home() {
  return (
    <main>
      <LandingPage />
    </main>
  );
}
