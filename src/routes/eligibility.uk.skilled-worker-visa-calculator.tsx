import { createFileRoute } from "@tanstack/react-router";
import { CalculatorPage } from "@/components/eligibility/CalculatorPage";
import { ukSkilledWorkerVisa } from "@/lib/eligibility/content/uk-skilled-worker-visa";
import { buildHead } from "@/lib/eligibility/seo";

export const Route = createFileRoute("/eligibility/uk/skilled-worker-visa-calculator")({
  head: () => buildHead(ukSkilledWorkerVisa),
  component: () => <CalculatorPage config={ukSkilledWorkerVisa} />,
});
