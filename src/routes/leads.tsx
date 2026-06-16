import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import {
  LogOut,
  Search,
  RefreshCw,
  Mail,
  Phone,
  Globe2,
  Calendar as CalendarIcon,
  Users,
  X,
  Copy,
  Check,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  verifyLeadsToken,
  listLeads,
  updateLeadStatus,
  type Lead,
  type LeadStatus,
  type LeadSource,
} from "@/lib/leads.functions";

export const Route = createFileRoute("/leads")({
  head: () => ({
    meta: [
      { title: "Leads | 7 Wings CRM" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LeadsPage,
});

const STORAGE_KEY = "leads_admin_token";
const STATUSES: LeadStatus[] = ["new", "contacted", "qualified", "converted", "closed"];

function LeadsPage() {
  const [token, setToken] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);
  const [input, setInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const verify = useServerFn(verifyLeadsToken);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (!saved) {
      setChecking(false);
      return;
    }
    verify({ data: { token: saved } })
      .then(() => setToken(saved))
      .catch(() => localStorage.removeItem(STORAGE_KEY))
      .finally(() => setChecking(false));
  }, [verify]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setSubmitting(true);
    try {
      await verify({ data: { token: input.trim() } });
      localStorage.setItem(STORAGE_KEY, input.trim());
      setToken(input.trim());
      toast.success("Welcome");
    } catch {
      toast.error("Invalid password");
    } finally {
      setSubmitting(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen grid place-items-center bg-cream text-navy-deep">
        Loading…
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen grid place-items-center bg-cream p-6">
        <form
          onSubmit={onSubmit}
          className="w-full max-w-sm rounded-2xl bg-white border border-border shadow-elegant p-8 space-y-5"
        >
          <div className="space-y-1">
            <h1 className="font-display text-2xl text-navy-deep">7 Wings · Leads</h1>
            <p className="text-sm text-muted-foreground">
              Enter the leads admin password to continue.
            </p>
          </div>
          <Input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Password"
            autoFocus
          />
          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-gold hover:bg-gold-deep text-navy-deep"
          >
            {submitting ? "Checking…" : "Sign in"}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <LeadsDashboard
      token={token}
      onSignOut={() => {
        localStorage.removeItem(STORAGE_KEY);
        setToken(null);
        setInput("");
      }}
    />
  );
}

function LeadsDashboard({ token, onSignOut }: { token: string; onSignOut: () => void }) {
  const fetchLeads = useServerFn(listLeads);
  const updateStatus = useServerFn(updateLeadStatus);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState("");
  const [source, setSource] = useState<"all" | LeadSource>("all");
  const [status, setStatus] = useState<"all" | LeadStatus>("all");
  const [country, setCountry] = useState<string>("all");
  const [range, setRange] = useState<DateRange | undefined>();
  const [active, setActive] = useState<Lead | null>(null);

  const load = async (silent = false) => {
    if (silent) setRefreshing(true);
    else setLoading(true);
    try {
      const res = await fetchLeads({ data: { token } });
      setLeads(res.leads);
    } catch (e) {
      toast.error("Failed to load leads");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const countries = useMemo(() => {
    const s = new Set<string>();
    leads.forEach((l) => l.country && s.add(l.country));
    return Array.from(s).sort();
  }, [leads]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((l) => {
      if (source !== "all" && l.source !== source) return false;
      if (status !== "all" && l.status !== status) return false;
      if (country !== "all" && (l.country ?? "") !== country) return false;
      if (range?.from) {
        const d = new Date(l.createdAt);
        if (d < range.from) return false;
        if (range.to && d > new Date(range.to.getTime() + 24 * 60 * 60 * 1000 - 1)) return false;
      }
      if (q) {
        const hay = `${l.name} ${l.email} ${l.phone} ${l.country ?? ""} ${l.summary}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [leads, query, source, status, country, range]);

  const counts = useMemo(() => {
    const by: Record<string, number> = { total: leads.length, new: 0, contacted: 0, converted: 0 };
    leads.forEach((l) => {
      by[l.status] = (by[l.status] ?? 0) + 1;
    });
    return by;
  }, [leads]);

  const setLeadStatus = async (lead: Lead, next: LeadStatus) => {
    const prev = lead.status;
    setLeads((all) => all.map((l) => (l.id === lead.id ? { ...l, status: next } : l)));
    if (active?.id === lead.id) setActive({ ...lead, status: next });
    try {
      await updateStatus({ data: { token, id: lead.id, status: next } });
      toast.success(`Marked ${next}`);
    } catch {
      toast.error("Could not update status");
      setLeads((all) => all.map((l) => (l.id === lead.id ? { ...l, status: prev } : l)));
    }
  };

  return (
    <div className="min-h-screen bg-cream text-ink">
      {/* Header */}
      <header className="bg-navy-deep text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 flex flex-wrap items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-gold" />
            <div>
              <h1 className="font-display text-xl sm:text-2xl">7 Wings · Leads</h1>
              <p className="text-xs text-cream/70">
                {counts.total} total · {counts.new ?? 0} new · {counts.contacted ?? 0} contacted ·{" "}
                {counts.converted ?? 0} converted
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => load(true)}
              disabled={refreshing}
              className="bg-transparent border-cream/30 text-cream hover:bg-cream/10 hover:text-cream"
            >
              <RefreshCw className={`h-4 w-4 mr-1.5 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onSignOut}
              className="bg-transparent border-cream/30 text-cream hover:bg-cream/10 hover:text-cream"
            >
              <LogOut className="h-4 w-4 mr-1.5" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5">
        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto_auto]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, email, phone, country…"
              className="pl-9 bg-white"
            />
          </div>
          <Select value={source} onValueChange={(v) => setSource(v as "all" | LeadSource)}>
            <SelectTrigger className="bg-white w-full md:w-[160px]">
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All sources</SelectItem>
              <SelectItem value="contact">Contact form</SelectItem>
              <SelectItem value="consultation">Consultation</SelectItem>
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={(v) => setStatus(v as "all" | LeadStatus)}>
            <SelectTrigger className="bg-white w-full md:w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {STATUSES.map((s) => (
                <SelectItem key={s} value={s} className="capitalize">
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger className="bg-white w-full md:w-[170px]">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All countries</SelectItem>
              {countries.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DateRangeFilter range={range} onChange={setRange} />
        </div>
      </div>

      {/* Table */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-12">
        <div className="rounded-xl bg-white border border-border overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary text-navy-deep text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold w-10">#</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Source</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Phone</th>
                  <th className="px-4 py-3 font-semibold">Country</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-10 text-center text-muted-foreground">
                      Loading leads…
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-10 text-center text-muted-foreground">
                      No leads match your filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((l, i) => (
                    <tr
                      key={l.id}
                      onClick={() => setActive(l)}
                      className="border-t border-border hover:bg-secondary/60 cursor-pointer"
                    >
                      <td className="px-4 py-3 text-muted-foreground">{i + 1}</td>
                      <td className="px-4 py-3 font-medium text-navy-deep">{l.name}</td>
                      <td className="px-4 py-3">
                        <SourceBadge source={l.source} label={l.sourceLabel} />
                      </td>
                      <td className="px-4 py-3">
                        <CopyInline text={l.email} />
                      </td>
                      <td className="px-4 py-3">
                        <CopyInline text={l.phone} />
                      </td>
                      <td className="px-4 py-3">{l.country ?? "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                        {fmtDate(l.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={l.status} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Showing {filtered.length} of {leads.length} leads.
        </p>
      </div>

      {active && (
        <LeadDrawer lead={active} onClose={() => setActive(null)} onStatus={setLeadStatus} />
      )}
    </div>
  );
}

function DateRangeFilter({
  range,
  onChange,
}: {
  range: DateRange | undefined;
  onChange: (r: DateRange | undefined) => void;
}) {
  const label = range?.from
    ? range.to
      ? `${format(range.from, "MMM d")} – ${format(range.to, "MMM d")}`
      : format(range.from, "MMM d, yyyy")
    : "Any date";
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="bg-white justify-start font-normal w-full md:w-[220px]"
        >
          <CalendarIcon className="h-4 w-4 mr-2" />
          {label}
          {range?.from && (
            <X
              className="ml-auto h-4 w-4 opacity-60 hover:opacity-100"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onChange(undefined);
              }}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar mode="range" selected={range} onSelect={onChange} numberOfMonths={2} />
      </PopoverContent>
    </Popover>
  );
}

function StatusBadge({ status }: { status: LeadStatus }) {
  const styles: Record<LeadStatus, string> = {
    new: "bg-sky/15 text-sky border-sky/30",
    contacted: "bg-gold/20 text-gold-deep border-gold/40",
    qualified: "bg-purple-100 text-purple-700 border-purple-200",
    converted: "bg-success/15 text-success border-success/30",
    closed: "bg-muted text-muted-foreground border-border",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function SourceBadge({ source, label }: { source: LeadSource; label: string }) {
  const cls =
    source === "consultation"
      ? "bg-navy-deep text-cream"
      : "bg-gold-soft text-navy-deep border border-gold/40";
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${cls}`}>
      {label}
    </span>
  );
}

function CopyInline({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  if (!text) return <span className="text-muted-foreground">—</span>;
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        navigator.clipboard
          .writeText(text)
          .then(() => {
            setCopied(true);
            toast.success("Copied");
            setTimeout(() => setCopied(false), 1200);
          })
          .catch(() => toast.error("Could not copy"));
      }}
      className="inline-flex items-center gap-1.5 max-w-[220px] truncate text-left hover:text-navy-deep"
      title={text}
    >
      <span className="truncate">{text}</span>
      {copied ? (
        <Check className="h-3.5 w-3.5 text-success shrink-0" />
      ) : (
        <Copy className="h-3.5 w-3.5 opacity-50 shrink-0" />
      )}
    </button>
  );
}

function LeadDrawer({
  lead,
  onClose,
  onStatus,
}: {
  lead: Lead;
  onClose: () => void;
  onStatus: (l: Lead, s: LeadStatus) => void;
}) {
  const waPhone = lead.phone.replace(/[^\d+]/g, "").replace(/^\+/, "");
  const buildAll = () =>
    [
      `Lead: ${lead.name}`,
      `Source: ${lead.sourceLabel}`,
      `Status: ${lead.status}`,
      `Created: ${fmtDate(lead.createdAt)}`,
      "",
      ...lead.fields.map((f) => `${f.label}: ${f.value}`),
    ].join("\n");

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40" onClick={onClose} />
      <aside className="w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-border bg-navy-deep text-cream">
          <div>
            <div className="text-xs uppercase tracking-wide text-cream/70">
              {lead.sourceLabel}
            </div>
            <h2 className="font-display text-xl">{lead.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 hover:bg-cream/10"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 space-y-5 flex-1">
          <div className="space-y-2">
            <ContactRow icon={Mail} value={lead.email} href={`mailto:${lead.email}`} />
            <ContactRow icon={Phone} value={lead.phone} href={`tel:${lead.phone}`} />
            {lead.country && <ContactRow icon={Globe2} value={lead.country} />}
            <ContactRow icon={CalendarIcon} value={fmtDate(lead.createdAt)} />
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              Status
            </div>
            <div className="flex flex-wrap gap-2">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => onStatus(lead, s)}
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize border transition ${
                    lead.status === s
                      ? "bg-navy-deep text-cream border-navy-deep"
                      : "bg-white text-navy-deep border-border hover:border-navy-deep"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Submission
            </div>
            {lead.fields.map((f) => (
              <div
                key={f.label}
                className="rounded-lg border border-border bg-secondary/40 p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs font-medium text-muted-foreground">{f.label}</div>
                  {f.value && f.value !== "—" && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(f.value).then(
                          () => toast.success("Copied"),
                          () => toast.error("Could not copy"),
                        );
                      }}
                      className="text-xs text-muted-foreground hover:text-navy-deep inline-flex items-center gap-1"
                    >
                      <Copy className="h-3 w-3" /> Copy
                    </button>
                  )}
                </div>
                <div className="text-sm text-navy-deep mt-1 whitespace-pre-wrap break-words">
                  {f.value || "—"}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 border-t border-border bg-secondary/40 grid grid-cols-3 gap-2 sticky bottom-0">
          {waPhone && (
            <a
              href={`https://wa.me/${waPhone}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-md bg-success text-white text-sm font-medium px-3 py-2 hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          )}
          <a
            href={`mailto:${lead.email}`}
            className="inline-flex items-center justify-center gap-1.5 rounded-md bg-navy-deep text-cream text-sm font-medium px-3 py-2 hover:opacity-90"
          >
            <Mail className="h-4 w-4" /> Email
          </a>
          <button
            onClick={() => {
              navigator.clipboard.writeText(buildAll()).then(
                () => toast.success("Lead copied"),
                () => toast.error("Could not copy"),
              );
            }}
            className="inline-flex items-center justify-center gap-1.5 rounded-md bg-gold text-navy-deep text-sm font-medium px-3 py-2 hover:bg-gold-deep"
          >
            <Copy className="h-4 w-4" /> Copy all
          </button>
        </div>
      </aside>
    </div>
  );
}

function ContactRow({
  icon: Icon,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  href?: string;
}) {
  const content = (
    <span className="inline-flex items-center gap-2 text-sm text-navy-deep">
      <Icon className="h-4 w-4 text-gold-deep" />
      <span className="break-all">{value}</span>
    </span>
  );
  return (
    <div className="flex items-center justify-between gap-2">
      {href ? (
        <a href={href} className="hover:underline">
          {content}
        </a>
      ) : (
        content
      )}
      <button
        onClick={() =>
          navigator.clipboard.writeText(value).then(
            () => toast.success("Copied"),
            () => toast.error("Could not copy"),
          )
        }
        className="text-muted-foreground hover:text-navy-deep"
        aria-label="Copy"
      >
        <Copy className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function fmtDate(iso: string) {
  try {
    return format(new Date(iso), "MMM d, yyyy · h:mm a");
  } catch {
    return iso;
  }
}
