import { Icon } from "@/components/icons";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section className="py-20">
      <div className="container-page">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <p className="eyebrow">Word of mouth</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ivory sm:text-4xl">
            Stories from the Adda
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ash">
            Real claim settlements, real renewals, real neighbours who found a policy they
            actually understood.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="card-raised card-hover flex flex-col gap-5 p-7"
            >
              <Icon name="quote" size={22} className="text-cobalt" />
              <blockquote className="text-sm leading-relaxed text-ash">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 border-t border-white/10 pt-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elevated text-sm font-semibold text-ivory ring-1 ring-white/10">
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-medium text-ivory">{t.clientType}</p>
                  <p className="flex items-center gap-1 text-xs text-ash">
                    <Icon name="pin" size={12} className="text-cobalt" />
                    {t.location}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}