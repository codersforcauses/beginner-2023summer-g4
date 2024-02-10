/**
 * Maps certain characters to other characters, leaving other characters
 * unchanged.
 *
 * **Application order**
 *
 * It is recommended that this transformer be applied near the start of the
 * transformer chain.
 *
 * @example
 * ```typescript
 * // Transform 'a' to 'b'.
 * const transformer = remapCharactersTransformer({ 'b': 'a' });
 * const matcher = new RegExpMatcher({ ..., blacklistMatcherTransformers: [transformer] });
 * ```
 * @example
 * ```typescript
 * // Transform '🅱️' to 'b', and use a map instead of an object as the argument.
 * const transformer = remapCharactersTransformer(new Map([['b', '🅱️']]));
 * const matcher = new RegExpMatcher({ ..., blacklistMatcherTransformers: [transformer] });
 * ```
 * @example
 * ```typescript
 * // Transform '🇴' and '0' to 'o'.
 * const transformer = remapCharactersTransformer({ o: '🇴0' });
 * const matcher = new RegExpMatcher({ ..., blacklistMatcherTransformers: [transformer] });
 * ```
 * @param mapping - A map/object mapping certain characters to others.
 * @returns A container holding the transformer, which can then be passed to the
 * [[RegExpMatcher]].
 * @see [[resolveConfusablesTransformer|  Transformer that handles confusable Unicode characters]]
 * @see [[resolveLeetSpeakTransformer | Transformer that handles leet-speak]]
 */
export declare function remapCharactersTransformer(mapping: CharacterMapping): import("../Transformers").SimpleTransformerContainer;
/**
 * Maps characters to other characters.
 * The key of the map/object should be the transformed character, while the value
 * should be a set of characters that map to the transformed character.
 */
export type CharacterMapping = Map<string, string> | Record<string, string>;
