import { StructureItemProps } from "../data";
import React from 'react';
import Image from "next/image";
import rightArrowIcon from './../../../_assets/right_arrow.svg';
import downArrowIcon from './../../../_assets/down_arrow.svg';
import CountryItem from "./country_item";


const StructureItem: React.FC<StructureItemProps> = ({
    structureName,
    countries,
    structureslist,
    expandedStructures,
    expandedCountries,
    checkedBoxes,
    selectedRoles,
    roles,
    toggleStructure,
    toggleCountry,
    handleCheckboxChange,
    handleRoleSelectionChange,
    openDropdown,
    toggleDropdown
}) => {
    return (
        <>
            <div className='flex items-center flex-row pl-[24px] hover:cursor-default hover:bg-hover_grey py-[18px] left-hover-effect'>
                <input
                    type="checkbox"
                    className="custom-checkbox mr-[15.5px]"
                    checked={checkedBoxes[structureName]}
                    onChange={() => handleCheckboxChange(1, structureName)}
                />
                <div className='flex items-center flex-row hover:cursor-default' onClick={() => toggleStructure(structureName)}>
                    {expandedStructures[structureName] ? (
                        <Image src={downArrowIcon} alt="Right Icon" width={10} />

                    ) : (
                        <Image src={rightArrowIcon} alt="Right Icon" height={10} />

                    )}                    <p className='ml-[11.5px] text-[14px] font-[500]'>{structureName}</p>
                    <p className='ml-[8px] text-[12px] text-dark_blue_primary hover:cursor-default bg-background_blue rounded-[16px] px-[8px] py-[2px] font-[500]'>{structureslist[structureName][0]}</p>
                </div>
            </div>
            <div className="h-[1px] w-full bg-grey"></div>
            {expandedStructures[structureName] && Object.entries(countries).map(([country, items]) => (
                <CountryItem
                    key={country}
                    structureName={structureName}
                    country={country}
                    items={items}
                    expandedCountries={expandedCountries}
                    checkedBoxes={checkedBoxes}
                    selectedRoles={selectedRoles}
                    roles={roles}
                    toggleCountry={toggleCountry}
                    handleCheckboxChange={handleCheckboxChange}
                    handleRoleSelectionChange={handleRoleSelectionChange}
                    openDropdown={openDropdown}
                    toggleDropdown={toggleDropdown}
                />
            ))}
        </>
    );
};


export default StructureItem