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
const userModel_1 = require("../../Models/userModel");
class UserRepository {
    // For checking user exist or not
    emailExist(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userFound = yield userModel_1.User.findOne({ email: email });
                return userFound;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    // To Insert Userdata inside database
    saveUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userObj = { name: data.name, email: data.email, phonenumber: data.phonenumber, password: data.password };
                const newUser = new userModel_1.User(userObj);
                yield newUser.save();
                return { name: newUser.name, email: newUser.email, phonenumber: newUser.phonenumber, _id: newUser._id };
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    // To check existing user with email
    checkEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.User.findOne({ email: email });
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    // Getting user data with _id
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.User.findById(id);
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    // Get all the user data with email or phonenumber 
    findByEmailOrPhone(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(data);
            try {
                if (data.phonenumber) {
                    return yield userModel_1.User.findOne({ phonenumber: data.phonenumber });
                }
                else {
                    return yield userModel_1.User.findOne({ email: data.email });
                }
            }
            catch (error) {
                return null;
            }
        });
    }
    // Update password of user with userid
    updatePassword(newPassword, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.User.updateOne({ _id: userId }, {
                    $set: { password: newPassword },
                });
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    // Create user
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield userModel_1.User.updateOne({ email: userData.email }, { $set: userData }, { upsert: true, new: true });
                return yield userModel_1.User.findOne({ email: userData.email });
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
}
exports.default = UserRepository;
