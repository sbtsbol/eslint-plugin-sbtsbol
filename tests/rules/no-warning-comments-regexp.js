"use strict";

const rule = require("../../../lib/rules/no-warning-comments-regexp");
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester();

ruleTester.run("no-warning-comments-regexp", rule, {
    valid: [
        // { code: "// any comment", options: [{ terms: ["fixme"] }] }
    ],
    invalid: [
        // { code: "// fixme", errors: [{ message: "Unexpected 'fixme' comment." }] }
    ]
});