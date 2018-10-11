"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommandDispatcher_1 = __importDefault(require("./lib/CommandDispatcher"));
const LiteralArgumentBuilder_1 = require("./lib/builder/LiteralArgumentBuilder");
const RequiredArgumentBuilder_1 = require("./lib/builder/RequiredArgumentBuilder");
const ArgumentType_1 = require("./lib/arguments/ArgumentType");
const { word, string, greedyString, bool, integer, float } = ArgumentType_1.Type;
module.exports = {
    word, string, greedyString, bool, integer, float,
    CommandDispatcher: CommandDispatcher_1.default,
    literal: LiteralArgumentBuilder_1.literal,
    argument: RequiredArgumentBuilder_1.argument,
};
