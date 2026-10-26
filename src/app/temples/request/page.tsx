import type { Metadata } from "next";
import RequestTemplePage from "@/components/temples/RequestTemplePage";

export const metadata: Metadata = {
  title: "Request a Temple",
  description:
    "Can't find your temple? Submit a request to add it to Brajmarg and help others connect with divine places.",
};

export default function Page() {
  return <RequestTemplePage />;
}
