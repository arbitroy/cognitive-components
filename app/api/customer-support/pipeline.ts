import { pipeline } from "@huggingface/transformers";
// Configuration for our text classification model
const MODEL_NAME = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';
const TASK = 'text-classification'
const ZERO_SHOT_MODEL = 'Xenova/distilbert-base-uncased-mnli';
const ZERO_SHOT_TASK = 'zero-shot-classification';
const GENERATE_TITLE_MODEL = 'Xenova/distilgpt2'; //
const GENERATE_TITLE_TASK = 'text-generation';
// This will hold our loaded model instance
let sentimentClassifierInstance: any = null;
let caseClassifierInstance: any = null;
let titleClassifierInstance: any = null;
const CASE_TYPES = ['unknown', 'Returns', 'Questions', 'Comment/Idea', 'Complaint'];

/**
 * Get the text classification model instance
 * This function ensures we only load the model once and reuse it
 */
export async function getSatisfactionClassifier() {
    // If we already have a loaded model, return it
    if (sentimentClassifierInstance) {
        console.log('Using existing classifier instance');
        return sentimentClassifierInstance;
    }
    try {
        sentimentClassifierInstance = await pipeline(TASK, MODEL_NAME, {
            dtype: 'fp32'
        });
        return sentimentClassifierInstance;
    } catch (error) {
        console.error('Failed to load classifier:', error);
        throw error;
    }
}

export async function getCaseClassifier() {
    // If we already have a loaded model, return it
    if (caseClassifierInstance) {
        return caseClassifierInstance;
    }
    try {
        caseClassifierInstance = await pipeline(ZERO_SHOT_TASK, ZERO_SHOT_MODEL, {
            dtype: 'fp32'
        });
        return caseClassifierInstance;
    } catch (error) {
        console.error('Failed to load classifier:', error);
        throw error;
    }
}

export async function getTitleClassifier() {
    // If we already have a loaded model, return it
    if (titleClassifierInstance) {
        console.log('Using existing classifier instance');
        return titleClassifierInstance;
    }
    try {
        titleClassifierInstance = await pipeline(GENERATE_TITLE_TASK, GENERATE_TITLE_MODEL, {
            dtype: 'fp32'
        });
        return titleClassifierInstance;
    } catch (error) {
        console.error('Failed to load classifier:', error);
        throw error;
    }
}

const classifyCase = async (comment: string) => {
    const classifier = await getCaseClassifier(); // Load model
    const result = await classifier(comment, CASE_TYPES); // Use model
    return result.labels[0] || 'Unknown';
}

const classifySatisfaction = async (comment: string) => {
    const classifier = await getSatisfactionClassifier(); // Load model
    const result = await classifier(comment); // Use model
    return result[0]?.label === 'POSITIVE' ? 'Good' : 'Bad'; // Default to 'Neutral' if no label found
}

const generateTitle = async (comment: string, product: string) => {
    // Smart template with the first meaningful part of the comment
    const words = comment.trim().split(' ');
    const firstPart = words.slice(0, 5).join(' '); // First 5 words
    // Create a meaningful title format
    const title = `${product} - ${firstPart}${words.length > 5 ? '...' : ''}`;
    return title;
}

export async function classifyComment(comment: string, product: string): Promise<{ caseType: string; satisfaction: any; title: string }> {
    if (!comment) {
        throw new Error('Comment is required for classification');
    }
    if (!product) {
        throw new Error('Product is required for classification');
    }
    try {
        const [caseTypeResult, satisfactionResult, titleResult] = await runClassificationTasks(comment, product);
        console.log('Classification results:', {
            caseTypeResult,
            satisfactionResult,
            titleResult
        });
        return {
            caseType: caseTypeResult,
            satisfaction: satisfactionResult,
            title: titleResult
        };
    } catch (error) {
        console.error('Error during classification:', error);
        throw new Error('Classification failed');
    }
}

async function runClassificationTasks(comment: string, product: string): Promise<[any, any, any] | PromiseLike<[any, any, any]>> {

    const [caseTypeResult, satisfactionResult, titleResult] = await Promise.all([
        classifyCase(comment),
        classifySatisfaction(comment),
        generateTitle(comment, product)
    ]);
    return [caseTypeResult, satisfactionResult, titleResult];
}

