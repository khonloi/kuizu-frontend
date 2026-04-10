import React, { useState } from 'react';

const Tabs = ({ tabs, defaultActiveIndex = 0, activeIndex: propsActiveIndex, onTabChange }) => {
    const [internalActiveIndex, setInternalActiveIndex] = useState(defaultActiveIndex);

    const isControlled = propsActiveIndex !== undefined;
    const activeIndex = isControlled ? propsActiveIndex : internalActiveIndex;

    const handleTabClick = (index) => {
        if (!isControlled) {
            setInternalActiveIndex(index);
        }
        if (onTabChange) {
            onTabChange(index);
        }
    };

    return (
        <div className="flex flex-col w-full">
            <div className="bg-[#f6f7fb] p-1.5 rounded-xl flex gap-1 w-fit overflow-x-auto max-w-full">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`px-5 py-2.5 rounded-lg text-[15px] font-bold transition-all duration-200 whitespace-nowrap
                            ${activeIndex === index
                                ? 'bg-white text-[#4255ff] shadow-[0_4px_12px_rgba(66,85,255,0.1)]'
                                : 'text-[#586380] hover:text-[#282e3e] hover:bg-[#edeff2]'
                            }`}
                        onClick={() => handleTabClick(index)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="animate-fade-in-up">
                {tabs[activeIndex].content}
            </div>
        </div>
    );
};

export default Tabs;
