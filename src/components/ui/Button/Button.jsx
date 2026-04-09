import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    leftIcon,
    rightIcon,
    isLoading,
    disabled,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl cursor-pointer transition-all duration-200 border-2 border-transparent gap-3 relative outline-none active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';

    const variants = {
        primary: 'bg-[#4255ff] text-white hover:bg-[#3444cc] hover:shadow-lg',
        secondary: 'bg-[#f6f7fb] text-[#282e3e] hover:bg-[#edeff2]',
        outline: 'bg-transparent border-[#edeff2] text-[#282e3e] hover:border-[#4255ff] hover:text-[#4255ff]',
        ghost: 'bg-transparent text-[#4255ff] hover:bg-white hover:shadow-sm',
        danger: 'bg-[#ff725e] text-white hover:bg-[#e56350] hover:shadow-lg',
        white: 'bg-white text-[#4255ff]'
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm rounded-base',
        md: 'px-6 py-3 text-base rounded-base',
        lg: 'px-8 py-4 text-lg rounded-base'
    };

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
        <button className={classes} disabled={disabled || isLoading} {...props}>
            {isLoading && (
                <span className={`animate-spin rounded-full border-2 border-t-current w-[18px] h-[18px] ${variant === 'secondary' ? 'border-[#4255ff]/30' : 'border-white/30'}`} />
            )}
            {!isLoading && leftIcon && <span className="flex items-center justify-center">{leftIcon}</span>}
            <span className="flex items-center leading-none gap-1">{children}</span>
            {!isLoading && rightIcon && <span className="flex items-center justify-center">{rightIcon}</span>}
        </button>
    );
};

export default Button;
