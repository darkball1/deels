// ProgressBar.tsx
import React from 'react';
import StepCircles from "./step_circles";

interface ProgressBarProps {
    currentNumber: number; // The current step number (1-4)
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentNumber }) => {
    return (
        <div className="flex flex-col w-full h-full pt-[16px] pb-[15px] bg-light_grey">
            {/* Top two sections */}
            <div className="flex flex-1 ">
                <div className="flex-1 ">
                    <StepCircles number={1} currentNumber={currentNumber} text="Group Name" showRightDivider />
                </div>
                <div className="flex-1">
                    <StepCircles number={2} currentNumber={currentNumber} text="Structures" showLeftDivider showRightDivider />
                </div>
                <div className="flex-1">
                    <StepCircles number={3} currentNumber={currentNumber} text="Entities" showLeftDivider showRightDivider />
                </div>
                <div className="flex-1">
                    <StepCircles number={4} currentNumber={currentNumber} text="Members" showLeftDivider />
                </div>
            </div>



        </div>

    );
};

export default ProgressBar;
