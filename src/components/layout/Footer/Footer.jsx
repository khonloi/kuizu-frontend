import React from 'react';
import { ChevronDown } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white py-12 px-12 border-t-2 border-[#edeff2] md:py-10 md:px-6">
            <div className="mx-auto flex justify-between gap-5 flex-wrap lg:gap-10">
                <div className="min-w-40 mb-10 md:flex-1 md:mb-0">
                    <h5 className="text-base font-bold text-[#282e3e] mb-6 tracking-tight">About</h5>
                    <ul className="list-none p-0 m-0">
                        <li className="mb-3">
                            <a href="/about" className="no-underline text-sm font-semibold text-[#282e3e] transition-all hover:text-[#4255ff] hover:underline">
                                About Kitra
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="min-w-40 mb-10 md:flex-1 md:mb-0">
                    <h5 className="text-base font-bold text-[#282e3e] mb-6 tracking-tight">For students</h5>
                    <ul className="list-none p-0 m-0">
                        <li className="mb-3"><a href="/flashcard-sets" className="no-underline text-sm font-semibold text-[#282e3e] transition-all hover:text-[#4255ff] hover:underline">Flashcards</a></li>
                        <li className="mb-3"><a href="/test" className="no-underline text-sm font-semibold text-[#282e3e] transition-all hover:text-[#4255ff] hover:underline">Test</a></li>
                        <li className="mb-3"><a href="/learn" className="no-underline text-sm font-semibold text-[#282e3e] transition-all hover:text-[#4255ff] hover:underline">Learn</a></li>
                        <li className="mb-3"><a href="/study-groups" className="no-underline text-sm font-semibold text-[#282e3e] transition-all hover:text-[#4255ff] hover:underline">Study groups</a></li>
                        <li className="mb-3"><a href="/solutions" className="no-underline text-sm font-semibold text-[#282e3e] transition-all hover:text-[#4255ff] hover:underline">Solutions</a></li>
                        <li className="mb-3"><a href="/plus" className="no-underline text-sm font-semibold text-[#282e3e] transition-all hover:text-[#4255ff] hover:underline">Kitra Plus</a></li>
                    </ul>
                </div>

                <div className="min-w-40 mb-10 md:flex-1 md:mb-0">
                    <h5 className="text-base font-bold text-[#282e3e] mb-6 tracking-tight">For Teachers</h5>
                    <ul className="list-none p-0 m-0">
                        <li className="mb-3"><a href="/live" className="no-underline text-sm font-semibold text-[#282e3e] transition-all hover:text-[#4255ff] hover:underline">Live</a></li>
                        <li className="mb-3"><a href="/blog" className="no-underline text-sm font-semibold text-[#282e3e] transition-all hover:text-[#4255ff] hover:underline">Blog</a></li>
                        <li className="mb-3"><a href="/teachers-plus" className="no-underline text-sm font-semibold text-[#282e3e] transition-all hover:text-[#4255ff] hover:underline">Kitra Plus for Teachers</a></li>
                    </ul>
                </div>

                <div className="min-w-40 mb-10 md:flex-1 md:mb-0">
                    <h5 className="text-base font-bold text-[#282e3e] mb-6 tracking-tight">Resources</h5>
                    <ul className="list-none p-0 m-0">
                        <li className="mb-3"><a href="/help" className="no-underline text-sm font-semibold text-[#282e3e] transition-all hover:text-[#4255ff] hover:underline">Help Center</a></li>
                        <li className="mb-3"><a href="/signup" className="no-underline text-sm font-semibold text-[#282e3e] transition-all hover:text-[#4255ff] hover:underline">Sign up</a></li>
                        <li className="mb-3"><a href="/honor-code" className="no-underline text-sm font-semibold text-[#282e3e] transition-all hover:text-[#4255ff] hover:underline">Honor Code</a></li>
                        <li className="mb-3"><a href="/community" className="no-underline text-sm font-semibold text-[#282e3e] transition-all hover:text-[#4255ff] hover:underline">Community Guidelines</a></li>
                        <li className="mb-3"><a href="/terms" className="no-underline text-sm font-semibold text-[#282e3e] transition-all hover:text-[#4255ff] hover:underline">Terms</a></li>
                        <li className="mb-3"><a href="/privacy" className="no-underline text-sm font-semibold text-[#282e3e] transition-all hover:text-[#4255ff] hover:underline">Privacy</a></li>
                        <li className="mb-3"><a href="/california-privacy" className="no-underline text-sm font-semibold text-[#282e3e] transition-all hover:text-[#4255ff] hover:underline">San Andreas Privacy</a></li>
                        <li className="mb-3"><a href="/privacy-choices" className="no-underline text-sm font-semibold text-[#282e3e] transition-all hover:text-[#4255ff] hover:underline">Your Privacy Choices</a></li>
                        <li className="mb-3"><a href="/ads-cookies" className="no-underline text-sm font-semibold text-[#282e3e] transition-all hover:text-[#4255ff] hover:underline">Ad and Cookie Policy</a></li>
                        <li className="mb-3"><a href="/targeted-ads" className="no-underline text-sm font-semibold text-[#282e3e] transition-all hover:text-[#4255ff] hover:underline">Interest-Based Ads</a></li>
                        <li className="mb-3"><a href="/schools" className="no-underline text-sm font-semibold text-[#282e3e] transition-all hover:text-[#4255ff] hover:underline">Kitra for Schools</a></li>
                        <li className="mb-3"><a href="/parents" className="no-underline text-sm font-semibold text-[#282e3e] transition-all hover:text-[#4255ff] hover:underline">Parents</a></li>
                    </ul>
                </div>

                <div className="flex flex-col gap-5 min-w-40">
                    <h5 className="text-base font-bold text-[#282e3e] tracking-tight">Language</h5>
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#282e3e] cursor-pointer bg-[#f3f5f7] py-2 px-4 rounded-lg w-fit transition-all hover:bg-[#edeff2]">
                        <span>English</span>
                        <ChevronDown size={14} strokeWidth={3} />
                    </div>

                    <div className="bg-white p-3 rounded-2xl shadow-lg flex flex-col items-center w-28 transition-transform cursor-pointer hover:-translate-y-1">
                        <img
                            src="https://i.redd.it/69fkt08cnkk41.jpg"
                            alt="Get the app"
                            className="w-20 h-20 object-cover mb-2 rounded-lg"
                        />
                        <div className="flex flex-col items-center text-xs font-bold text-[#282e3e] leading-[1.2]">
                            <span>Get the App</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-auto mt-10 pt-6 border-t border-[#edeff2] text-sm font-semibold text-[#646f8a]">
                <p>&copy; {new Date().getFullYear()} Kaison Corporation.</p>
            </div>
        </footer>
    );
};

export default Footer;
