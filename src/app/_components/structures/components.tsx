import React, { useCallback, useEffect, useRef, useState } from 'react';

interface StructuresWithRolesProps {
    structures: string[]; // List of structures
    roles: string[]; // List of roles
    allChecked: boolean; // Flag for all checked state
    checkedStructures: Record<string, boolean>; // Object tracking checked structures
    selectedRoles: Record<string, string[]>; // Object tracking selected roles per structure
    onStructureCheckboxChange: (structure: string) => void; // Callback for structure checkbox change
    onRoleSelectionChange: (structure: string, role: string) => void; // Callback for role selection change
}

const StructuresWithRoles: React.FC<StructuresWithRolesProps> = ({
    structures,
    roles,
    allChecked,
    checkedStructures,
    selectedRoles,
    onStructureCheckboxChange,
    onRoleSelectionChange
}) => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null); // Track the open dropdown
    const dropdownRef = useRef<HTMLUListElement | null>(null); // Reference for dropdown menu

    const toggleDropdown = (structure: string) => {
        setOpenDropdown(prev => (prev === structure ? null : structure)); // Toggle dropdown for a structure
    };

    const handleClickOutside = useCallback((event: MouseEvent) => {
        // Close dropdown if clicked outside
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setOpenDropdown(null);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside); // Add event listener for click outside
        return () => {
            document.removeEventListener('mousedown', handleClickOutside); // Clean up listener
        };
    }, [handleClickOutside]);

    return (
        <div>
            {structures.map((structure) => {
                const selectedRole = selectedRoles[structure]?.[0] || "No Access"; // Get selected role or default text

                return (
                    <div key={structure} className="flex flex-col w-full items-center">
                        <div className="flex-1 w-full flex flex-row items-center">
                            <div className='flex-1 w-full flex flex-row items-center pl-[24px] py-[18px] cursor-default hover:bg-hover_grey left-hover-effect'>
                                <input
                                    type="checkbox"
                                    checked={checkedStructures[structure] || false} // Check status for structure
                                    onChange={() => onStructureCheckboxChange(structure)} // Handle structure checkbox change
                                    className="custom-checkbox mr-3"
                                />
                                <p className="flex-1 text-[14px]">{structure}</p> {/* Display structure name */}
                            </div>
                            <div className="relative inline-block text-left py-[18px] hover:bg-hover_grey px-[24px] w-[160px] right-hover-effect cursor-pointer">
                                <button
                                    type="button"
                                    className="inline-flex justify-between w-full text-sm focus:outline-none"
                                    onClick={() => toggleDropdown(structure)} // Toggle dropdown on button click
                                    aria-haspopup="true"
                                    aria-expanded={openDropdown === structure}
                                >
                                    <p className='w-full'>{selectedRole}</p> {/* Display selected role */}
                                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#667085" aria-hidden="true">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>

                                {openDropdown === structure && (
                                    <div className="absolute z-10 ml-[-112px] w-[224px] rounded-md bg-white shadow-lg">
                                        <ul ref={dropdownRef} role="menu">
                                            {roles.map((role) => (
                                                <li key={role} className="flex px-[8px] py-[2px]">
                                                    <div className='flex flex-row hover:bg-hover_grey bg py-[8px] pl-[4px] pr-[8px] rounded right-hover-effect'>
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedRoles[structure]?.includes(role) || false} // Check status for role
                                                            onChange={() => onRoleSelectionChange(structure, role)} // Handle role selection change
                                                            className="custom-checkbox mr-2"
                                                        />
                                                        <p>{role}</p> {/* Display role name */}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="h-[1px] w-full bg-grey"></div> {/* Divider line */}
                    </div>
                );
            })}
        </div>
    );
};

export default StructuresWithRoles;
