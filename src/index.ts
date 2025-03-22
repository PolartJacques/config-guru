#!/usr/bin/env node

import * as fs from "fs";

type TsConfigReview = {
  type: "Type Checking";
  comment: string;
};

function removeComments(content: string): string {
  return content
    .replace(/\/\/.*$/gm, "") // Remove single-line comments
    .replace(/\/\*[\s\S]*?\*\//g, ""); // Remove multi-line comments
}

function tryReadFile(path: string): string | undefined {
  try {
    return fs.readFileSync(path, { encoding: "utf-8" });
  } catch {
    return undefined;
  }
}

const tsConfigFile = tryReadFile("tsconfig.json");

if (!tsConfigFile) {
  throw "no tsconfig.json found";
}

const tsconfig = JSON.parse(removeComments(tsConfigFile));
const compilerOptions = tsconfig.compilerOptions ?? {};

const reviews: TsConfigReview[] = [];

if (compilerOptions.allowUnreachableCode !== false) {
  reviews.push({
    type: "Type Checking",
    comment: "compilerOptions.allowUnreachableCode should be set to false",
  });
}

if (compilerOptions.allowUnusedLabels !== false) {
  reviews.push({
    type: "Type Checking",
    comment: "compilerOptions.allowUnusedLabels should be set to false",
  });
}

if (compilerOptions.alwaysStrict === false) {
  reviews.push({
    type: "Type Checking",
    comment: "compilerOptions.alwaysStrict should not be set to false",
  });
}

if (compilerOptions.alwaysStrict === true && compilerOptions.strict === true) {
  reviews.push({
    type: "Type Checking",
    comment:
      "compilerOptions.alwaysStrict: true is redundant with compilerOptions.strict: true. Remove alwaysStrict",
  });
}

if (compilerOptions.exactOptionalPropertyTypes !== true) {
  reviews.push({
    type: "Type Checking",
    comment: "compilerOptions.exactOptionalPropertyTypes should be set to true",
  });
}

if (compilerOptions.noFallthroughCasesInSwitch !== true) {
  reviews.push({
    type: "Type Checking",
    comment: "compilerOptions.noFallthroughCasesInSwitch should be set to true",
  });
}

if (compilerOptions.noImplicitAny === false) {
  reviews.push({
    type: "Type Checking",
    comment: "compilerOptions.noImplicitAny should not be set to false",
  });
}

if (compilerOptions.noImplicitAny && compilerOptions.strict) {
  reviews.push({
    type: "Type Checking",
    comment:
      "compilerOptions.noImplicitAny: true is redundant with compilerOptions.strict: true. Remove noImplicitAny",
  });
}

if (compilerOptions.noImplicitOverride !== true) {
  reviews.push({
    type: "Type Checking",
    comment: "compilerOptions.noImplicitOverride should be set to true",
  });
}

if (compilerOptions.noImplicitThis === false) {
  reviews.push({
    type: "Type Checking",
    comment: "compilerOptions.noImplicitThis should not be set to false",
  });
}

if (
  compilerOptions.noImplicitThis === true &&
  compilerOptions.strict === true
) {
  reviews.push({
    type: "Type Checking",
    comment:
      "compilerOptions.noImplicitThis: true is redundant with compilerOptions.strict: true. Remove noImplicitThis",
  });
}

if (compilerOptions.noUncheckedIndexedAccess !== true) {
  reviews.push({
    type: "Type Checking",
    comment: "compilerOptions.noUncheckedIndexedAccess should be set to true",
  });
}

if (compilerOptions.noUnusedLocals !== true) {
  reviews.push({
    type: "Type Checking",
    comment: "compilerOptions.noUnusedLocals should be set to true",
  });
}

if (compilerOptions.noUnusedParameters !== true) {
  reviews.push({
    type: "Type Checking",
    comment: "compilerOptions.noUnusedParameters should be set to true",
  });
}

if (compilerOptions.strict !== true) {
  reviews.push({
    type: "Type Checking",
    comment: "compilerOptions.strict should be set to true",
  });
}

if (compilerOptions.strictBindCallApply === false) {
  reviews.push({
    type: "Type Checking",
    comment:
      "compilerOptions.strictBindCallApply should not be set to false. You should remove strictBindCallApply, and use compilerOptions.strict: true.",
  });
}

if (
  compilerOptions.strictBindCallApply === true &&
  compilerOptions.strict === true
) {
  reviews.push({
    type: "Type Checking",
    comment:
      "compilerOptions.strictBindCallApply: true is redundant with compilerOptions.strict: true. Remove strictBindCallApply",
  });
}

if (compilerOptions.strictBuiltinIteratorReturn === false) {
  reviews.push({
    type: "Type Checking",
    comment:
      "compilerOptions.strictBuiltinIteratorReturn should not be set to false. You should remove strictBuiltinIteratorReturn, and use compilerOptions.strict: true.",
  });
}

if (
  compilerOptions.strictBuiltinIteratorReturn === true &&
  compilerOptions.strict === true
) {
  reviews.push({
    type: "Type Checking",
    comment:
      "compilerOptions.strictBuiltinIteratorReturn: true is redundant with compilerOptions.strict: true. Remove strictBuiltinIteratorReturn",
  });
}

if (compilerOptions.strictFunctionTypes === false) {
  reviews.push({
    type: "Type Checking",
    comment:
      "compilerOptions.strictFunctionTypes should not be set to false. You should remove strictFunctionTypes, and use compilerOptions.strict: true.",
  });
}

if (
  compilerOptions.strictFunctionTypes === true &&
  compilerOptions.strict === true
) {
  reviews.push({
    type: "Type Checking",
    comment:
      "compilerOptions.strictFunctionTypes: true is redundant with compilerOptions.strict: true. Remove strictFunctionTypes",
  });
}

if (compilerOptions.strictNullChecks === false) {
  reviews.push({
    type: "Type Checking",
    comment:
      "compilerOptions.strictNullChecks should not be set to false. You should remove strictNullChecks, and use compilerOptions.strict: true.",
  });
}

if (
  compilerOptions.strictNullChecks === true &&
  compilerOptions.strict === true
) {
  reviews.push({
    type: "Type Checking",
    comment:
      "compilerOptions.strictNullChecks: true is redundant with compilerOptions.strict: true. Remove strictNullChecks",
  });
}

if (compilerOptions.strictPropertyInitialization === false) {
  reviews.push({
    type: "Type Checking",
    comment:
      "compilerOptions.strictPropertyInitialization should not be set to false. You should remove strictPropertyInitialization, and use compilerOptions.strict: true.",
  });
}

if (
  compilerOptions.strictPropertyInitialization === true &&
  compilerOptions.strict === true
) {
  reviews.push({
    type: "Type Checking",
    comment:
      "compilerOptions.strictPropertyInitialization: true is redundant with compilerOptions.strict: true. Remove strictPropertyInitialization",
  });
}

if (compilerOptions.useUnknownInCatchVariables === false) {
  reviews.push({
    type: "Type Checking",
    comment:
      "compilerOptions.useUnknownInCatchVariables should not be set to false. You should remove useUnknownInCatchVariables, and use compilerOptions.strict: true.",
  });
}

if (
  compilerOptions.useUnknownInCatchVariables === true &&
  compilerOptions.strict === true
) {
  reviews.push({
    type: "Type Checking",
    comment:
      "compilerOptions.useUnknownInCatchVariables: true is redundant with compilerOptions.strict: true. Remove useUnknownInCatchVariables",
  });
}

console.log(reviews);
