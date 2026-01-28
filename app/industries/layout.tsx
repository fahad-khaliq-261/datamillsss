import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries | Datamills",
  description: "Explore how Datamills helps clients across various industries with data and AI solutions.",
};

export default function IndustriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

