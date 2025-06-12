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
const app_1 = __importDefault(require("./app"));
const mongoModels_1 = require("./data/mongoModels");
const PORT = process.env.PORT || 3000;
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoModels_1.MongoDataBase.connect({
        mongoUrl: 'mongodb://usuario:12345@localhost:27018',
        dbName: 'EntrenoYA'
    });
    const user = yield mongoModels_1.UserModel.create({
        fullName: "Carlos Trainer",
        email: "trainerfit@trainerfit.com",
        password: "password123",
        role: "trainer",
        phone: "876780981",
    });
    yield user.save();
    console.log(user);
    app_1.default.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
}))();
