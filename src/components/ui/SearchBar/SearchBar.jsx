import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({
    onSearch,
    onResultClick,
    onEnter,
    placeholder = "Search...",
    className = ''
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchQuery.trim().length > 1) {
                setIsSearching(true);
                try {
                    const results = await onSearch(searchQuery);
                    setSearchResults(results || []);
                    setShowDropdown(true);
                } catch (error) {
                    console.error('Search failed:', error);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setSearchResults([]);
                setShowDropdown(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, onSearch]);

    const handleResultClick = (result) => {
        setShowDropdown(false);
        setSearchQuery('');
        if (onResultClick) {
            onResultClick(result);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && searchQuery.trim().length > 0) {
            setShowDropdown(false);
            if (onEnter) {
                onEnter(searchQuery.trim());
            }
        }
    };

    return (
        <div className={`relative w-full flex items-center ${className}`}>
            <Search size={18} className="absolute left-5 text-[#586380]" />
            <input
                type="text"
                placeholder={placeholder}
                className="w-full h-11 bg-[#f6f7fb] border-none rounded-full py-0 pr-5 pl-14 text-sm font-medium transition-all duration-200 hover:bg-[#edeff2] focus:outline-none focus:bg-white focus:shadow-[0_0_0_2px_#4255ff]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => { if (searchResults.length > 0) setShowDropdown(true); }}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            />
            {showDropdown && (
                <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-[#edeff2] rounded-xl shadow-xl overflow-hidden z-50 max-h-96 overflow-y-auto">
                    {isSearching ? (
                        <div className="text-[#586380] text-sm text-center p-5 cursor-default">Searching...</div>
                    ) : searchResults.length > 0 ? (
                        searchResults.map((result, idx) => (
                            <div
                                key={result.id || idx}
                                className="px-5 py-3 cursor-pointer border-b border-[#edeff2] last:border-b-0 transition-colors duration-200 hover:bg-[#f6f7fb]"
                                onClick={() => handleResultClick(result)}
                            >
                                <div className="font-semibold text-[#282e3e] mb-1">{result.title}</div>
                                {result.subtitle && <div className="text-xs text-[#586380]">{result.subtitle}</div>}
                            </div>
                        ))
                    ) : (
                        <div className="text-[#586380] text-sm text-center p-5 cursor-default">No results found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
