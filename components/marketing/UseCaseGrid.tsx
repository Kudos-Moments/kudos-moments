import { Card } from "@/components/ui/Card";

export interface UseCase {
  lead: string;
  body: string;
}

export function UseCaseGrid({ items }: { items: UseCase[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {items.map((item) => (
        <Card key={item.lead} interactive className="p-6">
          <p className="text-[15px] leading-[1.6] text-text-primary">
            <span className="font-semibold">{item.lead}</span> {item.body}
          </p>
        </Card>
      ))}
    </div>
  );
}
