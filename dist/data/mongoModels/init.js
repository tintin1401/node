"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDataBase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class MongoDataBase {
    static connect(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { mongoUrl, dbName } = options;
            try {
                yield mongoose_1.default.connect(mongoUrl, {
                    dbName: dbName,
                });
                console.log(`Connected to MongoDB at ${mongoUrl}`);
            }
            catch (error) {
                console.error("Error connecting to MongoDB:", error);
                throw error;
            }
        });
    }
}
exports.MongoDataBase = MongoDataBase;
