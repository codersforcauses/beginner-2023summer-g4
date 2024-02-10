/**
 * Creates a transformer that maps leet-speak characters to their normalized
 * equivalent. For example, `$` becomes `s` when using this transformer.
 *
 * **Application order**
 *
 * It is recommended that this transformer be applied near the start of the
 * transformer chain, but after similar transformers that map characters to
 * other characters, such as the [[resolveConfusablesTransformer | transformer
 * that resolves confusable Unicode characters]].
 *
 * @example
 * ```typescript
 * const transformer = resolveLeetSpeakTransformer();
 * const matcher = new RegExpMatcher({ ..., blacklistMatcherTransformers: [transformer] });
 * ```
 * @returns A container holding the transformer, which can then be passed to the
 * [[RegExpMatcher]].
 */
export declare function resolveLeetSpeakTransformer(): import("../Transformers").SimpleTransformerContainer;
