import React from 'react';

interface MemberListProps {
    members: Member[]; // List of members
    activeMembers: Record<string, boolean>; // State for toggle buttons
    handleToggle: (member: string) => void; // Function to handle toggle
}

const MemberList: React.FC<MemberListProps> = ({ members, activeMembers, handleToggle }) => {
    return (
        <div className="h-[243px] overflow-y-auto custom-scrollbar mt-[8px]">
            {members.map((member, index) => (
                <div key={index} className="flex flex-col hover:bg-hover_grey">
                    {/* Name at the top */}
                    <div className="flex justify-between items-center ml-[24px] mr-[24px] mt-[12px] left-hover-effect">
                        <div className="flex flex-col hover:cursor-default ">
                            <h3 className="text-[14px]">{member.user}</h3>
                            <div className="flex flex-row mt-[2px]">
                                <p className="text-[12px] text-hint_text_grey">{member.email}&nbsp;&nbsp;</p>
                                <span className="text-hint_text_grey" style={{ lineHeight: '18px' }}>•</span> {/* Center dot */}
                                <p className="text-[12px] text-hint_text_grey">&nbsp;&nbsp;{member.organisation}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={activeMembers[member.user] || false}
                                    onChange={() => handleToggle(member.user)}
                                />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-divider_grey mt-[20px] ml-[24px] mr-[24px]"></div>
                </div>
            ))}
        </div>
    );
};

export default MemberList;
