"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); //npm install --save-dev @types/express { if u use typescript you need eject this line in the console. }
const app = (0, express_1.default)();
exports.default = app;
