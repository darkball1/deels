import React, { useState } from 'react';
import Image from "next/image";
import rightArrowIcon from './../../../_assets/right_arrow.svg';
import downArrowIcon from './../../../_assets/down_arrow.svg';
import EntityItem from './entity_item';

const CountryItem: React.FC<{
    structureName: string;
    country: string;
    items: string[];
    expandedCountries: Record<string, boolean>;
    checkedBoxes: Record<string, boolean>;
    selectedRoles: Record<string, string[]>;
    roles: string[];
    toggleCountry: (structureName: string, country: string) => void;
    handleCheckboxChange: (layer: number, value: string) => void;
    handleRoleSelectionChange: (structure: string, role: string) => void;
    openDropdown: string | null;
    toggleDropdown: (structure: string) => void;
}> = ({
    structureName,
    country,
    items,
    expandedCountries,
    checkedBoxes,
    selectedRoles,
    roles,
    toggleCountry,
    handleCheckboxChange,
    handleRoleSelectionChange,
    openDropdown,
    toggleDropdown
}) => {
        return (
            <>
                <div className='flex items-center flex-row pl-[44px] py-[18px] hover:bg-hover_grey left-hover-effect'>
                    <input
                        type="checkbox"
                        className="custom-checkbox mr-[15.5px]"
                        checked={checkedBoxes[`${structureName}-${country}`]}
                        onChange={() => handleCheckboxChange(2, `${structureName}-${country}`)}
                    />
                    <div className='flex items-center flex-row' onClick={() => toggleCountry(structureName, country)}>
                        {expandedCountries[`${structureName}-${country}`] ? (
                            <Image src={downArrowIcon} alt="Right Icon" width={10} />
                        ) : (
                            <Image src={rightArrowIcon} alt="Right Icon" height={10} />
                        )}
                        <p className='ml-[11.5px] text-[14px] text-black_tertiary hover:cursor-default'>{country} ({items.length})</p>
                    </div>
                </div>
                <div className="h-[1px] w-full bg-grey"></div>
                {expandedCountries[`${structureName}-${country}`] && items.map((item, index) => (
                    <EntityItem
                        key={index}
                        structureName={structureName}
                        country={country}
                        item={item}
                        checkedBoxes={checkedBoxes}
                        selectedRoles={selectedRoles}
                        roles={roles}
                        handleCheckboxChange={handleCheckboxChange}
                        handleRoleSelectionChange={handleRoleSelectionChange}
                        openDropdown={openDropdown}
                        toggleDropdown={toggleDropdown}
                    />
                ))}
            </>
        );
    };


export default CountryItem