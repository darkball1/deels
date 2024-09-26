import React, { useEffect, useState } from 'react';
import SearchDropdown from '../search_dropdown';
import MemberList from './components';

interface MembersProps {
    onChange: (members: string[]) => void; // Function to notify parent of changes
}
const Members: React.FC<MembersProps> = ({ onChange }) => {
    const [members, setMembers] = useState<Member[]>([]);
    const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
    const [activeMembers, setActiveMembers] = useState<{ [key: string]: boolean }>({}); // State for toggle buttons
    // Fetch members data when the component mounts
    useEffect(() => {
        const activeMembersList = Object.keys(activeMembers).filter(key => activeMembers[key]);
        // Logic to handle active members list can be added here (like passing to a parent or making an API call)
    }, [activeMembers]);

    // Fetch members data when the component mounts
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetch('/api/users'); // Call your API route
                if (response.ok) {
                    const data = await response.json();
                    setMembers(data);
                    setFilteredMembers(data);
                } else {
                    console.error('Failed to fetch members');
                }
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };

        fetchMembers(); // Call the fetch function
    }, []);

    // Function to handle filtering
    const handleFilteredChange = (filtered: string[]) => {
        const newFilteredMembers = members.filter(member => filtered.includes(member.user));
        setFilteredMembers(newFilteredMembers);
    };

    // Function to handle toggle
    const handleToggle = (user: string) => {
        setActiveMembers(prevState => ({
            ...prevState,
            [user]: !prevState[user], // Toggle the member's active state
        }));
    };

    // Function to handle changes
    useEffect(() => {
        onChange(filteredMembers.map(member => member.user));
    }, [filteredMembers]);

    return (
        <div>
            <p className='text-[16px] font-[500] text-foreground mt-[20px] ml-[24px]'>Would you like to add anyone to the new group now?</p>
            <p className='text-[14px] font-[400] text-black_tertiary mt-[4px] ml-[24px]'>You can skip this and add members later if you wish</p>
            <SearchDropdown list={members.map(member => member.user)} onFilteredListChange={handleFilteredChange} />
            <MemberList members={filteredMembers} activeMembers={activeMembers} handleToggle={handleToggle} />
        </div>
    );
};

export default Members;
