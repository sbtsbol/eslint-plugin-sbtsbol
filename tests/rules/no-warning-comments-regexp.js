"use strict";

const rule = require("../../lib/rules/no-warning-comments-regexp");
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester();

const ruleMatch = '\\b[\\w/]+\\b(-\\b[\\w/]+\\b)*(?!-)'
const disableMatch = 'eslint-disable(-line)?'
const startsWith = '^ ?'

const oneRuleComment = startsWith + disableMatch + ' ' + ruleMatch + '(?!, comment: .{10,}) ?'
const noMultiDisable = startsWith + disableMatch + ' ' + ruleMatch + '(, ' + ruleMatch + ')+[^:] ?'

ruleTester.run("no-warning-comments-regexp", rule, {
    valid: [
        {
            code: "// fixme",
            options: [{ terms: ["todo"] }]
        },
        {
            code: "/* fixme */",
            options: [{ terms: ["todo"] }]
        },
        {
            code: "/* eslint-disable something-disabled, comment: i am valid code for eslint */",
            options: [{ terms: [oneRuleComment] }]
        },
        {
            code: "/* eslint-disable-line something-disabled, comment: i am valid code for eslint */",
            options: [{ terms: [oneRuleComment] }]
        },
        {
            code: "/* eslint-disable something-disabled */",
            options: [{ terms: [noMultiDisable] }]
        },
        {
            code: "/* eslint-disable-line something-disabled */",
            options: [{ terms: [noMultiDisable] }]
        }
    ],
    invalid: [
        {
            code: "// todo",
            options: [{ terms: ["todo"] }],
            errors: [{ message: "Unexpected 'todo' comment." }]
        },
        {
            code: "/* todo */",
            options: [{ terms: ["todo"] }],
            errors: [{ message: "Unexpected 'todo' comment." }]
        },
        {
            code: "// todo: something specific",
            options: [{ terms: ["todo"] }],
            errors: [{ message: "Unexpected 'todo' comment." }]
        },
        {
            code: "/* todo: something specific */",
            options: [{ terms: ["todo"] }],
            errors: [{ message: "Unexpected 'todo' comment." }]
        },
        {
            code: "/* eslint-disable something-disabled, some text like a comment */",
            options: [{ terms: [oneRuleComment], message: 'Own msg' }],
            errors: [{ message: "Own msg" }]
        },
        {
            code: "/* eslint-disable-line something-disabled, comment: short */",
            options: [{ terms: [oneRuleComment], message: 'Own msg' }],
            errors: [{ message: "Own msg" }]
        },
        {
            code: "/* eslint-disable something-disabled, extra-disable */",
            options: [{ terms: [noMultiDisable], message: 'Own msg' }],
            errors: [{ message: "Own msg" }]
        },
        {
            code: "/* eslint-disable-line something-disabled, multi-disable */",
            options: [{ terms: [noMultiDisable], message: 'Own msg' }],
            errors: [{ message: "Own msg" }]
        }
    ]
});