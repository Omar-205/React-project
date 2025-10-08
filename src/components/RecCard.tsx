type RecCardProps = {
  given: number;
  statement: string;
  icon: JSX.Element;
};

export default function RecCard({ given, statement, icon }: RecCardProps) {
 return (
    <div className="bg-menu-white dark:bg-primary-dark
      border-light-border dark:border-transparent
      border-1 rounded-lg p-6 flex flex-row gap-4 align-center  h-full"
    >
      <div className="text-xl self-center">{icon}</div>
      <div className="flex flex-col">
        <p className="font-bold  text-2xl  text-black dark:text-white">{given}</p>
        <p className="dark:text-text-dark">{statement}</p>
      </div>
    </div>
  );

}
