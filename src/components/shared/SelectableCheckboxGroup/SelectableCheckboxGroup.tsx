import React from "react";

type Option = {
  value: string;
  label: string;
};

type SelectableCheckboxGroupProps = {
  options: Option[];
  label: string;
  value: string[];
  onChange: (selected: string[]) => void;
  props?: React.InputHTMLAttributes<HTMLInputElement>;
  optional?: boolean;
};

export default function SelectableCheckboxGroup({
  options,
  label,
  value,
  onChange,
  optional,
  ...props
}: SelectableCheckboxGroupProps) {
  const [expanded, setExpanded] = React.useState(false);

  const handleToggle = () => {
    if (!expanded) {
      setExpanded(true);
    } else if (value.length === 0) {
      setExpanded(false);
    }
  };

  const handleCheckboxChange = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  return (
    <div className="flex md:items-center flex-col md:flex-row gap-6 text-2xl">
      <div className="flex items-center cursor-pointer " onClick={handleToggle}>
        <span
          className={`border-b-[1.5px] py-2 flex gap-2  ${
            expanded || value.length > 0
              ? "text-primary border-primary "
              : "text-black border-black "
          } `}
        >
          {label} {optional && <div className="text-gray"> ( إختياري )</div>}
        </span>
      </div>
      {expanded && (
        <div className="flex gap-6 md:items-center flex-wrap md:flex-row flex-col">
          {options.map((opt) => (
            <label
              key={opt.value}
              className={`flex items-center cursor-pointer gap-2 ${
                value.includes(opt.value)
                  ? "font-bold text-[#f06423]"
                  : "font-semibold text-black"
              }`}
            >
              <input
                type="checkbox"
                checked={value.includes(opt.value)}
                onChange={() => handleCheckboxChange(opt.value)}
                className="h-6 w-6 appearance-none border-black border-[2.5px] rounded-[7px] checked:border-primary"
                {...props}
              />
              {opt.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
