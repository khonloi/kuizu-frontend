import React from 'react';

const EmptyState = ({
    title,
    description,
    icon: Icon,
    action,
    className = ''
}) => {
    return (
        <div className={`text-center py-16 px-10 bg-white border-2 border-dashed border-[#edeff2] rounded-2xl flex flex-col items-center gap-2 ${className}`}>
            {Icon && <Icon className="text-[#586380] opacity-50" size={48} />}
            {title && <h3 className="m-0 text-xl font-bold text-[#282e3e] leading-tight">{title}</h3>}
            {description && <p className="m-0 text-base text-[#586380]">{description}</p>}
            {action && <div className="mt-4">{action}</div>}
        </div>
    );
};

export default EmptyState;
