import React, { useState, useEffect } from 'react';
import { Search, Plus, Pencil, Trash2, BookOpen } from 'lucide-react';
import './ContentListPage.css';
import { Button, Card, Loader, ConfirmationModal, Badge, EmptyState } from '@/components/ui';
import { useModal } from '@/context/ModalContext';
import MainLayout from '@/components/layout';
import { useNavigate } from 'react-router-dom';

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
    const [activeTab, setActiveTab] = useState(fetchPublic ? initialTab : 'my');
    const [searchQuery, setSearchQuery] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = activeTab === 'public'
                ? await fetchPublic()
                : await fetchMy();
            setItems(Array.isArray(data) ? data : []);
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
            <div className="content-list-container">
                <div className="content-list-header">
                    <div className="header-top">
                        <h1 className="content-list-title">{title}</h1>
                        <Button
                            className="create-btn"
                            onClick={handleCreateClick}
                        >
                            <Plus size={20} />
                            {createLabel}
                        </Button>
                    </div>

                    <div className="header-filters">
                        <div className="search-bar">
                            <Search size={20} className="search-icon" />
                            <input
                                type="text"
                                placeholder={searchPlaceholder}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        {fetchPublic && (
                            <div className="tabs">
                                <Button
                                    variant="ghost"
                                    className={`tab-item ${activeTab === 'my' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('my')}
                                >
                                    All {type === 'sets' ? 'Sets' : (type === 'folders' ? 'Folders' : 'Classes')}
                                </Button>
                                <Button
                                    variant="ghost"
                                    className={`tab-item ${activeTab === 'public' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('public')}
                                >
                                    Public
                                </Button>
                                <Button
                                    variant="ghost"
                                    className={`tab-item ${activeTab === 'private' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('private')}
                                >
                                    Private
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {loading ? (
                    <div style={{ padding: '80px 40px' }}>
                        <Loader fullPage={false} text={`Loading ${type}...`} />
                    </div>
                ) : error ? (
                    <div style={{ padding: '80px 40px' }}>
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
                            <div className="content-grid">
                                {filteredItems.map(item => (
                                    <Card
                                        key={getItemId(item)}
                                        onClick={() => navigate(`${navigatePath}/${getItemId(item)}`)}
                                        title={getItemTitle(item)}
                                        badge={`${getItemCount(item)} ${itemLabel}`}
                                        description={item.description}
                                        ownerName={activeTab === 'my' ? 'You' : item.ownerDisplayName}
                                        footerRight={
                                            item.visibility && (
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
                                                    className="delete-btn"
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
