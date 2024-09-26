import Image from "next/image"; // Import Next.js Image component for optimized images
import tickIcon from './../_assets/tick.svg'; // Import tick icon SVG

// Define the props interface for the StepCircles component
interface StepCirclesProps {
    number: number; // Current step number
    currentNumber: number; // Current step to determine past/future status
    text: string; // Text to display below the number
    showLeftDivider?: boolean; // Optional prop to control the display of the left divider
    showRightDivider?: boolean; // Optional prop to control the display of the right divider
}

// StepCircles component for rendering individual step circles
const StepCircles: React.FC<StepCirclesProps> = ({ number, currentNumber, text, showLeftDivider, showRightDivider }) => {
    // Determine if the section is in the future or past based on currentNumber
    const isFutureSection = number > currentNumber;
    const isPastSection = number < currentNumber;

    return (
        <div className="flex flex-col items-center justify-center w-full"> {/* Flex container for vertical alignment */}
            <div className="flex items-center w-full justify-between"> {/* Horizontal container for step and dividers */}
                {/* Left Divider */}
                <div className="flex-1">
                    {showLeftDivider && <Divider isLeftBorder={true} />} {/* Render left divider if showLeftDivider is true */}
                </div>

                {/* Centered Circle */}
                <div className="flex-shrink-0"> {/* Center circle with no shrink */}
                    {isPastSection ? ( // If the section is past
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-light_blue_primary">
                            <Image src={tickIcon} alt="Tick" className="w-[12px]" /> {/* Render tick icon */}
                        </div>
                    ) : ( // If the section is current or future
                        <div className={`rounded-full w-6 h-6 flex items-center justify-center text-sm ${isFutureSection ? 'bg-transparent font-[600] text-foreground rounded-full border border-grey' : 'bg-foreground text-white font-[500]'}`}>
                            <p className="text-center mt-[2px]">{number}</p> {/* Display the step number */}
                        </div>
                    )}
                </div>

                {/* Right Divider */}
                <div className="flex-1">
                    {showRightDivider && <Divider isLeftBorder={false} />} {/* Render right divider if showRightDivider is true */}
                </div>
            </div>
            <p className={`mt-[6px] text-center ${isFutureSection ? 'text-black_tertiary font-normal' : 'text-foreground font-[600]'}`} style={{ fontSize: '14px' }}>
                {text} {/* Display the text below the circle */}
            </p>
        </div>
    );
};

// Divider component for horizontal lines
interface DividerProps {
    isLeftBorder?: boolean; // Optional prop to indicate if it's a left border
}

const Divider: React.FC<DividerProps> = ({ isLeftBorder }) => {
    return (
        <div className={`my-4 ${isLeftBorder ? 'pr-2' : 'pl-2'} w-full`}> {/* Apply padding based on which side the divider is on */}
            <div className="bg-grey h-px w-full" /> {/* Render a horizontal line */}
        </div>
    );
};

export default StepCircles; // Export the StepCircles component for use in other parts of the application
