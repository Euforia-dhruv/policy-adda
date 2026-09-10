import { Icon } from "@/components/icons";
import { advisors } from "@/data/advisors";

export function MeetYourAdvisor() {
  return (
    <section id="advisors" className="scroll-mt-28 py-20">
      <div className="container-page">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <p className="eyebrow">Meet your advisor</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ivory sm:text-4xl">
            A real person, not a call centre
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ash">
            Every Policy Adda customer gets a named advisor who speaks your language, knows
            your policy, and stays around until the claim is settled.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {advisors.map((advisor) => (
            <div
              key={advisor.id}
              className="card-raised card-hover flex flex-col gap-4 p-6"
            >
              <div className="flex items-center gap-3.5">
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold text-white ${advisor.accent}`}
                >
                  {advisor.initials}
                </span>
                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-ivory">{advisor.name}</h3>
                  <p className="text-xs text-ash">{advisor.role}</p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-ash">
                {advisor.specialization}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {advisor.languages.map((lang) => (
                  <span
                    key={lang}
                    className="rounded-full bg-elevated px-2.5 py-1 text-[11px] font-medium text-ash ring-1 ring-white/10"
                  >
                    {lang}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4 text-xs text-ash">
                <span>
                  <Icon name="clock" size={13} className="mr-1.5 inline text-cobalt" />
                  {advisor.experience}
                </span>
                <span>
                  <Icon name="pin" size={13} className="mr-1.5 inline text-cobalt" />
                  {advisor.city}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}