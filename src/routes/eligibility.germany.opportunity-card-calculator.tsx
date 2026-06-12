import { createFileRoute } from "@tanstack/react-router";
import { CalculatorPage } from "@/components/eligibility/CalculatorPage";
import { deOpportunityCard } from "@/lib/eligibility/content/germany-uk";
import { buildHead } from "@/lib/eligibility/seo";

export const Route = createFileRoute("/eligibility/germany/opportunity-card-calculator")({
  head: () => buildHead(deOpportunityCard),
  component: () => <CalculatorPage config={deOpportunityCard} />,
});
