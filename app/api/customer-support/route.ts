import { NextResponse } from "next/server";
import { getClassifier } from "../classify/pipeline";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        const comment = formData.get('comment') as string;
        const customer_name = formData.get('customer_name') as string;
        const product = formData.get('product') as string;

        if (!comment || !customer_name || !product) {
            return NextResponse.json({
                error: 'Missing required fields'
            }, { status: 400 });
        }

        try {
            // Get the classification model (loads it if needed)
            const classifier = await getClassifier();

            // Use the model to classify the text
            const result = await classifier(comment);
            const feedbackEntry = {
                caseType: result[0]?.label || 'Unknown',
                title: comment.substring(0, 50) + '...', // Simple title for now
                customer: customer_name,
                product: product,
                satisfaction: 'Good' // Mock for now, we'll add real classification later
            };

            return NextResponse.json({
                feedBack: [feedbackEntry] // Your frontend expects data.feedBack
            });
        } catch (error) {
            console.error('Classification failed:', error);
            return NextResponse.json({
                error: 'Classification failed'
            }, { status: 500 });
        }
    } catch (error) {
        // This is where you'd catch the "no form data" error
        return NextResponse.json({
            error: 'Invalid form data'
        }, { status: 400 });
    }
}