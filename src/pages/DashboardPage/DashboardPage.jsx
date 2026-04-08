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
import './DashboardPage.css';

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
            <div className="dashboard-container">
            {showCelebration && (
                <div className="celebration-overlay">
                    <Sparkles className="celebration-icon" />
                    <span>Great job! Content created.</span>
                </div>
            )}

            {/* Flashcard Sets Section */}
            <section className="dashboard-section">
                <div className="dashboard-section-header">
                    <h2>Recent Flashcard Sets</h2>
                    <div className="section-actions">
                        <Button variant="outline" size="sm" onClick={() => openSetModal(null, handleSetCreated)}>New Flashcard Set</Button>
                        <Button variant="ghost" size="sm" onClick={() => navigate('/flashcard-sets')}>View all</Button>
                    </div>
                </div>

                {flashcardSets.length > 0 ? (
                    <div className="dashboard-grid">
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
            <section className="dashboard-section">
                <div className="dashboard-section-header">
                    <h2>My Folders</h2>
                    <div className="section-actions">
                        <Button variant="outline" size="sm" onClick={() => openFolderModal(null, handleFolderCreated)}>New Folder</Button>
                        <Button variant="ghost" size="sm" onClick={() => navigate('/folders')}>View all</Button>
                    </div>
                </div>

                {folders.length > 0 ? (
                    <div className="dashboard-grid">
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
            <section className="dashboard-section">
                <div className="dashboard-section-header">
                    <h2>My Classes</h2>
                    <div className="section-actions">
                        {isTeacherOrAdmin && (
                            <Button variant="outline" size="sm" onClick={() => openClassModal(null, handleClassCreated)}>Create Class</Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => navigate('/classes')}>View all</Button>
                    </div>
                </div>

                {classes.length > 0 ? (
                    <div className="dashboard-grid">
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
                <section className="dashboard-section">
                    <div className="dashboard-section-header">
                        <h2>Suggested Flashcard Sets</h2>
                        <div className="section-actions">
                            <Button variant="ghost" size="sm" onClick={() => navigate('/flashcard-sets')}>View all</Button>
                        </div>
                    </div>
                    <div className="dashboard-grid">
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
                <section className="dashboard-section">
                    <div className="dashboard-section-header">
                        <h2>Suggested Folders</h2>
                        <div className="section-actions">
                            <Button variant="ghost" size="sm" onClick={() => navigate('/folders')}>View all</Button>
                        </div>
                    </div>
                    <div className="dashboard-grid">
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
