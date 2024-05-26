import React, { ReactElement, forwardRef } from "react";

type InputProps = {
  type: "text" | "number" | "email" | "password";
  placeholder: string;
  icon: ReactElement;
  errors: string | undefined;
} & React.InputHTMLAttributes<HTMLInputElement>;;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, icon, errors, ...rest }, ref) => {
    return (
      <div>
        <div className="w-full my-3 flex items-center gap-2 border rounded-md p-2">
          <p className="text-gray-400">{icon}</p>
          <input
            className="outline-none text-gray-600"
            type={type}
            placeholder={placeholder}
            {...rest}
            ref={ref}
          />
        </div>
        <p className="text-red-600 text-sm">{errors}</p>
      </div>
    );
  }
);

export default Input;
