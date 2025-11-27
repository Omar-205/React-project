import * as LucideIcons from "lucide-react";

interface LandingCardProps {
  icon?: string;         
  title?: string;
  description?: string;
}

function LandingCard({ icon , title, description }: LandingCardProps) {
  const IconComponent = icon ? (LucideIcons as any)[icon] : null; 

  return (
    <div className="
    border-text border p-6 rounded-lg shadow-lg bg-white 
    w-full 
    flex flex-col items-start gap-4 
    dark:bg-secondary-dark
  ">
    {IconComponent ? (
      <IconComponent className="w-6 h-6 text-black dark:text-text-dark" />
    ) : null}
  
    <h3 className="font-bold text-lg dark:text-text-dark">{title}</h3>
  
    <p className="text-gray-600 text-sm dark:text-text-secondary-dark">
      {description}
    </p>
  </div>
  
  );
}

export default LandingCard;
