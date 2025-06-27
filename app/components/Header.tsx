import Link from 'next/link';
import React from 'react';

interface HeaderProps {
    title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'My App' }) => (
    <header style={{
        backgroundColor: '#282c34',
        color: '#fff',
        textAlign: 'center',
        fontSize: '1.5rem',
        fontWeight: 'bold'
    }}>
        <nav>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex-1 flex items-center justify-start">
                        <Link href="/" className=" text-lg font-semibold">Cognitive Components</Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link href="/classify" className=" hover:text-gray-900">Classify</Link>
                        <Link href="/contact" className="hover:text-gray-900">Contact</Link>
                    </div>
                </div>
            </div>
        </nav>
    </header>
);

export default Header;