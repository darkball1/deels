// components/StructureList.tsx
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { EntitiesGroup, StructureListProps } from '../data';
import StructureItem from './structure_item';


const StructureList: React.FC<StructureListProps> = (props) => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Toggle dropdown for a structure
    const toggleDropdown = (structure: string) => {
        setOpenDropdown(prev => (prev === structure ? null : structure));
    };

    // Close dropdown if clicked outside
    const handleClickOutside = useCallback((event: MouseEvent) => {

        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setOpenDropdown(null); // Hide dropdown if clicked outside
        }
    }, []);

    // Add event listener for click outside
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    return (
        <>
            {Object.entries(props.structures).map(([structureName, countries]) => (
                <div
                    ref={dropdownRef}
                    key={structureName}
                ><StructureItem
                        structureName={structureName}
                        countries={countries}
                        {...props}
                        openDropdown={openDropdown}
                        toggleDropdown={toggleDropdown}
                        dropdownRef={dropdownRef}
                    />
                </div>
            ))}
        </>
    );
};



export default StructureList;