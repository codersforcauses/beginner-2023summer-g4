/**
 * Custom error thrown by the parser when syntactical errors are detected.
 */
export declare class ParserError extends Error {
    readonly name = "ParserError";
    /**
     * The line on which the error occurred (one-based).
     */
    readonly line: number;
    /**
     * The column on which the error occurred (one-based).
     * Note that surrogate pairs are counted as 1 column wide, not 2.
     */
    readonly column: number;
    constructor(message: string, line: number, column: number);
}
