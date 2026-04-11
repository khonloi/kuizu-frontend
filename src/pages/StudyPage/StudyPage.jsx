import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, RotateCcw, CheckCircle2, XCircle, Trophy, Keyboard, Shuffle, Star, BookOpen as BookIcon } from 'lucide-react';
import { getFlashcardsBySetId } from '@/api/flashcards';
import { useToast } from '@/context/ToastContext';
import { Button, Card, Loader } from '@/components/ui';
import MainLayout from '@/components/layout';

const StudyPage = () => {
    const { setId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const toast = useToast();

    const [allCards, setAllCards] = useState(location.state?.cards || []);
    const [cards, setCards] = useState(location.state?.cards || []);
    const [loading, setLoading] = useState(!location.state?.cards);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [hasTriggeredFinish, setHasTriggeredFinish] = useState(false);
    const [starredCardIds, setStarredCardIds] = useState(new Set());

    const backPath = location.state?.from || `/flashcard-sets/${setId}`;
    const backLabel = location.state?.fromLabel || 'Back to Set';

    const progress = cards.length > 0 ? ((currentIndex + 1) / cards.length) * 100 : 0;

    useEffect(() => {
        if (progress === 100 && !hasTriggeredFinish && !loading && cards.length > 0) {
            toast.success('Amazing! You reached 100%!', 5000);
            setHasTriggeredFinish(true);
        }
    }, [progress, hasTriggeredFinish, toast, loading, cards.length]);

    useEffect(() => {
        if (cards.length === 0) {
            fetchCards();
        }
    }, [setId]);

    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const fetchCards = async () => {
        try {
            setLoading(true);
            const data = await getFlashcardsBySetId(setId);
            setAllCards(data);
            setCards(shuffleArray(data));
        } catch (err) {
            console.error('Failed to load cards:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleShuffle = () => {
        const shuffled = shuffleArray(cards);
        setCards(shuffled);
        setCurrentIndex(0);
        setIsFlipped(false);
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNext = () => {
        if (currentIndex < cards.length - 1) {
            setIsFlipped(false);
            setCurrentIndex(prev => prev + 1);
        } else {
            setIsFinished(true);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setIsFlipped(false);
            setCurrentIndex(prev => prev - 1);
        }
    };

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isFinished) return;
            if (e.code === 'Space') {
                e.preventDefault();
                handleFlip();
            } else if (e.code === 'ArrowRight' || e.code === 'ArrowDown') {
                e.preventDefault();
                handleNext();
            } else if (e.code === 'ArrowLeft' || e.code === 'ArrowUp') {
                e.preventDefault();
                handlePrevious();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, isFlipped, isFinished, cards.length]);

    if (loading) return <MainLayout showNavbar={false} showSidebar={false} showFooter={false} fullHeight={true} isLoading={true}><div className="flex-1 flex items-center justify-center p-16"><Loader size="lg" /></div></MainLayout>;

    if (cards.length === 0) return (
        <MainLayout showNavbar={false} showSidebar={false} showFooter={false}>
            <div className="max-w-md mx-auto py-24 px-6 text-center">
                <div className="w-16 h-16 bg-[#edeff2] rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#586380]">
                    <BookIcon size={32} />
                </div>
                <h2 className="text-2xl font-black text-[#282e3e] mb-2">No cards found</h2>
                <p className="text-[#586380] mb-8 font-bold">This set doesn't have any cards to study yet.</p>
                <Button variant="primary" onClick={() => navigate(-1)}>Go Back</Button>
            </div>
        </MainLayout>
    );

    if (isFinished) {
        const starredCards = allCards.filter(c => starredCardIds.has(c.cardId));
        return (
            <MainLayout showNavbar={false} showSidebar={false} showFooter={false}>
                <div className="max-w-2xl mx-auto py-16 px-6 sm:py-24 animate-fade-in-up">
                    <Card className="text-center p-16 bg-white rounded-3xl border-2 border-[#edeff2] shadow-xl">
                        <div className="w-20 h-20 bg-[#ecfdf5] rounded-full flex items-center justify-center mx-auto mb-8 text-[#10b981]">
                            <Trophy size={48} />
                        </div>
                        <h2 className="text-4xl font-black text-[#282e3e] mb-4">Congratulations!</h2>
                        <p className="text-[#586380] text-lg font-bold mb-10">You've completed this study session. All {cards.length} cards reviewed!</p>

                        <div className="flex flex-col gap-4 max-w-sm mx-auto">
                            <Button
                                variant="primary"
                                size="lg"
                                className="h-14 text-lg font-black"
                                onClick={() => {
                                    setCards(shuffleArray(allCards));
                                    setCurrentIndex(0);
                                    setIsFlipped(false);
                                    setIsFinished(false);
                                    setHasTriggeredFinish(false);
                                }}
                                leftIcon={<RotateCcw size={20} />}
                            >
                                Study All Again
                            </Button>
                            {starredCards.length > 0 && (
                                <Button
                                    size="lg"
                                    className="h-14 text-lg font-black bg-[#f59e0b] hover:bg-[#d97706] text-white border-none"
                                    onClick={() => {
                                        setCards(shuffleArray(starredCards));
                                        setCurrentIndex(0);
                                        setIsFlipped(false);
                                        setIsFinished(false);
                                        setHasTriggeredFinish(false);
                                    }}
                                    leftIcon={<Star size={20} fill="white" />}
                                >
                                    Study Starred ({starredCards.length})
                                </Button>
                            )}
                            <Button
                                variant="outline"
                                size="lg"
                                className="h-14 text-lg font-black"
                                onClick={() => navigate(backPath)}
                            >
                                {backLabel}
                            </Button>
                        </div>
                    </Card>
                </div>
            </MainLayout>
        );
    }

    const currentCard = cards[currentIndex];
    const isStarred = currentCard ? starredCardIds.has(currentCard.cardId) : false;

    const toggleStar = (e) => {
        e.stopPropagation();
        const currentCardId = currentCard.cardId;
        setStarredCardIds(prev => {
            const next = new Set(prev);
            if (next.has(currentCardId)) next.delete(currentCardId);
            else next.add(currentCardId);
            return next;
        });
    };

    return (
        <MainLayout showNavbar={false} showSidebar={false} showFooter={false} fullHeight={true}>
            <div className="max-w-[1000px] mx-auto p-6 flex flex-col h-full w-full">
                <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(backPath)}
                        leftIcon={<ChevronLeft size={20} />}
                        className="text-[#586380] font-black h-auto p-0 hover:text-[#4255ff]"
                    >
                        {backLabel}
                    </Button>

                    <div className="flex items-center justify-between sm:justify-end gap-8">
                        <div className="text-[#586380] font-bold">
                            Card <span className="text-[#282e3e] text-xl font-black">{currentIndex + 1}</span> of <span className="text-[#282e3e] font-black">{cards.length}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="w-10 h-10 rounded-xl border-[#edeff2] shadow-sm hover:border-[#4255ff] hover:text-[#4255ff]"
                                onClick={handleShuffle}
                                title="Shuffle cards"
                            >
                                <Shuffle size={18} />
                            </Button>
                        </div>
                    </div>
                </header>

                <div className="w-full h-1.5 bg-[#edeff2] rounded-full overflow-hidden mb-8 shadow-inner">
                    <div
                        className="h-full bg-[#4255ff] transition-all duration-300 ease-out shadow-[0_0_10px_rgba(66,85,255,0.4)]"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="flex-1 flex flex-col items-center justify-center perspective-1000">
                    <div
                        className={`relative w-full max-w-[700px] h-[450px] cursor-pointer preserve-3d transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isFlipped ? 'rotate-y-180' : ''}`}
                        onClick={handleFlip}
                    >
                        {/* Front Face */}
                        <div 
                            className="absolute inset-0 w-full h-full backface-hidden bg-white border-2 border-[#edeff2] rounded-[32px] shadow-2xl p-16 flex flex-col items-center justify-center text-center"
                            style={{ transform: 'translateZ(1px)' }}
                        >
                            <button
                                className={`absolute top-8 right-8 p-0 border-none bg-transparent transition-all duration-200 hover:scale-110 z-10 ${isStarred ? 'text-[#f59e0b]' : 'text-[#d1d5db]'}`}
                                onClick={toggleStar}
                            >
                                <Star size={28} fill={isStarred ? "currentColor" : "none"} />
                            </button>
                            <span className="absolute top-8 left-8 text-[11px] font-black text-[#98a2b3] tracking-widest uppercase">Term</span>
                            <div className="text-4xl font-black text-[#282e3e] leading-tight max-w-[500px] break-words">{currentCard.term}</div>
                            <span className="absolute bottom-8 text-sm font-bold text-[#586380] opacity-50">Click to flip • Press Space</span>
                        </div>

                        {/* Back Face */}
                        <div 
                            className="absolute inset-0 w-full h-full backface-hidden bg-[#f9fafb] border-2 border-[#edeff2] rounded-[32px] shadow-2xl p-16 flex flex-col items-center justify-center text-center"
                            style={{ transform: 'rotateY(180deg) translateZ(1px)' }}
                        >
                            <button
                                className={`absolute top-8 right-8 p-0 border-none bg-transparent transition-all duration-200 hover:scale-110 z-10 ${isStarred ? 'text-[#f59e0b]' : 'text-[#d1d5db]'}`}
                                onClick={toggleStar}
                            >
                                <Star size={28} fill={isStarred ? "currentColor" : "none"} />
                            </button>
                            <span className="absolute top-8 left-8 text-[11px] font-black text-[#98a2b3] tracking-widest uppercase">Definition</span>
                            <div className="text-3xl font-bold text-[#282e3e] leading-relaxed max-w-[500px] break-words">{currentCard.definition}</div>
                            <span className="absolute bottom-8 text-sm font-bold text-[#586380] opacity-50">Click to flip • Press Space</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 mt-12 w-full max-w-[700px]">
                        <div className="flex-1 flex flex-col items-center gap-2">
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full h-16 rounded-2xl border-2 border-[#edeff2] text-xl font-black hover:border-[#4255ff] hover:text-[#4255ff]"
                                onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
                                disabled={currentIndex === 0}
                            >
                                <ChevronLeft size={24} strokeWidth={3} />
                                <span className="ml-2">Previous</span>
                            </Button>
                            <span className="text-[10px] font-black text-[#98a2b3] uppercase tracking-widest hidden sm:block">Press ←</span>
                        </div>

                        <div className="flex-1 flex flex-col items-center gap-2">
                            <Button
                                variant="primary"
                                size="lg"
                                className="w-full h-16 rounded-2xl text-xl font-black shadow-lg shadow-[#4255ff]/20"
                                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                            >
                                <span className="mr-2">{currentIndex === cards.length - 1 ? 'Finish' : 'Next'}</span>
                                <ChevronLeft size={24} strokeWidth={3} className="rotate-180" />
                            </Button>
                            <span className="text-[10px] font-black text-[#98a2b3] uppercase tracking-widest hidden sm:block">Press →</span>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default StudyPage;
