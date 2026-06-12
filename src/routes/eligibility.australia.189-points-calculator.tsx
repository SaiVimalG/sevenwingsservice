import { createFileRoute } from "@tanstack/react-router";
import { CalculatorPage } from "@/components/eligibility/CalculatorPage";
import { au189 } from "@/lib/eligibility/content/australia";
import { buildHead } from "@/lib/eligibility/seo";

export const Route = createFileRoute("/eligibility/australia/189-points-calculator")({
  head: () => buildHead(au189),
  component: () => <CalculatorPage config={au189} />,
});
