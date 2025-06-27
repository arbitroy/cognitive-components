'use client'
import { useState, useEffect } from 'react';

export function useSimpleAI() {
    const [model, setModel] = useState<any>(null);
    const [ready, setReady] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Only run on client side
        if (typeof window === 'undefined') return;

        async function loadModel() {
            try {
                // Dynamic import to prevent SSR issues
                const { pipeline } = await import('@xenova/transformers');
                const modelInstance = await pipeline('text-generation', 'Xenova/distilgpt2');
                setModel(modelInstance);
                setReady(true);
            } catch (err) {
                console.error('Failed to load model:', err);
                setError(err instanceof Error ? err.message : 'Failed to load model');
            }
        }

        loadModel();
    }, []);

    const generate = async (text: string) => {
        if (!model) return '';
        try {
            const result = await model(text, { max_new_tokens: 30 });
            return result[0]?.generated_text || '';
        } catch (err) {
            console.error('Generation failed:', err);
            return 'Error generating text';
        }
    };

    return { generate, ready, error };
}