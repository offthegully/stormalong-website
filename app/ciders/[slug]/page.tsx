import { notFound } from "next/navigation";
import { ciders } from "@/data/ciders";
import CiderDetailClient from "./cider-detail-client";

export default async function CiderDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Find the cider by slug
  const cider = ciders.find((c) => c.slug === slug);

  // If cider not found, redirect to 404 page
  if (!cider) {
    notFound();
  }

  // Find current cider index and adjacent ciders for navigation
  const currentIndex = ciders.findIndex((c) => c.slug === slug);
  const prevCider =
    currentIndex > 0 ? ciders[currentIndex - 1] : ciders[ciders.length - 1];
  const nextCider =
    currentIndex < ciders.length - 1 ? ciders[currentIndex + 1] : ciders[0];

  return (
    <CiderDetailClient
      cider={cider}
      prevCider={prevCider}
      nextCider={nextCider}
      allCiders={ciders}
    />
  );
}
