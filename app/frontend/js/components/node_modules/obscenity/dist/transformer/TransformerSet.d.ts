import type { TransformerContainer } from './Transformers';
export declare class TransformerSet {
    private readonly transformers;
    private readonly statefulTransformers;
    constructor(transformers: TransformerContainer[]);
    applyTo(char: number): number | undefined;
    resetAll(): void;
}
