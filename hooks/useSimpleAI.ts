'use client'
import { useState, useEffect } from 'react';
import { pipeline, TextGenerationPipeline } from '@xenova/transformers';

export function useSimpleAI() {
    const [model, setModel] = useState<TextGenerationPipeline | null>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        pipeline('text-generation', 'Xenova/distilgpt2')
            .then(setModel)
            .then(() => setReady(true));
    }, []);

    const generate = async (text: string) => {
        if (!model) return '';
        const result = await model(text, { max_new_tokens: 30 });
        // Type assertion to TextGenerationSingle[]
        return (result as any[])[0]?.generated_text || '';
    };

    return { generate, ready };
}