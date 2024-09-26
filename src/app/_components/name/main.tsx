import React, { useState, useEffect } from 'react';

interface NameProps {
    onChange: (name: string) => void; // Define the onChange prop type
    value?: string; // Optional prop to pass the initial value
}

const Name: React.FC<NameProps> = ({ onChange, value = '' }) => {
    const [inputValue, setInputValue] = useState(value); // Use state to manage the input value

    // Update the internal state when the value prop changes
    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInputValue(newValue); // Update internal state
        onChange(newValue); // Call the parent's onChange function
    };

    return (
        <div className="flex flex-col w-full">
            {/* Title */}
            <h2 className="text-[16px] font-[500] text-foreground">Name your permissions group.</h2>

            {/* Subtitle */}
            <label className="mt-[20px] text-[14px] font-[400] text-black_secondary">
                Permissions group name <span style={{ color: '#F04438' }}>*</span>
            </label>

            {/* Input Text Bar */}
            <input
                type="text"
                className="mt-[6px] border border-grey rounded-[8px] px-[14px] py-[10px] text-[16px]"
                placeholder="Group name"
                value={inputValue} // Bind the input value to the state
                onChange={handleInputChange} // Attach the change handler
            />

            {/* Description */}
            <p className="mt-[6px] text-sm text-black_tertiary">
                A descriptive name will help identify it in the future.
            </p>
        </div>
    );
};

export default Name;
