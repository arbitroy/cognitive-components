import { NextResponse } from 'next/server'
import { getClassifier } from './pipeline';

export async function GET(request: { nextUrl: { searchParams: { get: (arg0: string) => any; }; }; }) {
    const text = request.nextUrl.searchParams.get('text');
    
    if (!text) {
        return NextResponse.json({
            error: 'Missing text parameter',
        }, { status: 400 });
    }

    console.log('Classifying text:', text);
    
    try {
        // Get the classification model (loads it if needed)
        const classifier = await getClassifier();

        // Use the model to classify the text
        const result = await classifier(text);
        console.log('Classification result:', result);

        return NextResponse.json(result);
    } catch (error) {
        console.error('Classification failed:', error);
        return NextResponse.json({
            error: 'Classification failed'
        }, { status: 500 });
    }
}