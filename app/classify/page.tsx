'use client'

import { useState } from 'react'
import Header from '../components/Header';

export default function ClassifyPage() {

    // Keep track of the classification result and the model loading status.
    const [result, setResult] = useState(null);
    const [ready, setReady] = useState<boolean | null>(null);

    const classify = async (text: string | number | boolean) => {
        if (!text) return;
        if (ready === null) setReady(false);

        // Make a request to the /classify route on the server.
        const result = await fetch(`/classify?text=${encodeURIComponent(text)}`);

        // If this is the first time we've made a request, set the ready flag.
        if (!ready) setReady(true);

        const json = await result.json();
        setResult(json);
    };
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header title="Cognitive Components" />
            <main className="flex min-h-screen flex-col items-center justify-center p-12">
                <h1 className="text-5xl font-bold mb-2 text-center">Simple Classifier</h1>
                <h2 className="text-2xl mb-4 text-center">Type in a statement</h2>
                <input
                    type="text"
                    className="w-full max-w-xs p-2 border border-gray-300 rounded mb-4"
                    placeholder="Enter text here"
                    onInput={e => {
                        classify((e.target as HTMLInputElement).value);
                    }}
                />

                {ready !== null && (
                    <pre className="bg-gray-100 p-2 rounded">
                        {
                            (!ready || !result) ? 'Loading...' : JSON.stringify(result, null, 2)}
                    </pre>
                )}
            </main>
        </div>
    )
}