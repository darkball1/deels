import { useEffect, useState, useRef, useCallback } from "react"; // Import necessary hooks from React
import Image from "next/image"; // Import Next.js Image component for optimized images
import searchIcon from './../_assets/search.svg'; // Import search icon SVG

// Define the props interface for the SearchDropdown component
interface SearchDropdownProps {
    list: string[]; // Array of strings to filter through
    onFilteredListChange?: (filtered: string[]) => void; // Callback to notify parent of changes
}

// SearchDropdown component for filtering and selecting items from a list
const SearchDropdown: React.FC<SearchDropdownProps> = ({ list, onFilteredListChange }) => {
    const [searchTerm, setSearchTerm] = useState<string>(''); // State for the current search term
    const [filteredList, setFilteredList] = useState<string[]>([]); // State for the filtered list based on search term
    const [showDropdown, setShowDropdown] = useState<boolean>(false); // State to control dropdown visibility
    const [itemJustSelected, setItemJustSelected] = useState(false); // State to track if an item was just selected
    const dropdownRef = useRef<HTMLUListElement | null>(null); // Ref for the dropdown list

    // Effect to handle filtering of the list based on the search term
    useEffect(() => {
        if (itemJustSelected) {
            setItemJustSelected(false); // Reset selection state
            return; // Exit if an item was just selected
        }
        if (searchTerm.trim() === '' || list.length === 0) {
            setFilteredList([]); // Clear filtered list if search term is empty
            setShowDropdown(false); // Hide dropdown
            onFilteredListChange?.(list); // Notify parent about the empty state
        } else {
            const filtered = list.filter(item =>
                item.toLowerCase().includes(searchTerm.toLowerCase()) // Filter items that include the search term
            );
            setFilteredList(filtered); // Update the filtered list
            setShowDropdown(true); // Show dropdown with filtered results
            onFilteredListChange?.(filtered); // Notify parent of the new filtered list
        }
    }, [searchTerm]); // Run effect when searchTerm changes

    // Effect to notify parent of the current filtered list state
    useEffect(() => {
        if (searchTerm.trim() === '' || list.length === 0) {
            onFilteredListChange?.(list); // Notify parent about the empty state
        } else {
            onFilteredListChange?.(filteredList); // Notify parent of the new filtered list
        }
    }, [filteredList]); // Run effect when filteredList changes

    // Callback to handle clicks outside the dropdown to close it
    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setShowDropdown(false); // Hide dropdown if clicked outside
        }
    }, []); // Dependency array is empty to ensure the same function reference

    // Effect to add and clean up the event listener for detecting outside clicks
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside); // Add event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside); // Clean up listener on component unmount
        };
    }, [handleClickOutside]); // Run effect when handleClickOutside changes

    return (
        <div className="relative"> {/* Container for relative positioning */}
            <div className="flex items-center justify-between flex-row mt-[16px]"> {/* Flex container for input and item count */}
                <div className="flex items-center border border-grey rounded-[8px] px-[14px] py-[10px] w-[445px] ml-[24px] focus-within:outline focus-within:outline-1 focus-within:outline-blue_highlight">
                    {/* Search Icon */}
                    <Image src={searchIcon} alt="Left Icon" width={20} height={20} /> {/* Display search icon */}

                    <input
                        type="text"
                        className="border-0 ml-[8px] text-[16px] flex-grow" // Style for the input field
                        placeholder="Search" // Placeholder text for the input
                        value={searchTerm} // Bind input value to searchTerm state
                        onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
                    />
                </div>
                <p className="text-sm text-gray-500 mt-2 mr-[24px]"> {/* Display item count */}
                    {searchTerm.trim() === '' ? list.length : filteredList.length} items
                </p>
            </div>
            {showDropdown && filteredList.length > 0 && ( // Conditionally render dropdown if it should be shown
                <ul ref={dropdownRef} className="no-scrollable-class absolute z-10 mt-1 w-[445px] ml-[24px] bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {filteredList.map((item, index) => ( // Map through filtered list to display items
                        <li
                            key={index} // Use index as key (consider using unique identifiers in production)
                            className="px-3 py-2 hover:bg-hover_grey left-hover-effect cursor-default text-sm" // Style for each item
                            onClick={() => {
                                setSearchTerm(item); // Set search term to the selected item
                                const filtered = list.filter(listitem => // Filter original list based on the selected item
                                    listitem.toLowerCase().includes(item.toLowerCase())
                                );
                                setFilteredList(filtered); // Update filtered list
                                setItemJustSelected(true); // Mark item as selected
                                setShowDropdown(false); // Hide dropdown
                                // Hide dropdown when an item is clicked
                            }}
                        >
                            {item} <span className="text-black_tertiary">@{item.split(' ')[0].toLowerCase()}</span> {/* Display item with additional info */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchDropdown; // Export the SearchDropdown component for use in other parts of the application
