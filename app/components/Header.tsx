import Link from 'next/link';
import React from 'react';



const Header: React.FC = () => (
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
                        <Link href="/" className=" text-3xl font-bold">Cognitive Components</Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link href="/classify" className=" hover:text-gray-900">Classify</Link>
                        <Link href="/customer-support" className=" hover:text-gray-900">Customer Support</Link>
                    </div>
                </div>
            </div>
        </nav>
    </header>
);

export default Header;