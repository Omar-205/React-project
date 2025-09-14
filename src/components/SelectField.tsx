

interface SelectFieldProps {
    select: string;
    id: string;
    options: string[];
    onchange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
function SelectField({select,options,id,onchange}:SelectFieldProps) {
    return(
    <div className="mb-4 w-full">
    <label htmlFor="" className="label">
      Gender
    </label>
    <select id={id} className="bg-input text-sm h-15 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={onchange}>
        <option className="text-text  " style={{ color: "red" }} selected disabled>{select}</option>
        {options.map((option) => <option key={option} className="text-gray-900" value={option}>{option}</option>)}
      </select>
      </div>
    )
}

export default SelectField;