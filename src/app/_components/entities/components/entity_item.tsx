import React from 'react';
import Image from "next/image";
import companyIcon from './../../../_assets/company.svg';

const EntityItem: React.FC<{
    structureName: string;
    country: string;
    item: string;
    checkedBoxes: Record<string, boolean>;
    selectedRoles: Record<string, string[]>;
    roles: string[];
    handleCheckboxChange: (layer: number, value: string) => void;
    handleRoleSelectionChange: (structure: string, role: string) => void;
    openDropdown: string | null;
    toggleDropdown: (structure: string) => void;
}> = ({
    structureName,
    country,
    item,
    checkedBoxes,
    selectedRoles,
    roles,
    handleCheckboxChange,
    handleRoleSelectionChange,
    openDropdown,
    toggleDropdown
}) => {
        return (
            <div className='flex items-center flex-col'>
                <div className='flex w-full items-center flex-row'>
                    <div className='flex w-full items-center flex-row pl-[104px] py-[18px] hover:bg-hover_grey left-hover-effect'>
                        <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange(3, `${structureName}-${country}-${item}`)}
                            checked={checkedBoxes[`${structureName}-${country}-${item}`]}
                            className="custom-checkbox mr-[12px]"
                        />
                        <Image src={companyIcon} alt="Company Icon" width={20} height={20} />
                        <p className='ml-[8px] text-[14px] text-black_tertiary'>{item}</p>
                    </div>
                    <div className="relative inline-block text-left pr-[24px] w-[160px] pl-[24px] hover:bg-hover_grey hover:cursor-pointer py-[18px] right-hover-effect">
                        <button
                            type="button"
                            className="inline-flex justify-between w-full text-sm focus:outline-none"
                            onClick={() => toggleDropdown(`${structureName}-${item}`)}
                            aria-expanded={openDropdown === `${structureName}-${item}`}
                        >
                            <p className='w-[81px]'>{selectedRoles[`${structureName}-${country}-${item}`]?.[0] || "No Access"}</p>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#667085" aria-hidden="true">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {openDropdown === `${structureName}-${item}` && (
                            <div className="absolute z-10 ml-[-112px] w-[224px] rounded-md bg-white shadow-lg">
                                <ul role="menu">
                                    {roles.map((role) => (
                                        <li key={role} className="flex px-[8px] py-[2px]">
                                            <div className='flex flex-row hover:bg-hover_grey bg py-[8px] pl-[4px] pr-[8px] rounded right-hover-effect'>
                                                <input
                                                    type="checkbox"
                                                    className="custom-checkbox mr-2"
                                                    checked={selectedRoles[`${structureName}-${country}-${item}`]?.includes(role) || false}
                                                    onChange={() => handleRoleSelectionChange(`${structureName}-${country}-${item}`, role)}
                                                />
                                                <p>{role}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <div className="h-[1px] w-full bg-grey"></div>

            </div>
        );
    };

export default EntityItem