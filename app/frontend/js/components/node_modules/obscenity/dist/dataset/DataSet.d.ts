import type { MatchPayload } from '../matcher/MatchPayload';
import type { RegExpMatcherOptions } from '../matcher/regexp/RegExpMatcher';
import type { ParsedPattern } from '../pattern/Nodes';
/**
 * Holds phrases (groups of patterns and whitelisted terms), optionally
 * associating metadata with them.
 *
 * @typeParam MetadataType - Metadata type for phrases. Note that the metadata
 * type is implicitly nullable.
 */
export declare class DataSet<MetadataType> {
    private readonly containers;
    private patternCount;
    private readonly patternIdToPhraseContainer;
    /**
     * Adds all the phrases from the dataset provided to this one.
     *
     * @example
     * ```typescript
     * const customDataset = new DataSet().addAll(englishDataset);
     * ```
     * @param other - Other dataset.
     */
    addAll(other: DataSet<MetadataType>): this;
    /**
     * Removes phrases that match the predicate given.
     *
     * @example
     * ```typescript
     * const customDataset = new DataSet<{ originalWord: string }>()
     * 	.addAll(englishDataset)
     * 	.removePhrasesIf((phrase) => phrase.metadata.originalWord === 'fuck');
     * ```
     * @param predicate - A predicate that determines whether or not a phrase should be removed.
     * Return `true` to remove, `false` to keep.
     */
    removePhrasesIf(predicate: (phrase: PhraseContainer<MetadataType>) => boolean): this;
    /**
     * Adds a phrase to this dataset.
     *
     * @example
     * ```typescript
     * const data = new DataSet<{ originalWord: string }>()
     * 	.addPhrase((phrase) => phrase.setMetadata({ originalWord: 'fuck' })
     * 		.addPattern(pattern`fuck`)
     * 		.addPattern(pattern`f[?]ck`)
     * 		.addWhitelistedTerm('Afck'))
     * 	.build();
     * ```
     * @param fn - A function that takes a [[PhraseBuilder]], adds
     * patterns/whitelisted terms/metadata to it, and returns it.
     */
    addPhrase(fn: (builder: PhraseBuilder<MetadataType>) => PhraseBuilder<MetadataType>): this;
    /**
     * Retrieves the phrase metadata associated with a pattern and returns a
     * copy of the match payload with said metadata attached to it.
     *
     * @example
     * ```typescript
     * const matches = matcher.getAllMatches(input);
     * const matchesWithPhraseMetadata = matches.map((match) => dataset.getPayloadWithPhraseMetadata(match));
     * // Now we can access the 'phraseMetadata' property:
     * const phraseMetadata = matchesWithPhraseMetadata[0].phraseMetadata;
     * ```
     * @param payload - Original match payload.
     */
    getPayloadWithPhraseMetadata(payload: MatchPayload): MatchPayloadWithPhraseMetadata<MetadataType>;
    /**
     * Returns the dataset in a format suitable for usage with the [[RegExpMatcher]].
     *
     * @example
     * ```typescript
     * // With the RegExpMatcher:
     * const matcher = new RegExpMatcher({
     * 	...dataset.build(),
     * 	// additional options here
     * });
     * ```
     */
    build(): Pick<RegExpMatcherOptions, 'blacklistedTerms' | 'whitelistedTerms'>;
    private registerContainer;
}
/**
 * Builder for phrases.
 */
export declare class PhraseBuilder<MetadataType> {
    private readonly patterns;
    private readonly whitelistedTerms;
    private metadata?;
    /**
     * Associates a pattern with this phrase.
     *
     * @param pattern - Pattern to add.
     */
    addPattern(pattern: ParsedPattern): this;
    /**
     * Associates a whitelisted pattern with this phrase.
     *
     * @param term - Whitelisted term to add.
     */
    addWhitelistedTerm(term: string): this;
    /**
     * Associates some metadata with this phrase.
     *
     * @param metadata - Metadata to use.
     */
    setMetadata(metadata?: MetadataType): this;
    /**
     * Builds the phrase, returning a [[PhraseContainer]] for use with the
     * [[DataSet]].
     */
    build(): PhraseContainer<MetadataType>;
}
/**
 * Extends the default match payload by adding phrase metadata.
 */
export type MatchPayloadWithPhraseMetadata<MetadataType> = MatchPayload & {
    /**
     * Phrase metadata associated with the pattern that matched.
     */
    phraseMetadata?: MetadataType;
};
/**
 * Represents a phrase.
 */
export interface PhraseContainer<MetadataType> {
    /**
     * Metadata associated with this phrase.
     */
    metadata?: MetadataType;
    /**
     * Patterns associated with this phrase.
     */
    patterns: ParsedPattern[];
    /**
     * Whitelisted terms associated with this phrase.
     */
    whitelistedTerms: string[];
}
