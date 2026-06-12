import { createFileRoute } from "@tanstack/react-router";
import { CalculatorPage } from "@/components/eligibility/CalculatorPage";
import { caCrs } from "@/lib/eligibility/content/canada";
import { buildHead } from "@/lib/eligibility/seo";

export const Route = createFileRoute("/eligibility/canada/crs-calculator")({
  head: () => buildHead(caCrs),
  component: () => <CalculatorPage config={caCrs} />,
});
