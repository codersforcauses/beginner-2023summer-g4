export declare class CharacterIterator implements IterableIterator<number> {
    private _input;
    private lastPosition;
    private currentPosition;
    private _lastWidth;
    constructor(input?: string);
    get input(): string;
    setInput(input: string): this;
    reset(): void;
    next(): IteratorResult<number, undefined>;
    get position(): number;
    get lastWidth(): number;
    get done(): boolean;
    [Symbol.iterator](): this;
}
