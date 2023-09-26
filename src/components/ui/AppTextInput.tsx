import { useController, UseControllerProps } from "react-hook-form";

interface props extends UseControllerProps {
  label?: string;
  placeholder?: string;
  type: string;
  id: string;
  minLenght?: number;
  maxLength?: number;
  pattern?: string;
  className?: string;
  hidden?: boolean;
}

function AppTextInput(props: props) {
  const { fieldState, field } = useController({ ...props, defaultValue: "" });
  const {
    label,
    placeholder,
    type,
    id,
    minLenght,
    maxLength,
    className,
    hidden,
  } = props;
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        hidden={hidden}
        {...field}
        className={`${
          className && className
        } bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        placeholder={placeholder}
        minLength={minLenght}
        maxLength={maxLength}
      />
      {fieldState.error && (
        <span className="text-sm text-red-500">{fieldState.error.message}</span>
      )}
    </div>
  );
}

export default AppTextInput;
