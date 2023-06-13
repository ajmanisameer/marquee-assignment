interface InputProps {
  placeholder?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  name?: string;
  required?: true; // Added required prop
}

const TodoInput: React.FC<InputProps> = ({ placeholder, value, type = "text", required, onChange, disabled, label }) => {
  return (
    <div className="w-full">
      {label && <p className="text-xl text-white font-semibold mb-2">{label}</p>}
      <input
        disabled={disabled}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type={type}
        className="
block w-full p-4 pl-10 text-sm text-stone-950 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500
         
        "
        required={required}
      />
    </div>
   );
}
 
export default TodoInput;