// components/Modal.tsx
import React, { useState } from "react";
import TitleSegment from "./title_segment";
import ProgressBar from "./progress_bar";
import Name from "./name/main";
import Structures from "./structures/main";
import Members from "./members/main";
import Entities from "./entities/main";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, }) => {
    const [currentNumber, setCurrentNumber] = useState(1); // Default to 1
    const [groupName, setGroupName] = useState('');
    const [structures, setStructures] = useState<Record<string, string[]>>({});
    const [checkedStructures, setCheckedStructures] = useState<Record<string, boolean>>({});

    const [entities, setEntities] = useState<Record<string, string[]>>({});
    const [checkedEntities, setCheckedEntities] = useState<Record<string, boolean>>({});

    const [members, setMembers] = useState<string[]>([]);
    const [nextButton, setNextButton] = useState('Next');
    const [backButton, setBackButton] = useState('Cancel');

    const handleCancel = () => {
        if (currentNumber === 2) {
            setBackButton('Cancel');
        }
        else if (currentNumber === 4) {
            setNextButton('Next');
        }
        setCurrentNumber((prev) => prev > 1 ? prev - 1 : prev);
    };

    // Function to handle the Next button click
    const handleNext = () => {
        if (currentNumber === 1) {
            setBackButton('Go Back');
        }
        else if (currentNumber === 3) {
            setNextButton('Create Group');
        }
        setCurrentNumber((prev) => prev < 4 ? prev + 1 : prev);
    };


    const mainSegment = () => {
        switch (currentNumber) {
            case 1:
                return (
                    <div className="mt-[24px] mb-[36px] ml-[100px] mr-[100px]">
                        <Name value={groupName} onChange={(name: string) => setGroupName(name)} />
                    </div>
                );
            case 2:
                return (
                    <Structures list={structures} checkedList={checkedStructures} onChange={(structures: Record<string, string[]>, checkedStructures: Record<string, boolean>) => { setStructures(structures); setCheckedStructures(checkedStructures) }} />
                );
            case 3:
                return (
                    < Entities structureslist={structures} selectedList={entities} checkedList={checkedEntities} onChange={(selectedList: Record<string, string[]>, newCheckedBoxes: Record<string, boolean>) => { setEntities(selectedList); setCheckedEntities(newCheckedBoxes); }} />
                )
            case 4:
                return (
                    <Members onChange={(members: string[]) => setMembers(members)} />
                );
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className={`bg-white  rounded-[12px] shadow-lg relative ${currentNumber === 1 ? 'w-[600px] ' : 'w-[616px] '}`}> {/* Set width to 600 pixels */}
                {/* Top Bar with SVGs and Title */}
                <TitleSegment />
                <div className="mt-[30px] h-px bg-grey"></div>
                <ProgressBar currentNumber={currentNumber} />
                <div className="h-px bg-grey"></div>
                {mainSegment()}
                <div className="h-px bg-grey"></div>
                <div className="flex justify-end mt-6 mb-6 mr-6">
                    <button
                        className="px-[16px] py-[10px] bg-white text-black_secondary border border-grey mr-[12px] rounded-[8px] hover:bg-hover_grey"
                        onClick={handleCancel} // Change this to the appropriate cancel action
                    >
                        {backButton}
                    </button>
                    <button
                        className="px-[16px] py-[10px] bg-blue_primary text-white rounded-[8px] hover:bg-dark_blue_primary"
                        onClick={handleNext}
                    >
                        {nextButton}
                    </button>
                </div>
            </div>
        </div>


    );


};

// Define the props type for the Section component



export default Modal;
