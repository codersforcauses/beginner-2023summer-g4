/**
 * Creates a transformer that changes all ASCII alphabet characters to
 * lower-case, leaving other characters unchanged.
 *
 * **Application order**
 *
 * It is recommended that this transformer be applied near the end of the
 * transformer chain. Using it before other transformers may have the effect of
 * making its changes useless as transformers applied after produce characters
 * of varying cases.
 *
 * @returns A container holding the transformer, which can then be passed to the
 * [[RegExpMatcher]].
 */
export declare function toAsciiLowerCaseTransformer(): import("../Transformers").SimpleTransformerContainer;
