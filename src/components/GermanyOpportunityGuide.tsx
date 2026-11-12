import { InternalLink, RelatedLinks } from "@/components/RelatedLinks";
import { GERMANY_ARTICLES, GERMANY_OPPORTUNITY as rules } from "@/lib/germany-opportunity";

export function GermanyOpportunityGuide({ local = false }: { local?: boolean }) {
  return (
    <>
      <section id="eligibility" className="scroll-mt-28">
        <p className="text-xs font-semibold uppercase tracking-wide text-gold-deep">Chancenkarte · {rules.year} requirements</p>
        <h2 className="mt-2 font-display text-2xl font-bold text-navy-deep md:text-3xl">
          Who can apply for the Germany Opportunity Card?
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
          Indian applicants can use one of two routes. A job offer is not required, but you must meet the qualification requirements and show that you can support your stay.
        </p>
        <dl className="mt-6 divide-y divide-border border-y border-border">
          <div className="py-5">
            <dt className="font-semibold text-navy-deep">Route 1 — fully recognised qualification</dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
              A qualification fully recognised in Germany, or a qualifying German degree or vocational qualification, can let you apply as a skilled worker without the points test. The points-route language minimum does not apply, although German helps with job searching.
            </dd>
          </div>
          <div className="py-5">
            <dt className="font-semibold text-navy-deep">Route 2 — at least {rules.minimumPoints} points plus basic requirements</dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
              You need an academic qualification recognised in the country where it was obtained, or a state-recognised vocational qualification involving at least two years of training, and at least A1 German or B2 English. Points can come from recognition, experience, language, age and other qualifying factors.
            </dd>
          </div>
        </dl>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Use the <InternalLink to="/eligibility/germany/opportunity-card-calculator">Opportunity Card points calculator</InternalLink> for an initial assessment.
          {" "}Then search the <InternalLink to="/germany/shortage-occupations">Germany shortage occupation list</InternalLink> to see whether your qualification may qualify for the shortage-occupation point. A matching job title alone does not establish eligibility or guarantee a job.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          For {rules.year}, the official financial requirement is €{rules.monthlyFundsEUR.toLocaleString("en-US")} net per month, typically shown through a blocked account or a declaration of commitment. The initial job-search stay is up to {rules.maximumSearchMonths} months, with part-time work up to {rules.weeklyWorkHours} hours per week. Check the current mission checklist before applying.
        </p>
        <a href={rules.officialUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-navy-deep underline decoration-gold underline-offset-4">
          Official requirements: Make it in Germany
        </a>
      </section>

      <section id="documents" className="mt-10 scroll-mt-28 border-t border-border pt-8">
        <h2 className="font-display text-2xl font-bold text-navy-deep md:text-3xl">
          {local ? "What to bring to your Hyderabad consultation" : "Documents to prepare before applying"}
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>Passport, current CV, degree or vocational certificates, and transcripts.</li>
          <li>Qualification evidence: relevant ANABIN results, ZAB assessment or vocational evidence, depending on your route.</li>
          <li>Language certificates and employment letters supporting any claimed points.</li>
          <li>Evidence of funds and suitable health insurance for the visa application.</li>
          <li>Evidence for any additional points you claim, such as a previous qualifying stay in Germany or an eligible partner applying with you.</li>
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {local
            ? "Bring your calculator result and available documents to our HITEC City, Madhapur office. We can review missing evidence and discuss recognition, funds and submission preparation; you do not need to have a complete file for the initial consultation."
            : "Our team reviews your route, qualification evidence and application checklist before filing. For in-person help, visit our "}
          {!local && <><InternalLink to="/germany-opportunity-card-hyderabad">Germany Opportunity Card consultants in Hyderabad</InternalLink>.</>}
          {" "}The German authorities decide visa applications; an assessment score is not a visa approval. Processing times depend on the mission, appointment availability and your documents.
        </p>
      </section>
    </>
  );
}

export function GermanyArticleLinks() {
  return (
    <section id="germany-articles" className="mt-10 scroll-mt-28 border-t border-border pt-8">
      <h2 className="font-display text-2xl font-bold text-navy-deep md:text-3xl">Germany articles for your next step</h2>
      <RelatedLinks title="" links={GERMANY_ARTICLES} variant="compact" className="mt-5" />
    </section>
  );
}