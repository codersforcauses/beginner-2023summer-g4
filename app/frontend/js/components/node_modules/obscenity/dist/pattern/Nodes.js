"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyntaxKind = void 0;
/**
 * An enumeration of the kinds of nodes there are.
 */
var SyntaxKind;
(function (SyntaxKind) {
    SyntaxKind[SyntaxKind["Optional"] = 0] = "Optional";
    SyntaxKind[SyntaxKind["Wildcard"] = 1] = "Wildcard";
    SyntaxKind[SyntaxKind["Literal"] = 2] = "Literal";
    SyntaxKind[SyntaxKind["BoundaryAssertion"] = 3] = "BoundaryAssertion";
})(SyntaxKind || (exports.SyntaxKind = SyntaxKind = {}));
