import * as LucideIcons from "lucide-react";

interface LandingCardProps {
  icon?: string;         
  title?: string;
  description?: string;
}

function LandingCard({ icon , title, description }: LandingCardProps) {
  const IconComponent = icon ? (LucideIcons as any)[icon] : null; 

  return (
    <div className="border-text border p-6 rounded-lg shadow-lg bg-white w-[240px]  flex flex-col items-start gap-4">
      {IconComponent ? <IconComponent className="w-6 h-6 text-black" /> : null}
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

export default LandingCard;
