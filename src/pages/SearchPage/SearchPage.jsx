import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getPublicClasses } from '@/api/class';
import { getPublicFlashcardSets } from '@/api/flashcards';
import { getPublicFolders } from '@/api/folder';
import { Search, BookOpen, Layers, Folder, GraduationCap, PackageOpen } from 'lucide-react';
import { Loader, EmptyState, Card, Badge, Tabs } from '@/components/ui';

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
                const [setsData, foldersData, classesData] = await Promise.all([
                    getPublicFlashcardSets(),
                    getPublicFolders(),
                    getPublicClasses()
                ]);

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

    const tabOptions = [
        { id: 'all', label: 'All Results', icon: Search },
        { id: 'sets', label: 'Flashcard Sets', icon: Layers, count: results.sets.length },
        { id: 'folders', label: 'Folders', icon: Folder, count: results.folders.length },
        { id: 'classes', label: 'Classes', icon: GraduationCap, count: results.classes.length },
    ];

    const getFilteredResults = () => {
        if (activeTab === 'sets') return results.sets.map(item => ({ ...item, type: 'set' }));
        if (activeTab === 'folders') return results.folders.map(item => ({ ...item, type: 'folder' }));
        if (activeTab === 'classes') return results.classes.map(item => ({ ...item, type: 'class' }));

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
                <div className="py-24 flex flex-col items-center justify-center gap-4 text-[#586380]">
                    <Loader fullPage={false} size="lg" />
                    <p className="font-bold">Scouring our databases...</p>
                </div>
            );
        }

        if (filteredResults.length === 0) {
            return (
                <div className="py-12">
                    <EmptyState
                        icon={PackageOpen}
                        title="No results found"
                        description={`We couldn't find any ${activeTab === 'all' ? 'results' : activeTab} matching "${query}". Try adjusting your search keywords.`}
                    />
                </div>
            );
        }

        return (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-6 animate-fade-in-up">
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
        <div className="p-6">
            <header className="mb-10">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-[#ededff] rounded-2xl flex items-center justify-center text-[#4255ff]">
                        <Search size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-[#282e3e]">Search Results for "{query}"</h1>
                        <p className="text-[#586380] font-bold mt-1">
                            Found {totalResults} matches across all categories.
                        </p>
                    </div>
                </div>

                <div className="mt-8">
                    <Tabs
                        tabs={tabOptions.map(tab => ({
                            label: (
                                <div className="flex items-center gap-2">
                                    <tab.icon size={18} />
                                    <span>{tab.label}</span>
                                    {tab.count !== undefined && (
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-black
                                            ${activeTab === tab.id ? 'bg-[#ededff] text-[#4255ff]' : 'bg-[#edeff2] text-[#586380]'}
                                        `}>
                                            {tab.count}
                                        </span>
                                    )}
                                </div>
                            ),
                            key: tab.id
                        }))}
                        activeIndex={tabOptions.findIndex(t => t.id === activeTab)}
                        onTabChange={(idx) => setActiveTab(tabOptions[idx].id)}
                    />
                </div>
            </header>

            <main>
                {renderResults()}
            </main>
        </div>
    );
};

export default SearchPage;
