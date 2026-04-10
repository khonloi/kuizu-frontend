import React, { useState, useEffect } from 'react';
import {
    Home,
    BookOpen,
    Folder,
    GraduationCap,
    Menu,
    ChevronLeft,
    Shield,
    History as HistoryIcon,
    BarChart3,
    Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, ComingSoonModal } from '../../ui';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

const Sidebar = ({ isCollapsed, onToggle, activePath = '/dashboard', isMobile, onClose, isMobileOpen }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();

    const isAdmin = user?.role === 'ROLE_ADMIN';

    const handleLogout = () => {
        logout();
        toast.info('Logged out successfully', 6000);
        navigate('/auth');
    };

    const handleNavigation = (path) => {
        navigate(path);
        if (isMobile && onClose) onClose();
    };

    const mainLinks = [
        { icon: <Home size={22} />, label: 'Home', path: '/dashboard' },
    ];

    const adminLinks = [
        { icon: <Shield size={22} />, label: 'User Management', path: '/admin/users' },
        { icon: <BookOpen size={22} />, label: 'Set Submissions', path: '/admin/submissions/flashcards' },
        { icon: <GraduationCap size={22} />, label: 'Class Submissions', path: '/admin/submissions/classes' },
        { icon: <HistoryIcon size={22} />, label: 'Moderation History', path: '/admin/history' },
        { icon: <BarChart3 size={22} />, label: 'Statistics', path: '/admin/stats/users' },
    ];

    const quickStartLinks = [
        { icon: <Folder size={22} />, label: 'Folders', path: '/folders' },
        { icon: <BookOpen size={22} />, label: 'Flashcards', path: '/flashcard-sets' },
        { icon: <GraduationCap size={22} />, label: 'Classes', path: '/classes' },
    ];

    // Tailwind Class Mapping
    const sidebarClasses = [
        "bg-white border-r-2 border-[#edeff2] fixed z-[1000] flex flex-col transition-all duration-300 overflow-hidden",
        isMobile
            ? `h-screen top-0 left-0 z-[2000] p-3 ${isMobileOpen ? 'translate-x-0 shadow-[20px_0_60px_rgba(0,0,0,0.1)]' : '-translate-x-full'}`
            : `${isCollapsed ? 'w-20' : 'w-60'} ${isAdmin ? 'top-0 h-screen p-3' : 'top-20 h-[calc(100vh-theme(spacing.20))] py-6 px-3'}`,
    ].join(" ");

    return (
        <aside className={sidebarClasses}>
            <div className="flex-1 flex flex-col gap-4">
                {!isAdmin && (
                    <div className="flex flex-col gap-1">
                        {mainLinks.map((link, index) => (
                            <div
                                key={index}
                                className={`flex items-center gap-3.5 p-3 rounded-xl cursor-pointer transition-all duration-200
                                    ${activePath.startsWith(link.path)
                                        ? 'bg-[#ededff] text-[#4255ff]'
                                        : 'text-[#586380] hover:bg-[#f6f7fb] hover:text-[#282e3e]'
                                    }`}
                                onClick={() => handleNavigation(link.path)}
                            >
                                <span className="flex items-center justify-center min-w-[22px]">{link.icon}</span>
                                {(!isCollapsed || isMobile) && <span className="text-[15px] font-bold whitespace-nowrap">{link.label}</span>}
                            </div>
                        ))}
                    </div>
                )}

                {isAdmin && (
                    <div className="flex flex-col gap-1">
                        {(!isCollapsed || isMobile) && (
                            <h6 className="text-[13px] font-black text-[#586380] px-3.5 py-3 tracking-[0.05em] uppercase">Administration</h6>
                        )}
                        {adminLinks.map((link, index) => (
                            <div
                                key={index}
                                className={`flex items-center gap-3.5 p-3 rounded-xl cursor-pointer transition-all duration-200
                                    ${activePath.startsWith(link.path)
                                        ? 'bg-[#ededff] text-[#4255ff]'
                                        : 'text-[#586380] hover:bg-[#f6f7fb] hover:text-[#282e3e]'
                                    }`}
                                onClick={() => handleNavigation(link.path)}
                            >
                                <span className="flex items-center justify-center min-w-[22px]">{link.icon}</span>
                                {(!isCollapsed || isMobile) && <span className="text-[15px] font-bold whitespace-nowrap">{link.label}</span>}
                            </div>
                        ))}
                    </div>
                )}

                {!isAdmin && (
                    <>
                        <div className="h-px bg-[#edeff2] mx-3 my-2"></div>
                        <div className="flex flex-col gap-1">
                            {(!isCollapsed || isMobile) && (
                                <h6 className="text-[13px] font-black text-[#586380] px-3.5 py-3 tracking-[0.05em] uppercase">Get started</h6>
                            )}
                            {quickStartLinks.map((link, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center gap-3.5 p-3 rounded-xl cursor-pointer transition-all duration-200
                                        ${activePath.startsWith(link.path)
                                            ? 'bg-[#ededff] text-[#4255ff]'
                                            : 'text-[#586380] hover:bg-[#f6f7fb] hover:text-[#282e3e]'
                                        }`}
                                    onClick={() => handleNavigation(link.path)}
                                >
                                    <span className="flex items-center justify-center min-w-[22px]">{link.icon}</span>
                                    {(!isCollapsed || isMobile) && <span className="text-[15px] font-bold whitespace-nowrap">{link.label}</span>}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <div className={`pt-3 border-t border-[#edeff2] ${(isCollapsed && !isMobile) ? 'flex justify-center' : ''}`}>
                {!isMobile && (
                    <button
                        className={`w-full flex items-center gap-3 p-3 text-[#586380] font-bold text-sm rounded-xl hover:bg-[#f6f7fb] hover:text-[#282e3e] transition-all
                            ${isCollapsed ? 'justify-center' : ''}`}
                        onClick={onToggle}
                    >
                        {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
                        {!isCollapsed && <span>Collapse</span>}
                    </button>
                )}

                {(isAdmin || isMobile) && user && (
                    <div className={`flex items-center gap-3 p-3 ${isCollapsed && !isMobile ? 'justify-center' : ''}`}>
                        <img
                            src={user.profilePictureUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'}
                            alt="Profile"
                            className="w-9 h-9 rounded-full cursor-pointer border-2 border-transparent hover:border-[#4255ff] hover:scale-105 transition-all"
                            onClick={() => handleNavigation('/profile')}
                        />
                        {(!isCollapsed || isMobile) && (
                            <div className="flex-1 flex items-center min-w-0">
                                {isMobile && <span className="font-bold text-[#282e3e] truncate">{user.username}</span>}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleLogout}
                                    className="h-9 px-3 rounded-full text-sm font-bold ml-auto"
                                >
                                    Log Out
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
