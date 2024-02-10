import type { ParsedPattern } from './Nodes';
export declare class Parser {
    private input;
    private line;
    private column;
    private position;
    private lastColumn;
    private lastWidth;
    parse(input: string): ParsedPattern;
    private setInput;
    private nextNode;
    private get done();
    private parseOptional;
    private parseWildcard;
    private parseBoundaryAssertion;
    private parseLiteral;
    private reportError;
    private mark;
    private accept;
    private peek;
    private next;
    private backup;
}
