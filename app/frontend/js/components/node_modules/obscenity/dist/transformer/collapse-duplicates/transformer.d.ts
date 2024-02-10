import type { StatefulTransformer } from '../Transformers';
import type { ProcessedCollapseDuplicatesTransformerOptions } from '.';
export declare class CollapseDuplicatesTransformer implements StatefulTransformer {
    private readonly defaultThreshold;
    private readonly customThresholds;
    private remaining;
    private lastChar;
    constructor({ defaultThreshold, customThresholds }: ProcessedCollapseDuplicatesTransformerOptions);
    transform(char: number): number | undefined;
    reset(): void;
}
