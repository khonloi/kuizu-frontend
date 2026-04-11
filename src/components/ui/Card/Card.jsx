import React from 'react';
import { User } from 'lucide-react';
import Badge from '../Badge/Badge';

const Card = ({
    children,
    className = '',
    title,
    badge,
    badgeIcon: BadgeIcon,
    badgeVariant = 'primary',
    description,
    ownerName,
    footerRight,
    actions,
    onClick,
    ...props
}) => {
    const hasBorder = className.includes('border-');
    const hasRounded = className.includes('rounded-');
    
    const baseCardStyles = `bg-white ${!hasBorder ? 'border-2 border-[#edeff2]' : ''} ${!hasRounded ? 'rounded-2xl' : ''} overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md ${className}`;

    // If it has a title, it's an "Item Card" layout
    if (title) {
        return (
            <div
                className={`${baseCardStyles} cursor-pointer flex flex-col h-full hover:border-[#4255ff] hover:shadow-lg`}
                onClick={onClick}
                {...props}
            >
                <div className="p-4 flex justify-between items-center border-b border-[#edeff2] gap-4">
                    <h3 className="m-0 text-base font-bold text-[#282e3e] leading-tight flex-1 truncate line-clamp-1">{title}</h3>
                    {badge && (
                        <Badge variant={badgeVariant} className="whitespace-nowrap flex-shrink-0 text-xs gap-1">
                            {BadgeIcon && <BadgeIcon size={12} />}
                            {badge}
                        </Badge>
                    )}
                </div>
                <div className="p-4 flex-grow">
                    <p className="m-0 text-base text-[#586380] leading-relaxed line-clamp-2 md:line-clamp-3">
                        {description || 'No description provided.'}
                    </p>
                </div>
                <div className="p-4 border-t border-[#edeff2] bg-[#f6f7fb] flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-[#4255ff] flex items-center justify-center text-white">
                            <User size={14} />
                        </div>
                        <span className="text-sm font-semibold text-[#282e3e]">{ownerName}</span>
                        {footerRight && (
                            <div className="flex items-center -ml-1">
                                {footerRight}
                            </div>
                        )}
                    </div>
                    {actions && (
                        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                            {actions}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div
            className={baseCardStyles}
            onClick={onClick}
            {...props}
        >
            {children}
            {ownerName && (
                <div className="p-4 px-8 border-t border-[#edeff2] bg-[#f6f7fb]">
                    <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-[#4255ff] flex items-center justify-center text-white">
                            <User size={14} />
                        </div>
                        <span className="text-sm font-semibold text-[#282e3e] md:text-xs">By {ownerName}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

const CardHeader = ({ children, className = '', ...props }) => (
    <div className={`p-5 border-b border-[#edeff2] bg-transparent ${className}`} {...props}>
        {children}
    </div>
);

const CardTitle = ({ children, className = '', ...props }) => (
    <h3 className={`text-xl font-bold ${className}`} {...props}>
        {children}
    </h3>
);

const CardBody = ({ children, className = '', ...props }) => (
    <div className={`p-5 ${className}`} {...props}>
        {children}
    </div>
);

const CardFooter = ({ children, className = '', ...props }) => (
    <div className={`p-5 border-t border-[#edeff2] bg-[#f6f7fb] ${className}`} {...props}>
        {children}
    </div>
);

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
