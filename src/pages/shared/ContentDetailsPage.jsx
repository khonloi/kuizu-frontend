import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Play, Plus, Pencil, Trash2, User, Layers, BookOpen, FolderOpen, Users, FileText, UserPlus } from 'lucide-react';
import { Button, Card, Loader, ConfirmationModal, Badge, EmptyState, Tabs } from '@/components/ui';
import MainLayout from '@/components/layout';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

const ContentDetailsPage = ({
    type = 'sets', // 'sets', 'folders', or 'classes'
    getById,
    getChildren,
    deleteItem,
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
    const [isDeletingItem, setIsDeletingItem] = useState(false);
    const [childToDelete, setChildToDelete] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [activeTag, setActiveTag] = useState('all');
    const [activeTab, setActiveTab] = useState('materials');

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await getById(id);

            // Check ownership and visibility
            const itemOwnerId = data.ownerId || data.owner?.userId || data.ownerUserId || data.userId;
            const isOwner = itemOwnerId === user?.userId || data.ownerUsername === user?.username || data.username === user?.username;
            const isPublic = data.visibility === 'PUBLIC';

            if (!isOwner && !isPublic) {
                setError("You do not have permission to view this content.");
                setLoading(false);
                return;
            }

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

    const handleDeleteItem = async () => {
        if (!deleteItem) return;
        try {
            setIsDeletingItem(true);
            await deleteItem(id);
            toastSuccess(`${type.charAt(0).toUpperCase() + type.slice(1, -1)} deleted successfully.`);
            navigate(backPath);
        } catch (err) {
            toastError(`Failed to delete ${type.slice(0, -1)}.`);
        } finally {
            setIsDeletingItem(false);
            setShowDeleteConfirm(false);
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
            <div className="py-24 text-center">
                <Loader text="Loading details..." />
            </div>
        </MainLayout>
    );

    if (error || !id) return (
        <MainLayout>
            <div className="py-24 px-10">
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
            <div className="p-6">
                <Button variant="ghost" className="flex items-center gap-2 text-[#586380] font-semibold mb-8 transition-colors hover:text-[#4255ff] p-0 h-auto" onClick={() => navigate(backPath)}>
                    <ChevronLeft size={20} />
                    Back to {type === 'sets' ? 'Sets' : type === 'folders' ? 'Folders' : 'Classes'}
                </Button>

                <div className="flex justify-between items-start mb-12 gap-12 md:flex-col md:gap-6 md:mb-8">
                    <div className="flex-1">
                        <h1 className="text-3xl font-extrabold mb-3 text-[#282e3e] flex items-center gap-4">
                            <span className="leading-[1.1]">{getItemTitle()}</span>
                            {item.status && item.status !== 'ACTIVE' && item.status !== 'APPROVED' && (
                                <Badge variant={item.status === 'PENDING' ? 'warning' : 'error'}>
                                    {item.status === 'PENDING' ? 'Pending Review' : 'Rejected'}
                                </Badge>
                            )}
                            {(item.status === 'ACTIVE' || item.status === 'APPROVED') && (
                                <Badge variant="success">Active</Badge>
                            )}
                        </h1>
                        <p className="text-base text-[#586380] leading-relaxed mb-8">{item.description || 'No description provided.'}</p>

                        <div className="flex gap-8 md:flex-col md:gap-3">
                            <div className="flex items-center gap-3 text-[#586380] text-sm">
                                <User size={16} />
                                <span>Created by <strong className="text-[#282e3e] font-semibold">{item.ownerDisplayName}</strong></span>
                            </div>
                            <div className="flex items-center gap-3 text-[#586380] text-sm">
                                {type === 'sets' ? <Layers size={16} /> : (type === 'folders' ? <FolderOpen size={16} /> : <Users size={16} />)}
                                <span>
                                    {type === 'sets' ? `${children.length} terms` :
                                        type === 'folders' ? `${children.length} sets` :
                                            `${item.members?.length || 0} members`}
                                </span>
                            </div>
                        </div>


                        <div className="mt-10 flex flex-row flex-wrap gap-5 md:w-full md:min-w-0">
                            {type === 'sets' && (
                                <>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        onClick={() => navigate(`/study/${id}`, { state: { cards: children } })}
                                        leftIcon={<BookOpen size={20} />}
                                    >
                                        Study
                                    </Button>
                                    <Button
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
                                    <Button variant="outline" size="lg" className="text-red-500 hover:bg-red-50" onClick={() => openAddChildModal('leave')}>
                                        Leave Class
                                    </Button>
                                ) : (
                                    <Button variant="primary" size="lg" onClick={() => openAddChildModal('join')}>
                                        Join Class
                                    </Button>
                                )
                            )}

                            {isOwner && (
                                <>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        onClick={() => openEditModal(id, handleUpdateSuccess)}
                                        leftIcon={<Pencil size={20} />}
                                    >
                                        Edit {type === 'sets' ? 'Set' : type === 'folders' ? 'Folder' : 'Class'}
                                    </Button>
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        onClick={handleAddChildClick}
                                        leftIcon={<Plus size={20} />}
                                    >
                                        Add {type === 'sets' ? 'Card' : type === 'folders' ? 'Set' : 'Resource'}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="lg"
                                        className="text-red-500 hover:bg-red-50"
                                        onClick={() => setShowDeleteConfirm(true)}
                                        leftIcon={<Trash2 size={20} />}
                                    >
                                        Delete {type === 'sets' ? 'Set' : type === 'folders' ? 'Folder' : 'Class'}
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div>
                    {type === 'classes' ? (
                        <div>
                            <Tabs
                                tabs={[
                                    { label: <div className="flex items-center gap-2"><FileText size={18} /> Materials</div>, key: 'materials' },
                                    { label: <div className="flex items-center gap-2"><Users size={18} /> Members <span className="bg-[#edeff2] text-[#586380] px-2 py-0.5 rounded-full text-xs ml-1">{item.members?.length || 0}</span></div>, key: 'members' },
                                    ...(isOwner ? [{ label: <div className="flex items-center gap-2"><UserPlus size={18} /> Requests {item.joinRequests?.length > 0 && <span className="bg-[#4255ff] text-white px-2 py-0.5 rounded-full text-xs ml-1">{item.joinRequests.length}</span>}</div>, key: 'requests' }] : [])
                                ].map(t => ({ ...t, content: null }))}
                                activeIndex={['materials', 'members', 'requests'].indexOf(activeTab)}
                                onTabChange={(idx) => setActiveTab(['materials', 'members', 'requests'][idx])}
                            />

                            <div className="mt-8">
                                {activeTab === 'materials' && (
                                    <div>
                                        <div className="flex justify-center items-center mb-8 md:justify-start">
                                            <h2 className="text-2xl font-bold">Resources</h2>
                                        </div>
                                        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 lg:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] md:grid-cols-1 md:gap-4">
                                            {children.length > 0 ? (
                                                children.map(m => (
                                                    <Card
                                                        key={m.materialId}
                                                        onClick={() => navigate(m.materialType === 'FOLDER' ? `/folders/${m.materialRefId}` : `/flashcard-sets/${m.materialRefId}`)}
                                                        title={m.materialName}
                                                        badge={m.materialType === 'FOLDER' ? 'Folder' : 'Set'}
                                                        description={m.materialType}
                                                        actions={isOwner && (
                                                            <Button variant="ghost" size="sm" className="hover:text-[#ff725e]" onClick={(e) => { e.stopPropagation(); setChildToDelete(m.materialId); }}>
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
                                    <div>
                                        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6">
                                            {item.members?.map(member => (
                                                <Card key={member.userId}>
                                                    <Card.Body className="p-4 flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-full bg-[#4255ff] text-white flex items-center justify-center font-bold">
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
                                    <div className="flex flex-col gap-4">
                                        {item.joinRequests?.length > 0 ? (
                                            item.joinRequests.map(req => (
                                                <Card key={req.requestId} className="p-4">
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-10 h-10 rounded-full bg-[#edeff2] flex items-center justify-center">
                                                                <User size={20} />
                                                            </div>
                                                            <div>
                                                                <div className="font-bold">{req.displayName}</div>
                                                                <div className="text-sm text-[#586380]">{req.message || 'No message'}</div>
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
                            <div className="flex justify-center items-center mb-8 md:justify-start">
                                <h2 className="text-2xl font-bold">{type === 'sets' ? 'Terms' : 'Sets'} in this {type === 'sets' ? 'set' : 'folder'} ({children.length})</h2>
                            </div>

                            <div className={type === 'sets' ? "flex flex-col gap-6" : "grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 lg:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] md:grid-cols-1 md:gap-4"}>
                                {filteredChildren.length > 0 ? (
                                    filteredChildren.map((child, index) => (
                                        type === 'sets' ? (
                                            <Card key={child.cardId} className="relative border-2 border-[#edeff2] transition-colors overflow-hidden hover:border-[#4255ff]">
                                                <Card.Body className="flex p-4 gap-6 md:flex-col md:gap-4">
                                                    <div className="text-xl font-bold text-[#586380] min-w-[32px] flex items-center justify-center">{index + 1}</div>
                                                    <div className="flex-1 flex items-center gap-8 md:flex-col md:items-start md:gap-6">
                                                        <div className="flex-1">
                                                            <div className="text-xs font-extrabold text-[#586380] tracking-wider mb-2">TERM</div>
                                                            <div className="text-lg text-[#282e3e] font-medium">{child.term}</div>
                                                        </div>
                                                        <div className="w-[1px] h-10 bg-[#edeff2] md:w-full md:h-[1px]"></div>
                                                        <div className="flex-1">
                                                            <div className="text-xs font-extrabold text-[#586380] tracking-wider mb-2">DEFINITION</div>
                                                            <div className="text-lg text-[#282e3e] font-medium">{child.definition}</div>
                                                        </div>
                                                    </div>
                                                    {isOwner && (
                                                        <div className="flex flex-col gap-2 md:flex-row md:justify-end">
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
                                                                className="hover:text-[#ff725e]"
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
                                                        className="hover:text-[#ff725e]"
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
                                ) : null}
                            </div>
                            {filteredChildren.length === 0 && (
                                <div className="text-center p-16 bg-[#f6f7fb] rounded-xl border-2 border-dashed border-[#edeff2]">
                                    <p className="mb-6 text-[#586380]">No {type === 'sets' ? 'flashcards' : 'sets'} here yet.</p>
                                    {isOwner && (
                                        <Button onClick={handleAddChildClick}>
                                            Add your first {type === 'sets' ? 'card' : 'set'}
                                        </Button>
                                    )}
                                </div>
                            )}
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

                <ConfirmationModal
                    isOpen={showDeleteConfirm}
                    onClose={() => setShowDeleteConfirm(false)}
                    onConfirm={handleDeleteItem}
                    title={`Delete ${type === 'sets' ? 'Flashcard Set' : type === 'folders' ? 'Folder' : 'Class'}`}
                    message={`Are you sure you want to delete this ${type.slice(0, -1)}? All data will be permanently removed. This action cannot be undone.`}
                    confirmText="Delete"
                    type="danger"
                    isLoading={isDeletingItem}
                />
            </div>
        </MainLayout>
    );
};

export default ContentDetailsPage;
