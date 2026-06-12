import { createFileRoute } from "@tanstack/react-router";
import { CalculatorPage } from "@/components/eligibility/CalculatorPage";
import { caSinp } from "@/lib/eligibility/content/canada";
import { buildHead } from "@/lib/eligibility/seo";

export const Route = createFileRoute("/eligibility/canada/saskatchewan-sinp-calculator")({
  head: () => buildHead(caSinp),
  component: () => <CalculatorPage config={caSinp} />,
});
