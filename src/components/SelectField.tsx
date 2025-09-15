

interface SelectFieldProps {
  name?: string;
  select: string;
  id: string;
  options: string[];
  error?: string;
  onchange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
function SelectField({ select, options, id, name,error, onchange }: SelectFieldProps) {
  return (
    <div className="mb-4 w-full">
      <label htmlFor="" className="label">
        {name}
      </label>
      <select id={id} className={`bg-input rounded-lg  block p-2.5 pr-10
          text-text
          text-md
          font-thin
          dark:bg-input-dark dark:border-
          dark:text-text-dark
          dark:placeholder:text-text-dark
          w-full
          h-15 
           ${error ? "border-1 border-error ring-error" : "border border-text-dark focus:border-primary dark:focus:border-primary "}
          `} onChange={onchange}>
        <option className="" selected disabled>{select}</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </div>
  )
}

export default SelectField;