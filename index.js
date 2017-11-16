'use strict';

const has = require('has');

const allRules = {
    'no-warning-comments-regexp': require('./lib/rules/no-warning-comments-regexp')
};

function filterRules (rules, predicate) {
    const result = {};
    for (const key in rules) {
        if (has(rules, key) && predicate(rules[key])) {
            result[key] = rules[key];
        }
    }
    return result;
}

function configureAsError (rules) {
    const result = {};
    for (const key in rules) {
        if (!has(rules, key)) {
            continue;
        }
        result[`sbtsbol/${key}`] = 2;
    }
    return result;
}

const activeRules = filterRules(allRules, rule => !rule.meta.deprecated);
const activeRulesConfig = configureAsError(activeRules);

const deprecatedRules = filterRules(allRules, rule => rule.meta.deprecated);

module.exports = {
    deprecatedRules: deprecatedRules,
    rules: allRules,
    configs: {
        recommended: {
            plugins: [
                'sbtsbol'
            ],
            rules: {
                'sbtsbol/no-warning-comments-regexp': 2
            }
        },
        all: {
            plugins: [
                'sbtsbol'
            ],
            rules: activeRulesConfig
        }
    }
};
