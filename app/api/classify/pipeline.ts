import { pipeline, PipelineType } from "@huggingface/transformers";

// Use the Singleton pattern to enable lazy construction of the pipeline.
// NOTE: We wrap the class in a function to prevent code duplication (see below).
type ProgressCallback = ((progress: any) => void) | undefined;

const TASK: PipelineType = 'text-classification';
const MODEL = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';

// Declare global for hot reload in dev
// eslint-disable-next-line no-var
declare global {
    var PipelineSingleton: ReturnType<typeof P> | undefined;
}

const P = () => class PipelineSingletonClass {
    static task: PipelineType = TASK;
    static model: string = MODEL;
    static instance: Promise<any> | null = null;

    static async getInstance(progress_callback: ProgressCallback = undefined): Promise<any> {
        if (this.instance === null) {
            this.instance = pipeline(this.task, this.model, { progress_callback });
        }
        return this.instance;
    }
};

let PipelineSingleton: ReturnType<typeof P>;
if (process.env.NODE_ENV !== 'production') {
    if (!global.PipelineSingleton) {
        global.PipelineSingleton = P();
    }
    PipelineSingleton = global.PipelineSingleton;
} else {
    PipelineSingleton = P();
}
export default PipelineSingleton;