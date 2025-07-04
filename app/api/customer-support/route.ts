import { NextResponse } from "next/server";
import { classifyComment } from "./pipeline";


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
            // Use the model to classify the text
            const result = await classifyComment(comment, product);
            const feedbackEntry = {
                caseType: result.caseType,
                satisfaction: result.satisfaction,
                title: result.title,
                customer: customer_name,    // from form
                product: product           // from form
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