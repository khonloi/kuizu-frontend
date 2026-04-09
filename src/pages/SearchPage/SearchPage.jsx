import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getPublicClasses } from '@/api/class';
import { getPublicFlashcardSets } from '@/api/flashcards';
import { getPublicFolders } from '@/api/folder';
import { Search, BookOpen, Layers, Folder, GraduationCap, PackageOpen } from 'lucide-react';
import { Loader, EmptyState, Card, Badge } from '@/components/ui';
import './SearchPage.css';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = (searchParams.get('q') || '').toLowerCase();
    const navigate = useNavigate();

    const [results, setResults] = useState({
        sets: [],
        folders: [],
        classes: []
    });
    const [activeTab, setActiveTab] = useState('all');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            if (!query) {
                setResults({ sets: [], folders: [], classes: [] });
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                // Use the provided /public endpoints
                const [setsData, foldersData, classesData] = await Promise.all([
                    getPublicFlashcardSets(),
                    getPublicFolders(),
                    getPublicClasses()
                ]);
                
                // Filter results based on the query locally
                const filteredSets = setsData.filter(s => 
                    s.title?.toLowerCase().includes(query) || 
                    s.description?.toLowerCase().includes(query)
                );
                
                const filteredFolders = foldersData.filter(f => 
                    f.name?.toLowerCase().includes(query) || 
                    f.description?.toLowerCase().includes(query)
                );

                const filteredClasses = classesData.filter(c => 
                    c.className?.toLowerCase().includes(query) || 
                    c.description?.toLowerCase().includes(query)
                );
                
                setResults({
                    sets: filteredSets,
                    folders: filteredFolders,
                    classes: filteredClasses
                });
            } catch (error) {
                console.error("Search failed:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
    }, [query]);

    const tabs = [
        { id: 'all', label: 'All Results', icon: Search },
        { id: 'sets', label: 'Flashcard Sets', icon: Layers, count: results.sets.length },
        { id: 'folders', label: 'Folders', icon: Folder, count: results.folders.length },
        { id: 'classes', label: 'Classes', icon: GraduationCap, count: results.classes.length },
    ];

    const getFilteredResults = () => {
        if (activeTab === 'sets') return results.sets.map(item => ({ ...item, type: 'set' }));
        if (activeTab === 'folders') return results.folders.map(item => ({ ...item, type: 'folder' }));
        if (activeTab === 'classes') return results.classes.map(item => ({ ...item, type: 'class' }));
        
        // All
        return [
            ...results.sets.map(item => ({ ...item, type: 'set' })),
            ...results.folders.map(item => ({ ...item, type: 'folder' })),
            ...results.classes.map(item => ({ ...item, type: 'class' }))
        ];
    };

    const filteredResults = getFilteredResults();
    const totalResults = results.sets.length + results.folders.length + results.classes.length;

    const renderResults = () => {
        if (isLoading) {
            return (
                <div className="search-loading-container">
                    <Loader fullPage={false} />
                    <p>Searching for resources...</p>
                </div>
            );
        }

        if (filteredResults.length === 0) {
            return (
                <EmptyState
                    icon={PackageOpen}
                    title="No results found"
                    description={`We couldn't find any ${activeTab === 'all' ? 'results' : activeTab} matching "${query}". Try adjusting your search keywords.`}
                />
            );
        }

        return (
            <div className="search-results-grid">
                {filteredResults.map(item => {
                    const title = item.title || item.className || item.name;
                    const id = item.setId || item.folderId || item.classId;
                    const type = item.type;
                    
                    let badgeIcon = Layers;
                    let navigatePath = `/flashcard-sets/${id}`;
                    let footerText = null;

                    if (type === 'folder') {
                        badgeIcon = Folder;
                        navigatePath = `/folders/${id}`;
                        footerText = `${item.setCount || 0} sets`;
                    } else if (type === 'class') {
                        badgeIcon = GraduationCap;
                        navigatePath = `/classes/${id}`;
                    } else {
                        footerText = `${item.cardCount || 0} terms`;
                    }

                    return (
                        <Card
                            key={`${type}-${id}`}
                            onClick={() => navigate(navigatePath)}
                            title={title}
                            badge={type.charAt(0).toUpperCase() + type.slice(1)}
                            badgeIcon={badgeIcon}
                            description={item.description}
                            ownerName={item.ownerDisplayName || (item.owner && item.owner.username)}
                            footerRight={footerText && (
                                <Badge variant="secondary" outline>
                                    {footerText}
                                </Badge>
                            )}
                        />
                    );
                })}
            </div>
        );
    };

    return (
        <div className="search-page-container">
            <header className="search-page-header">
                <div className="search-page-title">
                    <Search size={28} className="search-page-icon" />
                    <h1>Search Results for "{query}"</h1>
                </div>
                <p className="search-page-subtitle">
                    Found {totalResults} results matching your search.
                </p>
                
                <div className="search-tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`search-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <tab.icon size={18} />
                            <span>{tab.label}</span>
                            {tab.count !== undefined && <span className="tab-count">{tab.count}</span>}
                        </button>
                    ))}
                </div>
            </header>

            <main className="search-results-section">
                {renderResults()}
            </main>
        </div>
    );
};

export default SearchPage;
