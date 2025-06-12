"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logSchema = new mongoose_1.default.Schema({
    oring: {
        type: String,
    },
    level: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low'
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.LogModel = mongoose_1.default.model("Log", logSchema);
