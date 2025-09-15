

interface SelectFieldProps {
    name?: string;
    select: string;
    id: string;
    options: string[];
    onchange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
function SelectField({select,options,id,name,onchange}:SelectFieldProps) {
    return(
    <div className="mb-4 w-full">
    <label htmlFor="" className="label">
      {name}
    </label>
    <select id={id} className="bg-input rounded-lg border border-text-dark block p-2.5 pr-10
          text-text
          text-md
          font-thin
          dark:bg-input-dark dark:border-gray-600 
          dark:text-text-dark
          dark:placeholder:text-text-dark
          w-full
          h-15" onChange={onchange}>
        <option className=""  selected disabled>{select}</option>
        {options.map((option) => <option key={option}  value={option}>{option}</option>)}
      </select>
      </div>
    )
}

export default SelectField;