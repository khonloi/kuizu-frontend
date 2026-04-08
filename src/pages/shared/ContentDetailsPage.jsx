import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Play, Plus, Pencil, Trash2, User, Layers, BookOpen, FolderOpen, Users, FileText, UserPlus } from 'lucide-react';
import './ContentDetailsPage.css';
import { Button, Card, Loader, ConfirmationModal, Badge, EmptyState, Tabs } from '@/components/ui';
import { useModal } from '@/context/ModalContext';
import MainLayout from '@/components/layout';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

const ContentDetailsPage = ({ 
    type = 'sets', // 'sets', 'folders', or 'classes'
    getById,
    getChildren,
    deleteChild,
    processRequest,
    openEditModal,
    openAddChildModal,
    openEditChildModal,
    backPath = '/flashcard-sets',
    id: propId
}) => {
    const params = useParams();
    const id = propId || params.id || params.setId || params.folderId || params.classId;
    const navigate = useNavigate();
    const { user } = useAuth();
    const { success: toastSuccess, error: toastError } = useToast();
    
    const [item, setItem] = useState(null);
    const [children, setChildren] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isDeleting, setIsDeleting] = useState(false);
    const [childToDelete, setChildToDelete] = useState(null);
    const [activeTag, setActiveTag] = useState('all');
    const [activeTab, setActiveTab] = useState('materials');

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await getById(id);
            setItem(data);
            
            // Set children based on type
            if (type === 'sets') {
                const childrenData = getChildren ? await getChildren(id) : [];
                setChildren(childrenData);
            } else if (type === 'folders') {
                setChildren(data.sets || []);
            } else if (type === 'classes') {
                setChildren(data.classMaterials || []);
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(`Could not load ${type} details.`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id, type]);

    const handleUpdateSuccess = (updatedItem) => {
        setItem(updatedItem);
        if (type === 'folders') setChildren(updatedItem.sets || []);
        if (type === 'classes') setChildren(updatedItem.classMaterials || []);
        toastSuccess(`${type.charAt(0).toUpperCase() + type.slice(1, -1)} updated successfully.`);
    };

    const handleAddChildClick = () => {
        if (openAddChildModal) {
            openAddChildModal(id, fetchData);
        }
    };

    const handleEditChildClick = (childId) => {
        if (openEditChildModal) {
            openEditChildModal(id, childId, fetchData);
        }
    };

    const handleDeleteChild = async () => {
        if (!childToDelete) return;
        try {
            setIsDeleting(true);
            await deleteChild(id, childToDelete, activeTab);
            
            if (type === 'classes') {
                if (activeTab === 'materials') {
                    setChildren(children.filter(c => c.materialId !== childToDelete));
                } else if (activeTab === 'members') {
                    setItem(prev => ({
                        ...prev,
                        members: prev.members.filter(m => m.userId !== childToDelete)
                    }));
                }
            } else {
                setChildren(children.filter(c => (c.setId || c.cardId) !== childToDelete));
            }
            
            setChildToDelete(null);
            toastSuccess('Removed successfully.');
        } catch (err) {
            toastError('Failed to remove item.');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleProcessRequest = async (requestId, status) => {
        if (!processRequest) return;
        try {
            await processRequest(id, requestId, status);
            toastSuccess(`Request ${status === 'ACCEPTED' ? 'accepted' : 'rejected'}.`);
            fetchData(); // Refresh to update members and requests
        } catch (err) {
            toastError('Failed to process request.');
        }
    };

    if (loading) return (
        <MainLayout isLoading={true}>
            <div style={{ padding: '100px 0', textAlign: 'center' }}>
                <Loader text="Loading details..." />
            </div>
        </MainLayout>
    );
    
    if (error || !id) return (
        <MainLayout>
            <div style={{ padding: '100px 40px' }}>
                <EmptyState
                    icon={BookOpen}
                    title="Oops! Something went wrong"
                    description={error || "Item not found."}
                    action={<Button variant="primary" onClick={() => navigate(backPath)}>Back to List</Button>}
                />
            </div>
        </MainLayout>
    );

    const isOwner = user?.userId === item?.ownerId || user?.userId === item?.ownerUserId || user?.username === item?.ownerUsername;

    const filteredChildren = children.filter(child => {
        if (type !== 'folders' || activeTag === 'all') return true;
        const category = item.categories?.find(c => c.name === activeTag);
        return category?.sets?.some(s => s.setId === child.setId);
    });

    const getItemTitle = () => item.title || item.name || item.className;

    return (
        <MainLayout>
            <div className="content-details-container">
                <Button variant="ghost" className="back-link" onClick={() => navigate(backPath)}>
                    <ChevronLeft size={20} />
                    Back to {type === 'sets' ? 'Sets' : type === 'folders' ? 'Folders' : 'Classes'}
                </Button>

                <div className="content-hero">
                    <div className="content-info-main">
                        <h1 className="content-title">
                            {getItemTitle()}
                            {item.status && item.status !== 'ACTIVE' && item.status !== 'APPROVED' && (
                                <Badge variant={item.status === 'PENDING' ? 'warning' : 'error'} style={{ marginLeft: '12px', verticalAlign: 'middle' }}>
                                    {item.status === 'PENDING' ? 'Pending Review' : 'Rejected'}
                                </Badge>
                            )}
                            {(item.status === 'ACTIVE' || item.status === 'APPROVED') && (
                                <Badge variant="success" style={{ marginLeft: '12px', verticalAlign: 'middle' }}>Active</Badge>
                            )}
                        </h1>
                        <p className="content-description">{item.description || 'No description provided.'}</p>

                        <div className="content-meta">
                            <div className="meta-item">
                                <User size={16} />
                                <span>Created by <strong>{item.ownerDisplayName}</strong></span>
                            </div>
                            <div className="meta-item">
                                {type === 'sets' ? <Layers size={16} /> : (type === 'folders' ? <FolderOpen size={16} /> : <Users size={16} />)}
                                <span>
                                    {type === 'sets' ? `${children.length} terms` : 
                                     type === 'folders' ? `${children.length} sets` : 
                                     `${item.members?.length || 0} members`}
                                </span>
                            </div>
                        </div>

                        {type === 'folders' && item.categories?.length > 0 && (
                            <div className="folder-tags">
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className={`tag-btn ${activeTag === 'all' ? 'active' : ''}`}
                                    onClick={() => setActiveTag('all')}
                                >
                                    All
                                </Button>
                                {item.categories.map(cat => (
                                    <Button 
                                        key={cat.name}
                                        variant="ghost" 
                                        size="sm" 
                                        className={`tag-btn ${activeTag === cat.name ? 'active' : ''}`}
                                        onClick={() => setActiveTag(cat.name)}
                                    >
                                        {cat.name}
                                    </Button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="content-actions">
                        {type === 'sets' && (
                            <>
                                <Button
                                    className="study-btn w-full"
                                    size="lg"
                                    variant="outline"
                                    onClick={() => navigate(`/study/${id}`, { state: { cards: children } })}
                                    leftIcon={<BookOpen size={20} />}
                                >
                                    Study
                                </Button>
                                <Button
                                    className="play-btn w-full"
                                    size="lg"
                                    variant="outline"
                                    onClick={() => navigate(`/quiz/${id}`, { state: { cards: children } })}
                                    disabled={children.length < 2}
                                    leftIcon={<Play size={20} fill="currentColor" />}
                                >
                                    Take Quiz
                                </Button>
                            </>
                        )}
                        
                        {type === 'folders' && (
                             <Button
                                className="study-btn w-full"
                                size="lg"
                                variant="outline"
                                onClick={() => {
                                    const allCards = children.reduce((acc, set) => [...acc, ...(set.flashcards || [])], []);
                                    if (allCards.length === 0) {
                                         toastError("No flashcards found in this folder's sets.");
                                         return;
                                    }
                                    navigate(`/study/folder-${id}`, { state: { cards: allCards, fromLabel: 'Back to Folder', folderName: item.name } });
                                }}
                                leftIcon={<BookOpen size={20} />}
                            >
                                Study All
                            </Button>
                        )}

                        {type === 'classes' && !isOwner && (
                            item.isMember ? (
                                <Button variant="outline" size="lg" className="w-full text-red-500 hover:bg-red-50" onClick={() => openAddChildModal('leave')}>
                                    Leave Class
                                </Button>
                            ) : (
                                <Button variant="primary" size="lg" className="w-full" onClick={() => openAddChildModal('join')}>
                                    Join Class
                                </Button>
                            )
                        )}

                        {isOwner && (
                            <Button
                                className="w-full"
                                variant="outline"
                                size="lg"
                                onClick={() => openEditModal(id, handleUpdateSuccess)}
                                leftIcon={<Pencil size={20} />}
                            >
                                Edit {type === 'sets' ? 'Set' : type === 'folders' ? 'Folder' : 'Class'}
                            </Button>
                        )}
                    </div>
                </div>

                <div className="children-section">
                    {type === 'classes' ? (
                        <div className="class-detail-tabs">
                            <Tabs 
                                tabs={[
                                    { label: <div className="flex items-center gap-2"><FileText size={18} /> Materials</div>, key: 'materials' },
                                    { label: <div className="flex items-center gap-2"><Users size={18} /> Members <span className="tab-count">{item.members?.length || 0}</span></div>, key: 'members' },
                                    ...(isOwner ? [{ label: <div className="flex items-center gap-2"><UserPlus size={18} /> Requests {item.joinRequests?.length > 0 && <span className="tab-badge">{item.joinRequests.length}</span>}</div>, key: 'requests' }] : [])
                                ].map(t => ({ ...t, content: null }))}
                                activeIndex={[ 'materials', 'members', 'requests' ].indexOf(activeTab)}
                                onTabChange={(idx) => setActiveTab([ 'materials', 'members', 'requests' ][idx])}
                            />
                            
                            <div className="tab-content" style={{ marginTop: '2rem' }}>
                                {activeTab === 'materials' && (
                                    <div className="materials-view">
                                        <div className="section-header">
                                            <h2>Resources</h2>
                                            {isOwner && (
                                                <Button variant="ghost" size="sm" onClick={openAddChildModal} leftIcon={<Plus size={18} />}>
                                                    Add Resource
                                                </Button>
                                            )}
                                        </div>
                                        <div className="children-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', flexDirection: 'unset' }}>
                                            {children.length > 0 ? (
                                                children.map(m => (
                                                    <Card 
                                                        key={m.materialId}
                                                        onClick={() => navigate(m.materialType === 'FOLDER' ? `/folders/${m.materialRefId}` : `/flashcard-sets/${m.materialRefId}`)}
                                                        title={m.materialName}
                                                        badge={m.materialType === 'FOLDER' ? 'Folder' : 'Set'}
                                                        description={m.materialType}
                                                        actions={isOwner && (
                                                            <Button variant="ghost" size="sm" className="delete-btn" onClick={(e) => { e.stopPropagation(); setChildToDelete(m.materialId); }}>
                                                                <Trash2 size={16} />
                                                            </Button>
                                                        )}
                                                    />
                                                ))
                                            ) : (
                                                <EmptyState icon={Layers} title="No materials" description="This class has no shared materials yet." />
                                            )}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'members' && (
                                    <div className="members-view">
                                        <div className="members-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
                                            {item.members?.map(member => (
                                                <Card key={member.userId}>
                                                    <Card.Body className="p-4 flex items-center gap-4">
                                                        <div className="avatar" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                                            {member.displayName.charAt(0)}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="font-bold">{member.displayName}</div>
                                                            <Badge variant={member.role === 'OWNER' ? 'error' : 'secondary'} size="sm">{member.role}</Badge>
                                                        </div>
                                                        {isOwner && member.role !== 'OWNER' && (
                                                            <Button variant="ghost" size="sm" className="text-red-500" onClick={() => setChildToDelete(member.userId)}>
                                                                <Trash2 size={16} />
                                                            </Button>
                                                        )}
                                                    </Card.Body>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'requests' && (
                                    <div className="requests-view flex flex-col gap-4">
                                        {item.joinRequests?.length > 0 ? (
                                            item.joinRequests.map(req => (
                                                <Card key={req.requestId} className="p-4">
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex items-center gap-4">
                                                            <div className="avatar" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <User size={20} />
                                                            </div>
                                                            <div>
                                                                <div className="font-bold">{req.displayName}</div>
                                                                <div className="text-sm text-light">{req.message || 'No message'}</div>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Button size="sm" variant="primary" onClick={() => handleProcessRequest(req.requestId, 'ACCEPTED')}>Accept</Button>
                                                            <Button size="sm" variant="outline" onClick={() => handleProcessRequest(req.requestId, 'REJECTED')}>Reject</Button>
                                                        </div>
                                                    </div>
                                                </Card>
                                            ))
                                        ) : (
                                            <EmptyState icon={UserPlus} title="All caught up" description="No pending join requests." />
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="section-header">
                                <h2>{type === 'sets' ? 'Terms' : 'Sets'} in this {type === 'sets' ? 'set' : 'folder'} ({children.length})</h2>
                                {isOwner && (
                                    <Button
                                        variant="ghost"
                                        className="add-child-btn"
                                        onClick={handleAddChildClick}
                                        leftIcon={<Plus size={20} />}
                                    >
                                        Add {type === 'sets' ? 'Card' : 'Set'}
                                    </Button>
                                )}
                            </div>

                            <div className="children-list">
                                {filteredChildren.length > 0 ? (
                                    filteredChildren.map((child, index) => (
                                        type === 'sets' ? (
                                            <Card key={child.cardId} className="flashcard-item">
                                                <Card.Body className="flashcard-item-body">
                                                    <div className="card-index">{index + 1}</div>
                                                    <div className="card-content">
                                                        <div className="term-side">
                                                            <div className="side-label">TERM</div>
                                                            <div className="side-text">{child.term}</div>
                                                        </div>
                                                        <div className="divider"></div>
                                                        <div className="definition-side">
                                                            <div className="side-label">DEFINITION</div>
                                                            <div className="side-text">{child.definition}</div>
                                                        </div>
                                                    </div>
                                                    {isOwner && (
                                                        <div className="card-actions">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => handleEditChildClick(child.cardId)}
                                                            >
                                                                <Pencil size={18} />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="delete-btn"
                                                                onClick={() => setChildToDelete(child.cardId)}
                                                            >
                                                                <Trash2 size={18} />
                                                            </Button>
                                                        </div>
                                                    )}
                                                </Card.Body>
                                            </Card>
                                        ) : (
                                            <Card
                                                key={child.setId}
                                                onClick={() => navigate(`/flashcard-sets/${child.setId}`)}
                                                title={child.title}
                                                badge={`${child.termCount || child.cardCount || 0} terms`}
                                                description={child.description}
                                                ownerName={child.ownerDisplayName}
                                                actions={isOwner && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="delete-btn"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setChildToDelete(child.setId);
                                                        }}
                                                    >
                                                        <Trash2 size={18} />
                                                    </Button>
                                                )}
                                            />
                                        )
                                    ))
                                ) : (
                                    <div className="empty-children">
                                        <p>No {type === 'sets' ? 'flashcards' : 'sets'} here yet.</p>
                                        {isOwner && (
                                            <Button onClick={handleAddChildClick}>
                                                Add your first {type === 'sets' ? 'card' : 'set'}
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>

                <ConfirmationModal
                    isOpen={!!childToDelete}
                    onClose={() => setChildToDelete(null)}
                    onConfirm={handleDeleteChild}
                    title="Remove Item"
                    message="Are you sure you want to remove this? This action cannot be undone."
                    confirmText="Remove"
                    type="danger"
                    isLoading={isDeleting}
                />
            </div>
        </MainLayout>
    );
};

export default ContentDetailsPage;
