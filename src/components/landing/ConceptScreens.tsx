import type { ReactNode } from "react";
import { Icon } from "@/components/icons";

interface Concept {
  icon: string;
  name: string;
  description: string;
  mock: ReactNode;
}

function MockChrome() {
  return (
    <div className="flex items-center gap-1.5 border-b border-white/10 bg-surface/80 px-4 py-2.5">
      <span className="h-2 w-2 rounded-full bg-white/15" />
      <span className="h-2 w-2 rounded-full bg-white/15" />
      <span className="h-2 w-2 rounded-full bg-white/15" />
      <span className="ml-3 flex h-5 flex-1 items-center rounded-md bg-elevated px-2 text-[10px] text-ash">
        policyadda.in
      </span>
    </div>
  );
}

function MockStat({ label, value, width }: { label: string; value: string; width: string }) {
  return (
    <div>
      <p className="text-[10px] text-ash">{label}</p>
      <p className="text-sm font-semibold text-ivory">{value}</p>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-elevated">
        <div className={`h-full rounded-full bg-cobalt ${width}`} />
      </div>
    </div>
  );
}

const concepts: Concept[] = [
  {
    icon: "dashboard",
    name: "Dashboard",
    description: "All your policies, renewals and claims in one calm place.",
    mock: (
      <div className="grid grid-cols-2 gap-3">
        <MockStat label="Active policies" value="4" width="w-3/4" />
        <MockStat label="Next renewal" value="18 Sep" width="w-1/2" />
        <MockStat label="Premium saved" value="₹41,200" width="w-3/5" />
        <MockStat label="Claims open" value="0" width="w-1" />
      </div>
    ),
  },
  {
    icon: "shield-check",
    name: "Claims Tracking",
    description: "Live status of every claim, updated by your advisor in real time.",
    mock: (
      <ol className="flex flex-col gap-2.5">
        {["Intimated", "Documents", "Surveyor", "Settlement"].map((step, i) => (
          <li key={step} className="flex items-center gap-2.5">
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                i < 3 ? "bg-cobalt/20 text-cobalt" : "bg-elevated text-ash"
              }`}
            >
              <Icon name="check" size={11} />
            </span>
            <span className="flex-1 text-[11px] text-ash">{step}</span>
            <span className="rounded-full bg-cobalt/15 px-2 py-0.5 text-[9px] font-medium text-cobalt">
              {i === 3 ? "In progress" : "Done"}
            </span>
          </li>
        ))}
      </ol>
    ),
  },
  {
    icon: "user-check",
    name: "Advisor Profile",
    description: "Your named advisor&rsquo;s face, number and specialisation — always one tap away.",
    mock: (
      <div className="flex items-center gap-3.5">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cobalt to-cobalt/70 text-sm font-semibold text-white">
          PS
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-ivory">Priya Sinha</p>
          <p className="text-[11px] text-ash">Senior Advisor · Motor & Health</p>
        </div>
        <span className="availability-dot" />
      </div>
    ),
  },
  {
    icon: "calendar",
    name: "Renewal Timeline",
    description: "A 12-month view of everything expiring — no more missed renewals.",
    mock: (
      <div className="flex items-end justify-between gap-2">
        {["A", "S", "O", "N", "D", "J", "F", "M", "A", "M", "J", "J"].map((m, i, arr) => (
          <span
            key={`${m}${i}`}
            className={`h-4 w-full rounded-sm ${
              i === arr.length - 1
                ? "bg-cobalt"
                : i === 0
                  ? "bg-amber-400/50"
                  : "bg-elevated"
            }`}
            title={m}
          />
        ))}
      </div>
    ),
  },
  {
    icon: "chat",
    name: "WhatsApp Support",
    description: "Chat with your advisor on WhatsApp — documents, updates, and reminders.",
    mock: (
      <div className="flex flex-col gap-2.5">
        <span className="self-start rounded-xl rounded-bl-sm bg-elevated px-3 py-2 text-[11px] text-ash">
          Your car policy renews on the 24th. Want a quote?
        </span>
        <span className="self-end rounded-xl rounded-br-sm bg-cobalt/20 px-3 py-2 text-[11px] text-ivory">
          Yes please, send options in Hindi!
        </span>
        <span className="self-start flex items-center gap-1.5 rounded-xl rounded-bl-sm bg-elevated px-3 py-2 text-[11px] text-ash">
          <Icon name="check-circle" size={12} className="text-cobalt" />
          Sharing 3 plans now...
        </span>
      </div>
    ),
  },
  {
    icon: "clipboard-list",
    name: "Roadmap",
    description: "Loans, renewal nudges, and more — the Adda keeps getting better.",
    mock: (
      <div className="flex flex-col gap-2.5">
        {[
          { label: "Loan advisory", tone: "bg-cobalt/20 text-cobalt" },
          { label: "Renewal nudges", tone: "bg-cobalt/20 text-cobalt" },
          { label: "Family dashboard", tone: "bg-elevated text-ash" },
          { label: "Paperless claims", tone: "bg-elevated text-ash" },
        ].map((item) => (
          <span
            key={item.label}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[11px] font-medium ${item.tone}`}
          >
            <Icon name="spark" size={12} />
            {item.label}
          </span>
        ))}
      </div>
    ),
  },
];

export function ConceptScreens() {
  return (
    <section className="py-20">
      <div className="container-page">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <p className="eyebrow">On the horizon</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ivory sm:text-4xl">
            The Adda, meet the app
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ash">
            The same relationship, digitised. Here&rsquo;s a peek at what&rsquo;s being built for members.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {concepts.map((concept) => (
            <article
              key={concept.name}
              className="card-raised card-hover flex flex-col gap-4 overflow-hidden"
            >
              <MockChrome />
              <div className="flex flex-col gap-4 p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cobalt/15 text-cobalt">
                    <Icon name={concept.icon} size={19} />
                  </span>
                  <h3 className="font-semibold text-ivory">{concept.name}</h3>
                  <span className="ml-auto rounded-full bg-elevated px-2.5 py-1 text-[10px] font-semibold text-ash ring-1 ring-white/10">
                    Coming soon
                  </span>
                </div>
                <div className="rounded-xl border border-white/10 bg-surface/70 p-4">
                  {concept.mock}
                </div>
                <p className="text-sm leading-relaxed text-ash">{concept.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}