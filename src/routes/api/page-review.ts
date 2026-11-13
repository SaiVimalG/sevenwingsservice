import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/page-review")({
  server: { handlers: { POST: async ({ request }) => {
    const { handlePageReview } = await import("@/lib/page-review.server");
    return handlePageReview(request);
  } } },
});