import { createFileRoute } from "@tanstack/react-router";
import { CalculatorPage } from "@/components/eligibility/CalculatorPage";
import { au491 } from "@/lib/eligibility/content/australia";
import { buildHead } from "@/lib/eligibility/seo";

export const Route = createFileRoute("/eligibility/australia/491-points-calculator")({
  head: () => buildHead(au491),
  component: () => <CalculatorPage config={au491} />,
});
