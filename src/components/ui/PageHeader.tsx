import { Badge } from "@/components/ui/Badge";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  intro: string;
};

export function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-24">
      <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(37,99,235,0.35),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(124,58,237,0.22),transparent_28%)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Badge className="border-cyan-300/30 bg-cyan-300/10 text-cyan-100">
            {eyebrow}
          </Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-normal sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-200">{intro}</p>
        </div>
      </div>
    </header>
  );
}
