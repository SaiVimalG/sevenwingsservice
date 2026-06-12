import { createFileRoute } from "@tanstack/react-router";
import { CalculatorPage } from "@/components/eligibility/CalculatorPage";
import { germanyOpportunityCard } from "@/lib/eligibility/content/germany-opportunity-card";
import { buildHead } from "@/lib/eligibility/seo";

export const Route = createFileRoute("/eligibility/germany/opportunity-card-calculator")({
  head: () => buildHead(germanyOpportunityCard),
  component: () => <CalculatorPage config={germanyOpportunityCard} />,
});
