import { createFileRoute } from "@tanstack/react-router";
import { CalculatorPage } from "@/components/eligibility/CalculatorPage";
import { caQswp } from "@/lib/eligibility/content/canada";
import { buildHead } from "@/lib/eligibility/seo";

export const Route = createFileRoute("/eligibility/canada/quebec-skilled-worker-program")({
  head: () => buildHead(caQswp),
  component: () => <CalculatorPage config={caQswp} />,
});
