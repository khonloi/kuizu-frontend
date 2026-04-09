import React, { useState, useEffect } from 'react';
import { Search, Plus, Pencil, Trash2, BookOpen } from 'lucide-react';
import { Button, Card, Loader, ConfirmationModal, Badge, EmptyState } from '@/components/ui';
import { useModal } from '@/context/ModalContext';
import MainLayout from '@/components/layout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const ContentListPage = ({
    type = 'sets', // 'sets' or 'folders'
    fetchPublic,
    fetchMy,
    deleteItem,
    openModal,
    title,
    createLabel,
    searchPlaceholder,
    emptyMsg,
    itemLabel,
    initialTab = 'public',
    navigatePath
}) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('my');
    const [searchQuery, setSearchQuery] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await fetchMy();

            // Extra safety filter to only show items belonging to the user
            const userItems = (Array.isArray(data) ? data : []).filter(item => {
                const itemOwnerId = item.ownerId || item.owner?.userId || item.ownerUserId || item.userId;
                return itemOwnerId === user?.userId || item.ownerUsername === user?.username || item.username === user?.username;
            });

            setItems(userItems);
        } catch (err) {
            console.error(`Error fetching ${type}:`, err);
            setError(`Could not load ${type}.`);
        } finally {
            setLoading(false);
        }
    };

    const handleSuccess = (updatedItem) => {
        const idKey = type === 'sets' ? 'setId' : 'folderId';
        const existing = items.find(i => i[idKey] === updatedItem[idKey]);
        if (existing) {
            setItems(items.map(i => i[idKey] === updatedItem[idKey] ? updatedItem : i));
        } else {
            setItems([updatedItem, ...items]);
        }
    };

    const handleCreateClick = () => {
        openModal(null, handleSuccess);
    };

    const handleEditClick = (e, item) => {
        e.stopPropagation();
        const idKey = type === 'sets' ? 'setId' : 'folderId';
        openModal(item[idKey], handleSuccess);
    };

    const handleDelete = (e, item) => {
        e.stopPropagation();
        const idKey = type === 'sets' ? 'setId' : 'folderId';
        setItemToDelete(item[idKey]);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!itemToDelete) return;
        try {
            setIsDeleting(true);
            await deleteItem(itemToDelete);
            const idKey = type === 'sets' ? 'setId' : 'folderId';
            setItems(items.filter(i => i[idKey] !== itemToDelete));
            setIsDeleteModalOpen(false);
            setItemToDelete(null);
        } catch (err) {
            console.error('Delete failed:', err);
            alert('Failed to delete item');
        } finally {
            setIsDeleting(false);
        }
    };

    const filteredItems = items.filter(item => {
        // First filter by tab/visibility if needed
        if (activeTab === 'private' && item.visibility !== 'PRIVATE') return false;

        const titleVal = type === 'sets' ? item.title : (type === 'folders' ? item.name : item.className);
        return (titleVal && titleVal.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    });

    const getItemId = (item) => item.id || (type === 'sets' ? item.setId : (type === 'folders' ? item.folderId : item.classId));
    const getItemTitle = (item) => type === 'sets' ? item.title : (type === 'folders' ? item.name : item.className);
    const getItemCount = (item) => {
        if (type === 'sets') return item.cardCount || 0;
        if (type === 'folders') return item.setCount || 0;
        if (type === 'classes') return item.memberCount || 0;
        return 0;
    };

    return (
        <MainLayout>
            <div className="p-6">
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-8 md:flex-row md:items-center md:gap-6 md:mb-6">
                        <h1 className="text-3xl font-bold text-[#282e3e]">{title}</h1>
                        <Button
                            variant="primary"
                            className="flex items-center gap-2 h-auto py-3 rounded-lg"
                            onClick={handleCreateClick}
                        >
                            <Plus size={20} />
                            {createLabel}
                        </Button>
                    </div>

                    <div className="flex justify-between items-center gap-4 md:flex-col md:items-stretch">
                        <div className="relative flex-1 max-w-lg md:max-w-none">
                            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#586380]" />
                            <input
                                type="text"
                                className="w-full pl-12 pr-4 py-3 border-2 border-[#edeff2] rounded-xl bg-[#f6f7fb] text-base transition-all focus:outline-none focus:border-[#4255ff] focus:bg-white"
                                placeholder={searchPlaceholder}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="py-20 px-10">
                        <Loader fullPage={false} text={`Loading ${type}...`} />
                    </div>
                ) : error ? (
                    <div className="py-20 px-10">
                        <EmptyState
                            icon={BookOpen}
                            title="Oops! Something went wrong"
                            description={error}
                            action={<Button variant="outline" onClick={fetchData}>Try Again</Button>}
                        />
                    </div>
                ) : (
                    <>
                        {filteredItems.length > 0 ? (
                            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 lg:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] md:grid-cols-1 md:gap-4">
                                {filteredItems.map(item => (
                                    <Card
                                        key={getItemId(item)}
                                        onClick={() => navigate(`${navigatePath}/${getItemId(item)}`)}
                                        title={getItemTitle(item)}
                                        badge={`${getItemCount(item)} ${itemLabel}`}
                                        description={item.description}
                                        ownerName={activeTab === 'my' ? 'You' : item.ownerDisplayName}
                                        footerRight={
                                            item.visibility && (item.ownerId === user?.userId || item.owner?.userId === user?.userId || item.ownerUserId === user?.userId || item.ownerUsername === user?.username) && (
                                                <Badge variant={item.visibility === 'PUBLIC' ? 'success' : 'secondary'} size="sm">
                                                    {item.visibility.charAt(0) + item.visibility.slice(1).toLowerCase()}
                                                </Badge>
                                            )
                                        }
                                        actions={activeTab === 'my' && (
                                            <>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={(e) => handleEditClick(e, item)}
                                                >
                                                    <Pencil size={16} />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="hover:text-[#ff725e]"
                                                    onClick={(e) => handleDelete(e, item)}
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </>
                                        )}
                                    />
                                ))}
                            </div>
                        ) : (
                            <EmptyState
                                icon={Search}
                                title={emptyMsg}
                                description={searchQuery ? "Try a different search term or check your spelling." : "Start by creating your own or exploring public ones."}
                            />
                        )}
                    </>
                )}

                <ConfirmationModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={confirmDelete}
                    title={`Delete ${type === 'sets' ? 'Flashcard Set' : 'Folder'}`}
                    message={`Are you sure you want to delete this ${type === 'sets' ? 'set' : 'folder'}? This action cannot be undone.`}
                    confirmText="Delete"
                    type="danger"
                    isLoading={isDeleting}
                />
            </div>
        </MainLayout>
    );
};

export default ContentListPage;
