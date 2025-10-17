import { useState, type JSX } from "react";

interface NavTabsProps {
  titles: string[];
  components: JSX.Element[];
}

export default function NavTabs({ titles, components }: NavTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full">

      <div
        className="
          flex justify-between rounded-full p-1 mb-4
          bg-gray-200 
          dark:bg-secondary
          text-gray-700 
          dark:text-primary
        "
      >
        {titles.map((title, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`
              flex-1 text-center py-2 px-3 rounded-full text-sm font-medium transition-all duration-200
              ${
                activeIndex === index
                  ? `bg-blue-600 text-white shadow-sm 
                     dark:bg-primary dark:text-secondary`
                  : `hover:bg-gray-300 dark:hover:bg-gray-700`
              }
            `}
          >
            {title}
          </button>
        ))}
      </div>

      <div className="p-2">
        {components[activeIndex]}
      </div>
    </div>
  );
}
