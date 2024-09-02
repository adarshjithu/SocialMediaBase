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
exports.AdminServices = void 0;
const password_1 = require("../Utils/password");
const token_1 = require("../Utils/token");
class AdminServices {
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }
    // To get all the user data
    getAllUsers(page, type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allUsers = yield this.adminRepository.getAllUsers(page, type);
                return allUsers;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    //For blocking a user
    blockUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.adminRepository.blockUser(userId);
                console.log(res === null || res === void 0 ? void 0 : res.isBlocked);
                if (res === null || res === void 0 ? void 0 : res.isBlocked) {
                    return { success: true, message: "User has been blocked successfully" };
                }
                else {
                    return { success: true, message: "User has been Unblocked successfully" };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //Deleting a specific user
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.adminRepository.deleteUser(userId);
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    //Admin login
    login(adminData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin = yield this.adminRepository.getAdminByEmail(adminData.email);
                if (!admin)
                    return { success: false, message: "Invalid Email" };
                const isPasswordValid = yield (0, password_1.comparePassword)(adminData === null || adminData === void 0 ? void 0 : adminData.password, admin.password);
                console.log(isPasswordValid);
                if (isPasswordValid) {
                    const adminAccessToken = (0, token_1.generateRefreshToken)(admin._id);
                    return { success: true, message: "Admin Login Successfull", admin: admin, adminAccessToken: adminAccessToken };
                }
                else {
                    return { success: false, message: "Invalid password" };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.AdminServices = AdminServices;
