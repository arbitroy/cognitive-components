import { pipeline } from "@huggingface/transformers";

// Configuration for our text classification model
const MODEL_NAME = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';
const TASK = 'text-classification';

// This will hold our loaded model instance
let classifierInstance: any = null;

/**
 * Get the text classification model instance
 * This function ensures we only load the model once and reuse it
 */
export async function getClassifier() {
    // If we already have a loaded model, return it
    if (classifierInstance) {
        console.log('Using existing classifier instance');
        return classifierInstance;
    }

    // If not, load the model for the first time
    console.log('Loading classifier model...');
    try {
        classifierInstance = await pipeline(TASK, MODEL_NAME, {
            dtype: 'fp32', // Explicitly specify data type to remove the warning
            progress_callback: (progress: any) => {
                console.log('Model loading progress:', progress);
            }
        });
        console.log('Classifier model loaded successfully!');
        return classifierInstance;
    } catch (error) {
        console.error('Failed to load classifier:', error);
        throw error;
    }
}