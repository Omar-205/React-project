interface SelectionCardProps {
  label: string;
  image: string;
  selected?: boolean;
  onSelect: () => void;
}

function SelectionCard({ label, image, selected, onSelect }: SelectionCardProps) {
  return (
      <div
          onClick={onSelect}
          className={`flex flex-col items-center justify-center 
              p-4 sm:p-6 
              w-full max-w-[180px] sm:max-w-[200px] md:max-w-[220px] 
              aspect-[3/4] 
              rounded-3xl cursor-pointer 
              transition-all bg-secondary
              dark:bg-text-dark
              ${selected ? "ring-4 ring-primary scale-105 dark:ring-primary" : "ring-1 ring-text-dark"}
          `}
      >
          <img
              src={image}
              alt={label}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-30 md:h-30 object-contain mb-4 sm:mb-6"
          />

          {/* FIXED HEIGHT TEXT CONTAINER */}
<div className="flex flex-col items-center justify-start text-center text-primary min-h-[50px]">
  <p className="text-sm sm:text-base md:text-lg font-medium">
    {label}
  </p>

  {label === "Trainer" && (
    <p className="text-xs sm:text-sm md:text-base font-medium opacity-70">
      (Coming Soon)
    </p>
  )}
</div>

      </div>
  );
}

export default SelectionCard;
