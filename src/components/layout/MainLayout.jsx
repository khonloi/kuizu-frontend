import React, { useState, useEffect } from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import Sidebar from './Sidebar/Sidebar';
import { Loader } from '../ui';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const MainLayout = ({ 
    children, 
    isLoading = false, 
    showSidebar = true, 
    showNavbar = true, 
    showFooter = true,
    fullHeight = false
}) => {
    const { user } = useAuth();
    const location = useLocation();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
        const saved = localStorage.getItem('sidebar-collapsed');
        return saved === 'true' ? true : false;
    });
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            if (!mobile) setIsMobileSidebarOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        if (isMobile) {
            setIsMobileSidebarOpen(!isMobileSidebarOpen);
        } else {
            setIsSidebarCollapsed(prev => {
                const newState = !prev;
                localStorage.setItem('sidebar-collapsed', newState.toString());
                return newState;
            });
        }
    };

    const isAdmin = user?.role === 'ROLE_ADMIN';
    const effectiveShowSidebar = showSidebar && !isAdmin;
    const effectiveShowNavbar = showNavbar && !isAdmin;

    return (
        <div className={`layout-container ${isSidebarCollapsed && effectiveShowSidebar ? 'sidebar-collapsed' : ''} ${!effectiveShowSidebar ? 'no-sidebar' : ''} ${!effectiveShowNavbar ? 'no-navbar' : ''} ${isMobile ? 'is-mobile' : ''} ${isMobileSidebarOpen ? 'mobile-sidebar-open' : ''} ${fullHeight ? 'h-dvh overflow-hidden' : 'min-h-dvh'}`}>
            {effectiveShowNavbar && (
                <Navbar
                    isSidebarCollapsed={isSidebarCollapsed}
                    onToggleSidebar={toggleSidebar}
                    isMobile={isMobile}
                    onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
                    showSidebarToggle={effectiveShowSidebar}
                />
            )}

            <div className={`layout-body flex ${effectiveShowNavbar ? 'pt-20' : ''} ${fullHeight ? 'h-full overflow-hidden' : ''}`}>
                {isMobileSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsMobileSidebarOpen(false)} />}

                {effectiveShowSidebar && (
                    <Sidebar
                        isCollapsed={isMobile ? false : isSidebarCollapsed}
                        onToggle={toggleSidebar}
                        activePath={location.pathname}
                        isMobile={isMobile}
                        isMobileOpen={isMobileSidebarOpen}
                        onClose={() => setIsMobileSidebarOpen(false)}
                    />
                )}

                <div className={`content-wrapper ${isSidebarCollapsed && effectiveShowSidebar ? 'collapsed' : ''} ${!effectiveShowSidebar ? 'full-width' : ''} ${fullHeight ? 'h-full overflow-hidden' : ''}`}>
                    <main className={`main-content ${isLoading ? 'is-loading' : ''} ${fullHeight ? 'h-full overflow-y-auto' : ''}`}>
                        {isLoading ? (
                            <Loader fullPage={false} size="lg" />
                        ) : (
                            children
                        )}
                    </main>
                    {!isLoading && showFooter && <Footer />}
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
