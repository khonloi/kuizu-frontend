import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
    const [isExiting, setIsExiting] = useState(false);
    const [timeLeft, setTimeLeft] = useState(Math.ceil(duration / 1000));

    useEffect(() => {
        const timer = setTimeout(() => {
            handleClose();
        }, duration);

        const countdown = setInterval(() => {
            setTimeLeft(prev => Math.max(0, prev - 1));
        }, 1000);

        return () => {
            clearTimeout(timer);
            clearInterval(countdown);
        };
    }, [duration]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            onClose();
        }, 300); // Match CSS transition
    };

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle size={18} />;
            case 'error':
                return <AlertCircle size={18} />;
            case 'info':
            default:
                return <Info size={18} />;
        }
    };

    const typeStyles = {
        success: 'border-l-4 border-l-[#10b981]',
        error: 'border-l-4 border-l-[#ff725e]',
        info: 'border-l-4 border-l-[#4255ff]'
    };

    const iconStyles = {
        success: 'bg-[#10b981] text-white',
        error: 'bg-[#ff725e] text-white',
        info: 'bg-[#4255ff] text-white'
    };

    return (
        <div className={`flex items-center gap-3 p-3 sm:p-4 sm:px-5 rounded-2xl bg-white/90 backdrop-blur-md shadow-xl border border-[#edeff2] text-[#282e3e] font-medium pointer-events-auto transition-all duration-300 ease-out animate-toast-slide-up relative overflow-hidden ${typeStyles[type]} ${isExiting ? 'opacity-0 translate-y-5 scale-95' : ''}`}>
            <div className={`flex items-center justify-center w-6 h-6 rounded-full shrink-0 ${iconStyles[type]}`}>
                {getIcon()}
            </div>
            <div className="flex-1 text-sm">
                {message}
            </div>
            <div className="flex items-center gap-3 ml-3">
                <span className="text-xs font-bold text-[#586380] bg-[#f1f5f9] px-2 py-0.5 rounded-full min-w-8 text-center">{timeLeft}s</span>
                <button className="bg-transparent border-none text-[#586380] cursor-pointer text-xl p-1 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-200" onClick={handleClose}>
                    <X size={16} />
                </button>
            </div>
            <div
                className="absolute bottom-0 left-0 h-1 bg-current opacity-30 w-full origin-left animate-toast-progress"
                style={{ animationDuration: `${duration}ms` }}
            ></div>
        </div>

    );
};

export default Toast;
