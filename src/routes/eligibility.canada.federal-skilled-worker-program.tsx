import { createFileRoute } from "@tanstack/react-router";
import { CalculatorPage } from "@/components/eligibility/CalculatorPage";
import { caFswp } from "@/lib/eligibility/content/canada";
import { buildHead } from "@/lib/eligibility/seo";

export const Route = createFileRoute("/eligibility/canada/federal-skilled-worker-program")({
  head: () => buildHead(caFswp),
  component: () => <CalculatorPage config={caFswp} />,
});
