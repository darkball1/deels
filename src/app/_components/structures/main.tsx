import React, { useCallback, useEffect, useState } from 'react';
import StructuresWithRoles from './components';
import SearchDropdown from '../search_dropdown';

interface StructuresProps {
    list: Record<string, string[]>; // List of structures with their associated roles
    checkedList: Record<string, boolean>; // Structures passed from the parent
    onChange: (newStructures: Record<string, string[]>, checkedStructures: Record<string, boolean>) => void; // Function to notify parent of changes
}

const Structures: React.FC<StructuresProps> = ({ list = {}, onChange, checkedList = {} }) => {
    const [structures, setStructures] = useState<string[]>([]); // State to store the list of structures
    const [roles, setRoles] = useState<string[]>([]); // State to store roles associated with structures
    const [filtered, setFiltered] = useState<string[]>([]); // State to store filtered structures based on search
    const [allChecked, setAllChecked] = useState(false); // State to manage 'select all' checkbox
    const [checkedStructures, setCheckedStructures] = useState<Record<string, boolean>>(checkedList); // State for checked structures
    const [selectedRoles, setSelectedRoles] = useState<Record<string, string[]>>(list); // State for selected roles per structure

    // Fetch the structures and roles data when the component mounts
    useEffect(() => {
        const fetchStructures = async () => {
            try {
                // Fetch structures from API
                const response = await fetch('/api/structures/list/');
                if (response.ok) {
                    const data = await response.json();
                    setStructures(data);
                    setFiltered(data); // Initialize filtered list with all structures

                    // Fetch roles from API
                    const rolesResponse = await fetch('/api/structures/roles');
                    if (rolesResponse.ok) {
                        const roles = await rolesResponse.json();
                        setRoles(roles); // Set roles if successful
                    } else {
                        console.error('Failed to fetch roles');
                    }
                } else {
                    console.error('Failed to fetch structures');
                }
            } catch (error) {
                console.error('Error fetching structures:', error);
            }
        };
        fetchStructures();
    }, []);

    // Callback to handle changes in the filtered list from SearchDropdown
    const handleFilteredChange = useCallback((filtered: string[]) => {
        setFiltered(filtered);
    }, []);

    // Handle the state change for the topmost checkbox, which controls 'select all'
    const handleAllCheckedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAllChecked(event.target.checked); // Update 'select all' state
        const updatedCheckedStructures = structures.reduce((acc, structure) => {
            acc[structure] = event.target.checked; // Update each structure's checked state
            return acc;
        }, {} as Record<string, boolean>);
        setCheckedStructures(updatedCheckedStructures); // Set updated checked structures
    };

    // Handle individual structure checkbox state change
    const handleStructureCheckboxChange = (structure: string) => {
        if (checkedStructures[structure]) {
            setSelectedRoles(prev => ({
                ...prev,
                [structure]: ["No Access"] // Set "No Access" if structure is unchecked
            }));
        }
        // Toggle the checked state of the structure
        setCheckedStructures(prev => ({
            ...prev,
            [structure]: !prev[structure]
        }));
    };

    // Handle role selection change for a specific structure
    const handleRoleSelectionChange = (structure: string, role: string) => {
        setSelectedRoles(prev => {
            const currentRoles = prev[structure] || [];
            let updatedRoles;

            // Logic to update roles based on selection
            if (role === "No Access" && !currentRoles.includes("No Access")) {
                updatedRoles = { ...prev, [structure]: ["No Access"] }; // Set "No Access"
            } else if (role === "Full Access" && !currentRoles.includes("Full Access")) {
                updatedRoles = { ...prev, [structure]: roles.filter(r => r !== "No Access") }; // Set "Full Access"
            } else {
                updatedRoles = {
                    ...prev,
                    [structure]: currentRoles.includes(role)
                        ? currentRoles.filter(r => r !== role).filter(r => r !== 'No Access') // Remove the role and "No Access"
                        : [...currentRoles.filter(r => r !== 'No Access'), role] // Add the new role, ensuring "No Access" is removed if present
                };
            }

            return updatedRoles;
        });

        // Update checked structures based on role selection
        setCheckedStructures(prev => ({
            ...prev,
            [structure]: role !== "No Access"
        }));
    };

    // Notify parent of changes whenever selectedRoles or checkedStructures change
    useEffect(() => {
        const filteredRoles = Object.entries(selectedRoles)
            .filter(([_, roles]) => !roles.includes('No Access')) // Filter out entries with "No Access"
            .reduce((acc, [key, roles]) => {
                acc[key] = roles; // Rebuild the object without "No Access"
                return acc;
            }, {} as { [key: string]: string[] }); // Add type assertion here

        onChange(filteredRoles, checkedStructures); // Notify parent with updated data
    }, [selectedRoles, checkedStructures]);

    return (
        <div>
            <p className='text-[16px] font-[500] text-foreground mt-[20px] ml-[24px]'>Which structures would you like to grant access to?</p>
            <p className='text-[14px] font-[400] text-black_tertiary mt-[4px] ml-[24px]'>Which structures would you like to grant access to?</p>

            {/* Search Dropdown for filtering structures */}
            <SearchDropdown list={structures} onFilteredListChange={handleFilteredChange} />

            <div className='flex-1 w-full flex flex-row items-center mt-[16px] pl-[24px] py-[18px] bg-hover_grey border border-divider_grey'>
                <input
                    type="checkbox"
                    className="custom-checkbox mr-3"
                    checked={allChecked}
                    onChange={handleAllCheckedChange} // Handle select all checkbox
                />
                <p className="flex-1 text-[14px] cursor-default">Structure</p>
                <p className="mr-[24px] text-[14px] cursor-default">Role</p>
            </div>

            {/* Display structures with roles in a scrollable area */}
            <div className="h-[243px] overflow-y-auto overflow-x-hidden custom-scrollbar">
                <StructuresWithRoles
                    structures={filtered} // Filtered structures
                    roles={roles} // Roles to be displayed
                    checkedStructures={checkedStructures} // Checked structures state
                    selectedRoles={selectedRoles} // Selected roles state
                    onStructureCheckboxChange={handleStructureCheckboxChange} // Checkbox change handler
                    onRoleSelectionChange={handleRoleSelectionChange} // Role selection change handler
                    allChecked={allChecked} // 'Select all' checkbox state
                />
            </div>
        </div>
    );
};

export default Structures;
