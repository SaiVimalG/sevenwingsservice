import { createFileRoute } from "@tanstack/react-router";
import { CalculatorPage } from "@/components/eligibility/CalculatorPage";
import { au190 } from "@/lib/eligibility/content/australia";
import { buildHead } from "@/lib/eligibility/seo";

export const Route = createFileRoute("/eligibility/australia/190-points-calculator")({
  head: () => buildHead(au190),
  component: () => <CalculatorPage config={au190} />,
});
