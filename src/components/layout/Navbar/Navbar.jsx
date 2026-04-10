import React, { useState, useEffect } from 'react';
import { Search, Plus, ChevronDown, Menu, Book, Zap, Users, GraduationCap, Palette, Languages, Calculator, FlaskConical, Layout, BookOpen, Folder } from 'lucide-react';
import { Button, Dropdown, SearchBar } from '../../ui';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useModal } from '@/context/ModalContext';
import { useNavigate } from 'react-router-dom';
import { searchClasses } from '@/api/class';


const Navbar = ({ isSidebarCollapsed, onToggleSidebar, isMobile, onOpenMobileMenu, showSidebarToggle = true }) => {
    const { user, logout } = useAuth();
    const { openSetModal } = useModal();
    const navigate = useNavigate();
    const toast = useToast();

    const handleSearchInput = async (query) => {
        const results = await searchClasses(query);
        return results.map(cls => ({
            id: cls.classId,
            title: cls.className,
            subtitle: `by ${cls.ownerDisplayName}`,
            original: cls
        }));
    };

    const handleLogout = () => {
        logout();
        toast.info('Logged out successfully', 6000);
        navigate('/auth');
    };

    const handleResultClick = (result) => {
        navigate(`/classes/${result.id}`);
    };

    const handleSearchEnter = (query) => {
        navigate(`/search?q=${encodeURIComponent(query)}`);
    };

    const studyToolsItems = [
        { label: 'Flashcard', icon: <Book size={16} /> },
        { label: 'Quiz', icon: <Zap size={16} /> },
        { label: 'Class', icon: <Users size={16} /> },
    ];

    const subjectItems = [
        { label: 'Exams', icon: <GraduationCap size={16} /> },
        { label: 'Arts and Humanities', icon: <Palette size={16} /> },
        { label: 'Languages', icon: <Languages size={16} /> },
        { label: 'Mathematics', icon: <Calculator size={16} /> },
        { label: 'Science', icon: <FlaskConical size={16} /> },
        { label: 'Others', icon: <Layout size={16} /> },
    ];

    const createItems = [
        { label: 'Flashcard Set', icon: <BookOpen size={16} />, type: 'flashcard-set' },
        { label: 'Folder', icon: <Folder size={16} />, path: '/create/folder' },
        { label: 'Class', icon: <GraduationCap size={16} />, path: '/create/class' },
    ];

    const handleDropdownItemClick = (item) => {
        if (item.type === 'flashcard-set') {
            openSetModal(null, (newSet) => {
                navigate(`/flashcard-sets/${newSet.setId}`);
            });
        } else if (item.path) {
            navigate(item.path);
        } else {
            navigate(`/search?q=${encodeURIComponent(item.label)}`);
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 h-20 bg-white border-b-2 border-[#edeff2] z-[50]">
            <div className="h-full px-6 flex items-center justify-between gap-5 mx-auto max-w-[1400px] md:px-4 md:gap-3">
                <div className="flex items-center gap-6">
                    {showSidebarToggle && (
                        <button
                            className="bg-transparent border-none text-[#282e3e] flex items-center justify-center p-2 -ml-2 cursor-pointer rounded-lg hover:bg-[#f3f5f7] lg:hidden flex"
                            onClick={onOpenMobileMenu}
                        >
                            <Menu size={24} />
                        </button>
                    )}
                    <div
                        className="text-2xl font-extrabold text-[#4255ff] cursor-pointer tracking-tight hidden sm:block"
                        onClick={() => navigate('/dashboard')}
                    >
                        Kuizu
                    </div>
                    <div className="hidden lg:flex items-center gap-7">
                        <Dropdown
                            label="Study Tools"
                            items={studyToolsItems}
                            onItemClick={handleDropdownItemClick}
                            variant="nav"
                        />
                        <Dropdown
                            label="Subjects"
                            items={subjectItems}
                            onItemClick={handleDropdownItemClick}
                            variant="nav"
                        />
                    </div>
                </div>

                <div className="flex-1 max-w-[800px] md:max-w-none">
                    <SearchBar
                        onSearch={handleSearchInput}
                        onResultClick={handleResultClick}
                        onEnter={handleSearchEnter}
                        placeholder={isMobile ? "Search..." : "Search for study guides"}
                    />
                </div>

                <div className="flex items-center gap-5 md:gap-2">
                    <div className="hidden sm:flex items-center gap-5">
                        <Dropdown
                            items={createItems}
                            onItemClick={handleDropdownItemClick}
                            variant="create-pill"
                            showChevron={false}
                        >
                            <Plus size={20} strokeWidth={3} />
                            <span>Create</span>
                        </Dropdown>
                        {user && (
                            <div className="flex items-center gap-3">
                                <img
                                    src={user.profilePictureUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'}
                                    alt="Profile"
                                    className="w-9 h-9 rounded-full cursor-pointer border-2 border-transparent transition-all hover:border-[#4255ff] hover:scale-105"
                                    onClick={() => navigate('/profile')}
                                />
                            </div>
                        )}
                        {!user && (
                            <Button
                                variant="primary"
                                size="sm"
                                className="!h-11 !px-6 !text-[15px] !font-bold !rounded-full border-none"
                                onClick={() => navigate('/auth')}
                            >
                                Log in
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
