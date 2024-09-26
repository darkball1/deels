// Name.tsx
import React, { useCallback, useEffect, useState } from 'react';
import Image from "next/image";
import rightArrowIcon from './../../_assets/right_arrow.svg';
import downArrowIcon from './../../_assets/down_arrow.svg';
import companyIcon from './../../_assets/company.svg';
import SearchDropdown from '../search_dropdown';
import { EntitiesGroup } from './data';
import StructureList from './components/structure_list';



interface EntitiesProps {
    structureslist: Record<string, string[]>;
    selectedList: Record<string, string[]>;
    checkedList: Record<string, boolean>;
    onChange: (newSelectedRoles: Record<string, string[]>, newCheckedBoxes: Record<string, boolean>) => void;
}

const Entities: React.FC<EntitiesProps> = ({ structureslist, selectedList, checkedList, onChange }) => {
    // Use the EntitiesGroup interface to define the state
    const [structures, setStructures] = useState<EntitiesGroup>({});
    const [roles, setRoles] = useState<string[]>([]);
    const [expandedStructures, setExpandedStructures] = useState<{ [key: string]: boolean }>({});
    const [expandedCountries, setExpandedCountries] = useState<{ [key: string]: boolean }>({});
    const [openDropdown, setOpenDropdown] = useState<string | null>(null); // Track the open dropdown
    const [selectedRoles, setSelectedRoles] = useState<Record<string, string[]>>(selectedList);
    const [filteredStructures, setFilteredStructures] = useState<EntitiesGroup>({});
    const [checkedBoxes, setCheckedBoxes] = useState<{ [key: string]: boolean }>(checkedList);
    const [allChecked, setAllChecked] = useState(false);
    // Fetch the structures data when the component mounts
    useEffect(() => {
        const fetchEntities = async (structureNames: string[]) => {
            try {
                const newStructures: any = {};
                const newCheckedBoxes: any = {};
                for (const structure of structureNames) {
                    const response = await fetch(`/api/entities/${structure}`);
                    if (response.ok) {
                        const data = await response.json();
                        if (typeof data === 'object' && data !== null) {
                            newStructures[structure] = data as EntitiesGroup;
                            expandedStructures[structure] = false;
                            newCheckedBoxes[structure] = false;
                            Object.keys(data).forEach((key) => {
                                if (key !== 'name') {
                                    expandedCountries[`${structure}-${key}`] = false;
                                }
                                newCheckedBoxes[`${structure}-${key}`] = false;
                                Object.keys(data[key]).forEach((key2) => {
                                    newCheckedBoxes[`${structure}-${key}-${data[key][key2]}`] = false;
                                })
                            })
                        } else {
                            console.error(`Fetched data for ${structure} is not an object:`, data);
                        }
                    } else {
                        console.error(`Failed to fetch structures for ${structure}`);
                    }
                }
                if (!checkedBoxes || Object.keys(checkedBoxes).length == 0) {
                    setCheckedBoxes(newCheckedBoxes);
                }
                setStructures(newStructures);
                setFilteredStructures(newStructures);
                const rolesResponse = await fetch('/api/entities/roles');
                if (rolesResponse.ok) {
                    const roles = await rolesResponse.json();
                    setRoles(roles);
                } else {
                    console.error('Failed to fetch roles');
                }
            } catch (error) {
                console.error('Error fetching structures:', error);
            }
        };
        structureslist && fetchEntities(Object.keys(structureslist));
    }, []);

    // onChange callback for parent component
    useEffect(() => {
        onChange(selectedRoles, checkedBoxes);
    }, [selectedRoles]);

    // For choosing roles
    const handleRoleSelectionChange = (structure: string, role: string) => {
        setSelectedRoles(prev => {
            const currentRoles = prev[structure] || [];
            let updatedRoles;
            if (currentRoles.includes(role)) {
                updatedRoles = { ...prev, [structure]: currentRoles.filter(r => r !== role) };
            } else {
                if (role === "No Access") {
                    updatedRoles = { ...prev, [structure]: ["No Access"] };
                } else if (role === "Full Access") {
                    updatedRoles = { ...prev, [structure]: roles.filter(r => r !== "No Access") };
                } else {
                    updatedRoles = { ...prev, [structure]: [...currentRoles, role] };
                }
            }
            return updatedRoles;
        });
        if (role !== "No Access") {
            setCheckedBoxes(prev => ({
                ...prev,
                [structure]: !prev[structure]
            }));
        } else {
            setCheckedBoxes(prev => ({
                ...prev,
                [structure]: false
            }));
        }
    };

    // For toggling structures' expansion state
    const toggleStructure = (structureName: string) => {
        setExpandedStructures(prev => ({
            ...prev,
            [structureName]: !prev[structureName] // Toggle the value of the specific structure
        }));
    };

    // For toggling countries' expansion state within a structure
    const toggleCountry = (structureName: string, country: string) => {
        setExpandedCountries(prev => ({
            ...prev,
            [`${structureName}-${country}`]: !prev[`${structureName}-${country}`] // Toggle the value of the specific country within the structure
        }));
    };

    // For expanding all structures
    const expandAll = () => {
        // Assuming you know the keys of expandedStructures and expandedCountries
        const allKeysStructures = Object.keys(expandedStructures);
        const allKeysCountries = Object.keys(expandedCountries);

        const newExpandedStructures = allKeysStructures.reduce((acc, key) => {
            acc[key] = true;
            return acc;
        }, {} as { [key: string]: boolean });

        const newExpandedCountries = allKeysCountries.reduce((acc, key) => {
            acc[key] = true;
            return acc;
        }, {} as { [key: string]: boolean });

        setExpandedStructures(newExpandedStructures);
        setExpandedCountries(newExpandedCountries);
    };

    // For collapsing all structures
    const collapseAll = () => {
        // Assuming you know the keys of expandedStructures and expandedCountries
        const allKeysStructures = Object.keys(expandedStructures);
        const allKeysCountries = Object.keys(expandedCountries);

        const newExpandedStructures = allKeysStructures.reduce((acc, key) => {
            acc[key] = false;
            return acc;
        }, {} as { [key: string]: boolean });

        const newExpandedCountries = allKeysCountries.reduce((acc, key) => {
            acc[key] = false;
            return acc;
        }, {} as { [key: string]: boolean });

        setExpandedStructures(newExpandedStructures);
        setExpandedCountries(newExpandedCountries);
    };

    // For filtering entities - used in search
    const handleFilteredChange = useCallback((filtered: string[]) => {
        const object: EntitiesGroup = {};
        Object.keys(structures).forEach((key) => {
            object[key] = {};
            Object.keys(structures[key]).forEach((key2) => {
                const commonElements = filtered.filter(element => structures[key][key2].includes(element));
                if (commonElements.length > 0) {
                    object[key][key2] = commonElements;
                }
            })
            if (Object.keys(object[key]).length === 0) {
                delete object[key];
            }
        })
        setFilteredStructures(object);
        // Any other logic that doesn't cause re-renders should go here
    }, []);

    // For list of entities to be used in search
    const concatenatedList = Array.from(new Set(
        Object.values(structures)
            .flatMap(countries => Object.values(countries).flat())
    ));

    // For toggling checkboxes
    const handleCheckboxChange = (layer: number, value: string) => {
        if (layer !== 0 && checkedBoxes[value]) {
            setCheckedBoxes(prev => ({
                ...prev, // Keep previous state
                [value]: !prev[value] // Toggle the specified checkbox state
            }));
            return
        }
        if (layer === 0) {
            setAllChecked(!allChecked);
            setCheckedBoxes(prev => {
                const updatedCheckedBoxes = Object.keys(prev).reduce((acc, key) => {
                    acc[key] = true; // Set each key's value to true
                    return acc;
                }, {} as { [key: string]: boolean });

                return updatedCheckedBoxes; // Return the updated object
            });
        } else if (layer === 1 || layer === 2) {
            setCheckedBoxes(prev => {
                const updatedCheckedBoxes = { ...prev };
                Object.keys(updatedCheckedBoxes).forEach(key => {
                    if (key.startsWith(`${value}`)) {
                        updatedCheckedBoxes[key] = true; // Set Saturn checkboxes to true
                    }
                });
                return updatedCheckedBoxes; // Return the updated state
            });
        } else if (layer === 3) {
            setCheckedBoxes(prev => ({
                ...prev, // Keep previous state
                [value]: !prev[value] // Toggle the specified checkbox state
            }));
        }
    }


    return (
        <div>
            <p className='text-[16px] font-[500] text-foreground mt-[20px] ml-[24px]'>Which entities would you like to grant access to?</p>
            <p className='text-[14px] font-[400] text-black_tertiary mt-[4px] ml-[24px]'>Entity roles have been inherited from structure roles</p>
            <SearchDropdown list={concatenatedList} onFilteredListChange={handleFilteredChange} />
            <div className='flex-1 w-full flex flex-row items-center mt-[16px] pl-[24px] py-[18px] bg-hover_grey border border-divider_grey'>
                <input
                    type="checkbox"
                    className="custom-checkbox mr-3"
                    checked={allChecked}
                    onChange={() => handleCheckboxChange(0, 'main')}
                />
                {/* Structure name */}
                <p className="flex text-[14px] cursor-default">Entity</p>
                <p className="flex text-[14px] text-dark_blue_primary ml-[12px] cursor-pointer" onClick={expandAll}>Expand all</p>
                <p className="flex text-[14px] text-dark_blue_primary cursor-default">&nbsp;|&nbsp;</p>

                <p className="flex text-[14px] text-dark_blue_primary cursor-pointer" onClick={collapseAll}>Collapse all</p>
                <div className="flex-1"></div>
                <p className="mr-[24px] text-[14px] cursor-default">Role</p>

            </div>

            <div className="h-[243px] overflow-y-auto overflow-x-hidden custom-scrollbar">
                <StructureList
                    structures={filteredStructures}
                    structureslist={structureslist}
                    expandedStructures={expandedStructures}
                    expandedCountries={expandedCountries}
                    checkedBoxes={checkedBoxes}
                    selectedRoles={selectedRoles}
                    roles={roles}
                    toggleStructure={toggleStructure}
                    toggleCountry={toggleCountry}
                    handleCheckboxChange={handleCheckboxChange}
                    handleRoleSelectionChange={handleRoleSelectionChange}
                />
            </div>


        </div>
    );
};

export default Entities;
