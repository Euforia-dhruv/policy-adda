import { Icon } from "@/components/icons";
import { Counter } from "@/components/landing/Counter";

const stats = [
  { value: 9, suffix: "+", label: "Branch offices", note: "Jharkhand · Bihar · Noida" },
  { value: 12, suffix: "+", label: "Insurer partners", note: "Compare & choose side by side" },
  { value: 7, suffix: "+", label: "Years of experience", note: "Trusted since 2018" },
  { value: 90, suffix: "%", label: "Customer service satisfaction", note: "Thousands of happy clients" },
];

export function TrustBar() {
  return (
    <section className="py-16">
      <div className="container-page">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <Counter
                value={stat.value}
                suffix={stat.suffix}
                className="font-heading text-4xl font-semibold tracking-tight text-ivory sm:text-5xl"
              />
              <p className="mt-2 text-sm font-medium text-ivory">{stat.label}</p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-ash">
                <Icon name="check" size={12} className="text-cobalt" />
                {stat.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}