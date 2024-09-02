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
exports.AdminRepository = void 0;
const adminModel_1 = require("../../Models/adminModel");
const userModel_1 = require("../../Models/userModel");
class AdminRepository {
    blockUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield userModel_1.User.updateOne({ _id: userId }, [
                    { $set: { isBlocked: { $cond: { if: { $eq: ["$isBlocked", true] }, then: false, else: true } } } },
                ]);
                const res = yield userModel_1.User.findOne({ _id: userId });
                return res;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.User.deleteOne({ _id: userId });
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    getAdminByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield adminModel_1.Admin.findOne({ email: email });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getAllUsers(page, type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let filter = {};
                if (type == 'active')
                    filter = { isBlocked: false };
                if (type == 'blocked')
                    filter = { isBlocked: true };
                const skip = page * 10;
                return yield userModel_1.User.find(filter).skip(skip).limit(10);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.AdminRepository = AdminRepository;
