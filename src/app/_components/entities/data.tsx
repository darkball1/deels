import { RefObject } from "react";

export interface EntitiesGroup {
    [key: string]: {
        [country: string]: string[]; // This allows any country name as a key
    };
}

// StructureListProps 
export interface StructureListProps {
    structures: EntitiesGroup;
    structureslist: Record<string, string[]>;
    expandedStructures: Record<string, boolean>;
    expandedCountries: Record<string, boolean>;
    checkedBoxes: Record<string, boolean>;
    selectedRoles: Record<string, string[]>;
    roles: string[];
    toggleStructure: (structureName: string) => void;
    toggleCountry: (structureName: string, country: string) => void;
    handleCheckboxChange: (layer: number, value: string) => void;
    handleRoleSelectionChange: (structure: string, role: string) => void;
}

// StructureItemProps 
export interface StructureItemProps extends StructureListProps {
    structureName: string;
    countries: Record<string, string[]>;
    openDropdown: string | null;
    toggleDropdown: (structure: string) => void;
    dropdownRef: RefObject<HTMLDivElement>;
}

