import { Ban } from "lucide-react";

interface iAppProps {
  title: string;
  description: string;
  buttonText?: string;
  href?: string;
}

export default function EmptyState({
  title,
  description,
  buttonText,
  href,
}: iAppProps) {
  return (
    <div className="p-4 my-4 w-full flex flex-1 flex-col justify-center border border-muted h-full items-center border-dashed rounded-md animate-in fade-in-20 ">
      <div className="space-y-4 flex flex-col items-center">
        <Ban className="size-10 text-primary" />
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
