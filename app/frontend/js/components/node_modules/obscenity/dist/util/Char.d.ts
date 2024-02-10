export declare const enum CharacterCode {
    LowerA = 97,
    LowerZ = 122,
    UpperA = 65,
    UpperZ = 90,
    Zero = 48,
    Nine = 57,
    LeftSquareBracket = 91,
    RightSquareBracket = 93,
    QuestionMark = 63,
    Backslash = 92,
    Newline = 10,
    VerticalBar = 124,
    HighSurrogateStart = 55296,
    HighSurrogateEnd = 56319,
    LowSurrogateStart = 56320,
    LowSurrogateEnd = 57343
}
export declare function isHighSurrogate(char: number): boolean;
export declare function isLowSurrogate(char: number): boolean;
export declare function convertSurrogatePairToCodePoint(highSurrogate: number, lowSurrogate: number): number;
export declare function isWordChar(char: number): boolean;
export declare function isDigit(char: number): boolean;
export declare function isAlphabetic(char: number): boolean;
export declare function isLowerCase(char: number): boolean;
export declare function isUpperCase(char: number): boolean;
export declare function invertCaseOfAlphabeticChar(char: number): number;
export declare function getAndAssertSingleCodePoint(str: string): number;
