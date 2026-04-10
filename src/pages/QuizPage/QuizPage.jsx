import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, CheckCircle2, XCircle, AlertCircle, Trophy } from 'lucide-react';
import { getFlashcardsBySetId } from '@/api/flashcards';
import { submitQuiz } from '@/api/study';
import { Button, Card, Loader, Modal } from '@/components/ui';
import MainLayout from '@/components/layout';

const QuizPage = () => {
    const { setId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const backPath = location.state?.from || `/flashcard-sets/${setId}`;
    const backLabel = location.state?.fromLabel || 'Back to Set';

    const [cards, setCards] = useState(location.state?.cards || []);
    const [loading, setLoading] = useState(!location.state?.cards);
    const [error, setError] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isFinished, setIsFinished] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showFinishModal, setShowFinishModal] = useState(false);

    useEffect(() => {
        if (cards.length > 0) {
            generateQuestions(cards);
        } else {
            fetchCards();
        }
    }, [setId]);

    const fetchCards = async () => {
        try {
            setLoading(true);
            const data = await getFlashcardsBySetId(setId);
            if (data.length < 2) {
                setError('You need at least 2 cards to take a quiz.');
                return;
            }
            setCards(data);
            generateQuestions(data);
        } catch (err) {
            setError('Failed to load cards for quiz.');
        } finally {
            setLoading(false);
        }
    };

    const generateQuestions = (cardsData) => {
        const shuffled = [...cardsData].sort(() => 0.5 - Math.random());
        const generated = shuffled.map(card => {
            const correctAnswer = card.definition;
            const otherDefinitions = cardsData
                .filter(c => c.cardId !== card.cardId)
                .map(c => c.definition);

            const distractors = [...otherDefinitions]
                .sort(() => 0.5 - Math.random())
                .slice(0, 3);

            const options = [...distractors, correctAnswer].sort(() => 0.5 - Math.random());

            return {
                cardId: card.cardId,
                term: card.term,
                correctAnswer,
                options
            };
        });
        setQuestions(generated);
    };

    const handleOptionSelect = (option) => {
        if (selectedOption !== null) return;
        setSelectedOption(option);

        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = option === currentQuestion.correctAnswer;

        const newAnswer = {
            cardId: currentQuestion.cardId,
            term: currentQuestion.term,
            definition: currentQuestion.correctAnswer,
            isCorrect
        };

        setAnswers(prev => [...prev, newAnswer]);

        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setSelectedOption(null);
            } else {
                setIsFinished(true);
            }
        }, 1000);
    };

    const handleSubmitQuiz = async () => {
        const isFolder = setId.startsWith('folder-');
        try {
            setIsSubmitting(true);

            if (!isFolder) {
                await submitQuiz({
                    setId: parseInt(setId),
                    answers: answers.map(a => ({ cardId: a.cardId, isCorrect: a.isCorrect }))
                });
            }

            const correctCount = answers.filter(a => a.isCorrect).length;
            navigate(`/quiz/results/summary`, {
                state: {
                    result: {
                        setId: isFolder ? setId : parseInt(setId),
                        score: correctCount,
                        totalQuestions: questions.length,
                        items: answers
                    }
                }
            });
        } catch (err) {
            console.error('Failed to submit quiz:', err);
            const correctCount = answers.filter(a => a.isCorrect).length;
            navigate(`/quiz/results/summary`, {
                state: {
                    result: {
                        setId: isFolder ? setId : parseInt(setId),
                        score: correctCount,
                        totalQuestions: questions.length,
                        items: answers
                    }
                }
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (error) return (
        <MainLayout showNavbar={false} showSidebar={false} showFooter={false}>
            <div className="max-w-md mx-auto py-24 px-6 text-center">
                <div className="w-16 h-16 bg-[#fef2f2] rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#ef4444]">
                    <AlertCircle size={32} />
                </div>
                <h2 className="text-2xl font-black text-[#282e3e] mb-2">Quiz unavailable</h2>
                <p className="text-[#586380] mb-8 font-bold">{error}</p>
                <Button variant="primary" onClick={() => navigate(-1)}>Go Back</Button>
            </div>
        </MainLayout>
    );

    if (isFinished) {
        const correctCount = answers.filter(a => a.isCorrect).length;
        const percentage = Math.round((correctCount / questions.length) * 100);
        
        return (
            <MainLayout showNavbar={false} showSidebar={false} showFooter={false}>
                <div className="max-w-xl mx-auto py-16 px-6 sm:py-24 animate-fade-in-up">
                    <Card className="text-center p-12 bg-white rounded-[32px] border-2 border-[#edeff2] shadow-2xl">
                        <div className="w-20 h-20 bg-[#ededff] rounded-full flex items-center justify-center mx-auto mb-8 text-[#4255ff]">
                            <Trophy size={48} />
                        </div>
                        <h2 className="text-4xl font-black text-[#282e3e] mb-2">Quiz Finished!</h2>
                        <div className="my-10">
                            <span className="text-7xl font-black text-[#4255ff]">{correctCount} <span className="text-3xl text-[#586380]/40">/ {questions.length}</span></span>
                            <div className="mt-4 text-xl font-bold text-[#586380]">{percentage}% Accurate</div>
                        </div>
                        <Button
                            className="w-full h-16 text-xl font-black rounded-2xl shadow-lg shadow-[#4255ff]/20"
                            size="lg"
                            onClick={handleSubmitQuiz}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving Progress...' : 'View Results'}
                        </Button>
                    </Card>
                </div>
            </MainLayout>
        );
    }

    if (loading || questions.length === 0) return <MainLayout showNavbar={false} showSidebar={false} showFooter={false} isLoading={true}><div className="flex-1 flex items-center justify-center p-12"><Loader size="lg" /></div></MainLayout>;

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <MainLayout showNavbar={false} showSidebar={false} showFooter={false} fullHeight={true}>
            <div className="max-w-[850px] mx-auto px-6 py-10 h-full flex flex-col">
                <header className="flex items-center justify-between gap-6 mb-8 mt-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(backPath)}
                        leftIcon={<ChevronLeft size={20} />}
                        className="text-[#586380] font-black h-auto p-0 hover:text-[#4255ff]"
                    >
                        {backLabel}
                    </Button>

                    <div className="flex items-center gap-8">
                        <div className="text-[#586380] font-bold">
                            Question <span className="text-[#282e3e] text-xl font-black">{currentQuestionIndex + 1}</span> of <span className="text-[#282e3e] font-black">{questions.length}</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-[#ff725e] font-black hover:bg-red-50"
                            onClick={() => setShowFinishModal(true)}
                        >
                            Finish
                        </Button>
                    </div>
                </header>

                <div className="w-full h-1.5 bg-[#edeff2] rounded-full overflow-hidden mb-12 shadow-inner">
                    <div
                        className="h-full bg-[#4255ff] transition-all duration-300 ease-out shadow-[0_0_10px_rgba(66,85,255,0.4)]"
                        style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                    />
                </div>

                <div className="animate-fade-in-up">
                    <div className="bg-white rounded-[32px] border-2 border-[#edeff2] shadow-xl p-10 mb-10 text-center">
                        <span className="text-[11px] font-black text-[#98a2b3] tracking-widest uppercase mb-4 block">Question</span>
                        <h1 className="text-4xl font-black text-[#282e3e] leading-tight break-words uppercase">
                            {currentQuestion.term}
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {currentQuestion.options.map((option, idx) => {
                            const isSelected = selectedOption === option;
                            const isCorrect = option === currentQuestion.correctAnswer;
                            const showSuccess = isCorrect && selectedOption !== null;
                            const showWrong = isSelected && !isCorrect;

                            let baseStyle = "group relative flex items-center p-6 bg-white border-2 rounded-2xl text-left transition-all duration-200 cursor-pointer disabled:cursor-default";
                            let borderStyle = "border-[#edeff2] hover:border-[#4255ff] hover:bg-[#f0f2ff] hover:shadow-lg hover:-translate-y-1";
                            let textStyle = "text-[#282e3e] font-bold text-lg";
                            let labelStyle = "bg-[#f6f7fb] text-[#586380]";

                            if (showSuccess) {
                                borderStyle = "border-[#10b981] bg-[#f0fdf4] shadow-lg shadow-[#10b981]/10";
                                labelStyle = "bg-[#10b981] text-white";
                            } else if (showWrong) {
                                borderStyle = "border-[#ef4444] bg-[#fef2f2] shadow-lg shadow-[#ef4444]/10";
                                labelStyle = "bg-[#ef4444] text-white";
                            }

                            return (
                                <button
                                    key={idx}
                                    className={`${baseStyle} ${borderStyle} ${selectedOption !== null ? 'hover:translate-y-0 hover:shadow-none' : ''}`}
                                    onClick={() => handleOptionSelect(option)}
                                    disabled={selectedOption !== null}
                                >
                                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm mr-5 shrink-0 transition-colors ${labelStyle}`}>
                                        {String.fromCharCode(65 + idx)}
                                    </span>
                                    <span className={`flex-1 ${textStyle}`}>{option}</span>
                                    {showSuccess && <CheckCircle2 className="text-[#10b981] ml-4 shrink-0" size={24} />}
                                    {showWrong && <XCircle className="text-[#ef4444] ml-4 shrink-0" size={24} />}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <Modal
                isOpen={showFinishModal}
                onClose={() => setShowFinishModal(false)}
                title="Finish Quiz Early?"
                footer={
                    <div className="flex gap-3 justify-end">
                        <Button
                            variant="ghost"
                            onClick={() => setShowFinishModal(false)}
                            disabled={isSubmitting}
                            className="font-black text-[#586380]"
                        >
                            Back to Quiz
                        </Button>
                        <Button
                            variant="primary"
                            className="bg-[#ff725e] hover:bg-[#ff5a43] border-none font-black px-6"
                            onClick={() => {
                                setShowFinishModal(false);
                                handleSubmitQuiz();
                            }}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Confirm Finish'}
                        </Button>
                    </div>
                }
            >
                <div className="py-2">
                    <p className="text-[#586380] font-bold leading-relaxed">
                        Are you sure you want to finish this quiz early? Your progress so far will be saved and calculated.
                    </p>
                </div>
            </Modal>
        </MainLayout>
    );
};

export default QuizPage;
