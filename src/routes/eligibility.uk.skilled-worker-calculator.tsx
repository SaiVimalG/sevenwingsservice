import { createFileRoute, redirect } from "@tanstack/react-router";

// Old duplicate URL — permanently points to the main UK Skilled Worker calculator.
export const Route = createFileRoute("/eligibility/uk/skilled-worker-calculator")({
  beforeLoad: () => {
    throw redirect({ to: "/eligibility/uk/skilled-worker-visa-calculator", statusCode: 301 });
  },
});
