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
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("./user.model");
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.UserModel.find();
    return users;
});
const getById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findOne({
        _id
    });
    return user;
});
const getByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findOne({
        email
    });
    return user;
});
const store = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_model_1.UserModel();
    user.email = params.email;
    user.password = params.password;
    const result = yield user.save();
    return result;
});
const update = (_id, params) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.updateOne({
        _id
    }, params);
    return user;
});
const destroy = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.deleteOne({ _id });
    return result;
});
exports.default = {
    getAll,
    getById,
    getByEmail,
    store,
    update,
    destroy,
};
