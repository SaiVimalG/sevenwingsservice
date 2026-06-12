import { createFileRoute } from "@tanstack/react-router";
import { CalculatorPage } from "@/components/eligibility/CalculatorPage";
import { ukSkilledWorker } from "@/lib/eligibility/content/germany-uk";
import { buildHead } from "@/lib/eligibility/seo";

export const Route = createFileRoute("/eligibility/uk/skilled-worker-calculator")({
  head: () => buildHead(ukSkilledWorker),
  component: () => <CalculatorPage config={ukSkilledWorker} />,
});
