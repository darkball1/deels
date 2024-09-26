// TitleSegment.js
import React from 'react';
import Image from "next/image"; // Import the Next.js Image component for optimized images
import featuredIcon from './../_assets/featured_icon.svg'; // Import the featured icon SVG
import xClose from './../_assets/x_close.svg'; // Import the close icon SVG

const TitleSegment = () => {
    return (
        <div className="flex items-center justify-between"> {/* Flex container to align items */}

            {/* Left SVG - Featured Icon */}
            <div className="absolute top-[24px] left-[24px]"> {/* Position the icon absolutely in the top left corner */}
                <Image src={featuredIcon} alt="Left Icon" width={48} height={48} /> {/* Render the featured icon */}
            </div>

            {/* Title Text */}
            <h2 style={{ fontWeight: 600, fontSize: "18px", marginTop: "34px", marginLeft: "88px", lineHeight: "28px" }}>
                Create a new permissions group {/* Display the title text */}
            </h2>

            {/* Right SVG - Close Icon */}
            <div className="absolute top-[22px] right-[22px]"> {/* Position the icon absolutely in the top right corner */}
                <Image
                    className='hover:cursor-pointer hover:bg-hover_grey'
                    src={xClose}
                    alt="Right Icon"
                    width={20}
                    height={20}
                /> {/* Render the close icon with hover effects */}
            </div>
        </div>
    );
};

export default TitleSegment; // Export the TitleSegment component for use in other parts of the application
