import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout';
import { Button, Card } from '@/components/ui';
import { BookOpen, Brain, Users, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <MainLayout showSidebar={false}>
            <div className="flex flex-col min-h-screen">
                <main className="flex-1 overflow-x-hidden">
                    {/* Hero Section */}
                    <section className="py-20 lg:py-32 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative text-center lg:text-left border-b border-[#edeff2]">
                        <div className="flex-[1.2] z-10 w-full">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#4255ff]/10 text-[#4255ff] rounded-full text-sm font-semibold mb-6 border border-[#4255ff]/20">
                                <Sparkles size={14} className="text-[#ffd700]" />
                                <span>Revolutionize Your Study Habits</span>
                            </div>
                            <h1 className="text-5xl lg:text-[64px] leading-tight font-extrabold mb-6 text-[#282e3e] tracking-tight">
                                Master any subject with <span className="bg-gradient-to-br from-[#4255ff] to-[#a8a1ff] bg-clip-text text-transparent">Kitra</span>
                            </h1>
                            <p className="text-lg lg:text-xl leading-relaxed text-[#586380] mb-10 max-w-xl mx-auto lg:mx-0">
                                The most effective way to learn, practice, and master anything. Join thousands of students using AI-powered flashcards and interactive tests.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-16">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="!px-8 !py-4 !text-lg !rounded-xl shadow-xl shadow-[#4255ff]/20 w-full sm:w-auto"
                                    onClick={() => navigate('/dashboard')}
                                    rightIcon={<ArrowRight size={20} />}
                                >
                                    Get Started for Free
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="lg"
                                    className="!px-8 !py-4 !text-lg !text-[#282e3e] w-full sm:w-auto border-2 border-transparent hover:border-[#edeff2] !bg-transparent hover:!bg-[#f6f7fb]"
                                    onClick={() => navigate('/dashboard')}
                                >
                                    View Demo
                                </Button>
                            </div>

                            <div className="flex justify-center lg:justify-start items-center gap-6 sm:gap-8 flex-wrap">
                                <div className="flex flex-col">
                                    <span className="text-2xl font-bold text-[#282e3e]">50k+</span>
                                    <span className="text-sm text-[#586380]">Active Students</span>
                                </div>
                                <div className="w-px h-10 bg-[#edeff2]"></div>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-bold text-[#282e3e]">1M+</span>
                                    <span className="text-sm text-[#586380]">Flashcards Created</span>
                                </div>
                                <div className="w-px h-10 bg-[#edeff2] hidden sm:block"></div>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-bold text-[#282e3e]">98%</span>
                                    <span className="text-sm text-[#586380]">Success Rate</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 relative flex justify-center items-center w-full mt-12 lg:mt-0">
                            <Card className="w-full max-w-sm h-96 z-10 mx-auto !rounded-3xl shadow-2xl !border-none">
                                <Card.Body className="h-full flex flex-col p-8">
                                    <div className="flex gap-2 mb-8">
                                        <div className="w-2 h-2 rounded-full bg-[#edeff2]"></div>
                                        <div className="w-2 h-2 rounded-full bg-[#edeff2]"></div>
                                        <div className="w-2 h-2 rounded-full bg-[#edeff2]"></div>
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center">
                                        <div className="h-6 w-3/5 bg-[#4255ff]/10 rounded-full mb-8"></div>
                                        <div className="h-3 w-full bg-[#f0f2f5] rounded-full mb-4"></div>
                                        <div className="h-3 w-4/5 bg-[#f0f2f5] rounded-full mb-4"></div>
                                        <div className="h-3 w-2/5 bg-[#f0f2f5] rounded-full"></div>
                                    </div>
                                </Card.Body>
                            </Card>

                            <div className="bg-white rounded-2xl shadow-xl border border-[#edeff2] absolute top-10 sm:top-1/4 -left-4 sm:-left-8 px-5 py-4 flex items-center gap-3 animate-float z-20">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#a8a1ff]/15 text-[#a8a1ff]">
                                    <Brain size={24} />
                                </div>
                                <span className="font-bold text-sm text-[#282e3e]">Active Recall</span>
                            </div>

                            <div className="bg-white rounded-2xl shadow-xl border border-[#edeff2] absolute bottom-10 sm:bottom-1/4 -right-4 sm:-right-8 px-5 py-4 flex items-center gap-3 animate-float-reverse z-20">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#4255ff]/15 text-[#4255ff]">
                                    <CheckCircle2 size={24} />
                                </div>
                                <span className="font-bold text-sm text-[#282e3e]">95% Correct</span>
                            </div>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section className="py-20 lg:py-24 px-6 bg-[#fcfdfe] border-t border-[#edeff2]">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 text-[#282e3e]">Everything you need to excel</h2>
                            <p className="text-lg text-[#586380]">Powerful tools designed to help students learn faster and remember longer.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            <Card className="!rounded-3xl hover:-translate-y-2 !transition-all !duration-300 hover:!border-[#4255ff] hover:!shadow-2xl">
                                <Card.Body className="p-8 lg:p-10 h-full">
                                    <div className="w-14 h-14 bg-[#4255ff]/5 rounded-2xl flex items-center justify-center mb-6 text-[#4255ff]">
                                        <Brain size={28} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-[#282e3e]">Smart Flashcards</h3>
                                    <p className="text-[#586380] leading-relaxed">Our spaced-repetition algorithm adapts to your learning pace, focusing on what you need to study most.</p>
                                </Card.Body>
                            </Card>

                            <Card className="!rounded-3xl hover:-translate-y-2 !transition-all !duration-300 hover:!border-[#4255ff] hover:!shadow-2xl">
                                <Card.Body className="p-8 lg:p-10 h-full">
                                    <div className="w-14 h-14 bg-[#4255ff]/5 rounded-2xl flex items-center justify-center mb-6 text-[#4255ff]">
                                        <BookOpen size={28} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-[#282e3e]">Interactive Tests</h3>
                                    <p className="text-[#586380] leading-relaxed">Generate practice tests from your study sets to simulate real exam conditions and build confidence.</p>
                                </Card.Body>
                            </Card>

                            <Card className="!rounded-3xl hover:-translate-y-2 !transition-all !duration-300 hover:!border-[#4255ff] hover:!shadow-2xl">
                                <Card.Body className="p-8 lg:p-10 h-full">
                                    <div className="w-14 h-14 bg-[#4255ff]/5 rounded-2xl flex items-center justify-center mb-6 text-[#4255ff]">
                                        <Users size={28} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-[#282e3e]">Study Groups</h3>
                                    <p className="text-[#586380] leading-relaxed">Collaborate with classmates, share study sets, and compete on leaderboards to stay motivated.</p>
                                </Card.Body>
                            </Card>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="py-20 lg:py-24 px-6 max-w-5xl mx-auto border-t border-[#edeff2]">
                        <div className="bg-gradient-to-br from-[#4255ff] to-[#6366f1] rounded-[32px] p-10 lg:p-20 text-center shadow-2xl shadow-[#4255ff]/20">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 text-white leading-tight">Ready to boost your grades?</h2>
                            <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto">Join Kitra today and start your journey towards academic excellence.</p>
                            <Button
                                variant="white"
                                size="lg"
                                className="!px-10 !py-4 !text-lg !font-bold w-full sm:w-auto"
                                onClick={() => navigate('/dashboard')}
                            >
                                Create Your Account
                            </Button>
                        </div>
                    </section>
                </main>
            </div>
        </MainLayout>
    );
};

export default HomePage;



