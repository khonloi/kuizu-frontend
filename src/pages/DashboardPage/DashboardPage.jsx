import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyClasses } from '@/api/class';
import { getMyFolders, getPublicFolders } from '@/api/folder';
import { getMyFlashcardSets, getFlashcardSetById, getPublicFlashcardSets } from '@/api/flashcards';
import { useAuth } from '@/context/AuthContext';
import { useModal } from '@/context/ModalContext';
import { FolderOpen, Globe, BookOpen, Sparkles } from 'lucide-react';
import { Button, Card, Loader, EmptyState } from '@/components/ui';
import MainLayout from '@/components/layout';

const DashboardPage = () => {
    const { user } = useAuth();
    const { openSetModal, openFolderModal, openClassModal } = useModal();
    const [classes, setClasses] = useState([]);
    const [folders, setFolders] = useState([]);
    const [publicFolders, setPublicFolders] = useState([]);
    const [flashcardSets, setFlashcardSets] = useState([]);
    const [publicFlashcardSets, setPublicFlashcardSets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showCelebration, setShowCelebration] = useState(false);
    const navigate = useNavigate();

    const isTeacherOrAdmin = user?.role === 'ROLE_TEACHER' || user?.role === 'ROLE_ADMIN' || user?.role === 'ROLE_SUPER_ADMIN';

    const fetchDashboardData = async () => {
        try {
            setIsLoading(true);
            const [classData, folderData, pubFolderData, mySetsData, publicSetsData] = await Promise.all([
                getMyClasses(),
                getMyFolders(),
                getPublicFolders(),
                getMyFlashcardSets(),
                getPublicFlashcardSets()
            ]);

            // Get recent sets from localStorage
            const recentIds = JSON.parse(localStorage.getItem('recent_sets') || '[]');
            let recentSets = [];

            if (recentIds.length > 0) {
                const results = await Promise.allSettled(
                    recentIds.map(id => {
                        const existing = mySetsData.find(s => String(s.setId) === String(id));
                        if (existing) return Promise.resolve(existing);
                        return getFlashcardSetById(id);
                    })
                );
                recentSets = results
                    .filter(r => r.status === 'fulfilled')
                    .map(r => r.value);
            }

            const displaySets = recentSets.length > 0 ? recentSets : mySetsData;

            setClasses(classData);
            setFolders(folderData);
            setPublicFolders(pubFolderData);
            setFlashcardSets(displaySets);
            setPublicFlashcardSets(publicSetsData);
        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const triggerCelebration = () => {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
    };

    const handleClassCreated = (newClass) => {
        setClasses(prev => [newClass, ...prev]);
        triggerCelebration();
    };

    const handleFolderCreated = (newFolder) => {
        setFolders(prev => [newFolder, ...prev]);
        triggerCelebration();
    };

    const handleSetCreated = (newSet) => {
        setFlashcardSets(prev => [newSet, ...prev]);
        triggerCelebration();
    };

    return (
        <MainLayout isLoading={isLoading}>
            <div className="p-6">
                {showCelebration && (
                    <div className="fixed top-6 right-6 bg-white py-4 px-6 rounded-xl shadow-xl flex items-center gap-3 animate-slide-down z-[1000]">
                        <Sparkles className="text-[#4255ff]" />
                        <span className="font-semibold text-[#282e3e]">Great job! Content created.</span>
                    </div>
                )}
                <section className="mb-12 md:mb-8">
                    <div className="flex justify-between items-center mb-6 gap-4 md:mb-4">
                        <h2 className="m-0 text-2xl font-bold text-[#282e3e]">Recent Flashcard Sets</h2>
                        <div className="flex gap-3 items-center flex-shrink-0">
                            <Button variant="outline" size="sm" onClick={() => openSetModal(null, handleSetCreated)}>New Flashcard Set</Button>
                            <Button variant="ghost" size="sm" onClick={() => navigate('/flashcard-sets')}>View all</Button>
                        </div>
                    </div>

                    {flashcardSets.length > 0 ? (
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6 lg:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] lg:gap-5 md:grid-cols-1 md:gap-4">
                            {flashcardSets.slice(0, 4).map(set => (
                                <Card
                                    key={set.id || set.setId}
                                    onClick={() => navigate(`/flashcard-sets/${set.id || set.setId}`)}
                                    title={set.title}
                                    badge={`${set.cardCount || 0} terms`}
                                    description={set.description}
                                    ownerName={set.ownerDisplayName}
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            icon={BookOpen}
                            title="No sets yet"
                            description="Start creating your first set to begin studying!"
                            action={<Button variant="primary" onClick={() => openSetModal(null, handleSetCreated)}>Create Flashcard Set</Button>}
                        />
                    )}
                </section>

                {/* Folders Section */}
                <section className="mb-12 md:mb-8">
                    <div className="flex justify-between items-center mb-6 gap-4 md:mb-4">
                        <h2 className="m-0 text-2xl font-bold text-[#282e3e]">My Folders</h2>
                        <div className="flex gap-3 items-center flex-shrink-0">
                            <Button variant="outline" size="sm" onClick={() => openFolderModal(null, handleFolderCreated)}>New Folder</Button>
                            <Button variant="ghost" size="sm" onClick={() => navigate('/folders')}>View all</Button>
                        </div>
                    </div>

                    {folders.length > 0 ? (
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6 lg:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] lg:gap-5 md:grid-cols-1 md:gap-4">
                            {folders.map(folder => (
                                <Card
                                    key={folder.id || folder.folderId}
                                    onClick={() => navigate(`/folders/${folder.id || folder.folderId}`)}
                                    title={folder.name}
                                    badge={`${folder.setCount} sets`}
                                    description={folder.description}
                                    ownerName={folder.ownerDisplayName}
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            icon={FolderOpen}
                            title="No folders yet"
                            description="Organize your sets into folders for better study flow."
                            action={<Button variant="primary" onClick={() => openFolderModal(null, handleFolderCreated)}>Create Folder</Button>}
                        />
                    )}
                </section>

                {/* Classes Section */}
                <section className="mb-12 md:mb-8">
                    <div className="flex justify-between items-center mb-6 gap-4 md:mb-4">
                        <h2 className="m-0 text-2xl font-bold text-[#282e3e]">My Classes</h2>
                        <div className="flex gap-3 items-center flex-shrink-0">
                            {isTeacherOrAdmin && (
                                <Button variant="outline" size="sm" onClick={() => openClassModal(null, handleClassCreated)}>Create Class</Button>
                            )}
                            <Button variant="ghost" size="sm" onClick={() => navigate('/classes')}>View all</Button>
                        </div>
                    </div>

                    {classes.length > 0 ? (
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6 lg:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] lg:gap-5 md:grid-cols-1 md:gap-4">
                            {classes.map(cls => (
                                <Card
                                    key={cls.classId}
                                    onClick={() => navigate(`/classes/${cls.classId}`)}
                                    title={cls.className}
                                    badge={cls.status === 'PENDING' ? 'Pending Review' : (cls.status === 'REJECTED' ? 'Rejected' : 'Class')}
                                    badgeVariant={cls.status === 'PENDING' ? 'warning' : (cls.status === 'REJECTED' ? 'error' : 'primary')}
                                    description={cls.description}
                                    ownerName={cls.ownerDisplayName}
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            icon={Globe}
                            title="No classes yet"
                            description="You hasn't joined any classes yet. Join a class to study with others!"
                            action={<Button variant="primary" onClick={() => navigate('/classes')}>Explore Classes</Button>}
                        />
                    )}
                </section>

                {/* Suggested Public Sets */}
                {publicFlashcardSets.length > 0 && (
                    <section className="mb-12 md:mb-8">
                        <div className="flex justify-between items-center mb-6 gap-4 md:mb-4">
                            <h2 className="m-0 text-2xl font-bold text-[#282e3e]">Suggested Flashcard Sets</h2>
                            <div className="flex gap-3 items-center flex-shrink-0">
                                <Button variant="ghost" size="sm" onClick={() => navigate('/flashcard-sets')}>View all</Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6 lg:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] lg:gap-5 md:grid-cols-1 md:gap-4">
                            {publicFlashcardSets.slice(0, 4).map(set => (
                                <Card
                                    key={set.id || set.setId}
                                    onClick={() => navigate(`/flashcard-sets/${set.id || set.setId}`)}
                                    title={set.title}
                                    badge={`${set.cardCount || 0} terms`}
                                    description={set.description}
                                    ownerName={set.ownerDisplayName}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {/* Suggested Public Folders */}
                {publicFolders.length > 0 && (
                    <section className="mb-12 md:mb-8">
                        <div className="flex justify-between items-center mb-6 gap-4 md:mb-4">
                            <h2 className="m-0 text-2xl font-bold text-[#282e3e]">Suggested Folders</h2>
                            <div className="flex gap-3 items-center flex-shrink-0">
                                <Button variant="ghost" size="sm" onClick={() => navigate('/folders')}>View all</Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6 lg:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] lg:gap-5 md:grid-cols-1 md:gap-4">
                            {publicFolders.slice(0, 4).map(folder => (
                                <Card
                                    key={folder.id || folder.folderId}
                                    onClick={() => navigate(`/folders/${folder.id || folder.folderId}`)}
                                    title={folder.name}
                                    badge={`${folder.setCount} sets`}
                                    description={folder.description}
                                    ownerName={folder.ownerDisplayName}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </MainLayout>
    );
};

export default DashboardPage;
