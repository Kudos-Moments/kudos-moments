import { Button } from "@/components/ui/Button";

export function CTASection({ headline }: { headline: string }) {
  return (
    <section className="bg-accent/8 py-20 text-center">
      <div className="mx-auto max-w-2xl px-5">
        <h2 className="font-serif text-[28px] md:text-[34px] text-text-primary">{headline}</h2>
        <div className="mt-6">
          <Button href="/create" size="lg">
            Create a Birthday Page
          </Button>
        </div>
      </div>
    </section>
  );
}
