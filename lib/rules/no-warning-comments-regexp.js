"use strict";

function convertToRegExp (term) {
    return new RegExp(term, "i");
}

module.exports = {
    meta: {
        docs: {
            description: "disallow specified warning terms in comments by regexp",
            category: "Best Practices",
            recommended: true
        },
        schema: [
            {
                type: "object",
                properties: {
                    terms: {
                        type: "array",
                        items: {
                            type: "string"
                        }
                    },
                    message: {
                        type: "string"
                    }
                },
                additionalProperties: false
            }
        ]
    },

    create: function (context) {
        const config = context.options[0] || {};
        const terms = config.terms || [];
        const message = config.message;

        const regexps = terms.map(convertToRegExp);

        function checkComment (node) {
            regexps.forEach(function report (regex, index) {
                if (regex.test(node.value)) {
                    context.report({
                        node: node,
                        message: message || "Unexpected '{{term}}' comment.",
                        data: {
                            term: terms[index]
                        }
                    });
                }
            });
        }

        return {
            BlockComment: checkComment,
            LineComment: checkComment
        };
    }
};
