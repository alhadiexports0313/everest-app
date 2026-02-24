import type { Metadata } from "next";

import EnvironmentalRespectClient from "./EnvironmentalRespectClient";

export const metadata: Metadata = {
  title: "Environmental Respect | Everest Organic Shilajit",
  description:
    "Ethical sourcing, sustainable harvesting, eco-friendly packaging, and community support standards behind Everest Organic Shilajit.",
};

export default function EnvironmentalRespectPage() {
  return <EnvironmentalRespectClient />;
}
