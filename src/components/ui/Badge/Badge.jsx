const Badge = ({ children, variant = 'primary', size = 'md', className = '' }) => {
    const variants = {
        primary: 'bg-[#ededff] text-[#4255ff]',
        secondary: 'bg-[#f6f7fb] text-[#586380]',
        success: 'bg-[#ecfdf5] text-[#10b981]',
        warning: 'bg-[#fffbeb] text-[#f59e0b]',
        error: 'bg-[#fef2f2] text-[#ef4444]',
        info: 'bg-[#eff6ff] text-[#3b82f6]',
        outline: 'bg-transparent border border-[#edeff2] text-[#586380]'
    };

    const sizes = {
        sm: 'px-2 py-0.5 text-[10px]',
        md: 'px-2.5 py-1 text-[11px]',
        lg: 'px-3 py-1.5 text-[12px]'
    };

    return (
        <span className={`inline-flex items-center justify-center font-bold uppercase tracking-wider rounded-full whitespace-nowrap transition-all
            ${variants[variant] || variants.primary}
            ${sizes[size] || sizes.md}
            ${className}`}
        >
            {children}
        </span>
    );
};

export default Badge;
