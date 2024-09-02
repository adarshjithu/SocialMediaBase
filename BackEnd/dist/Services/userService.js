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
const otp_1 = require("../Utils/otp");
const password_1 = require("../Utils/password");
const token_1 = require("../Utils/token");
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    // Registering user while signup with otp
    registerUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let otp = (0, otp_1.generateOtp)();
                if (yield (0, otp_1.sendOtp)(userData, otp)) {
                    let time = Date.now();
                    let user = {
                        name: userData.name,
                        email: userData.email,
                        password: userData.password,
                        phonenumber: userData.phonenumber,
                        otp: otp,
                        time: time,
                    };
                    return { success: true, user: user };
                }
                else {
                    return { success: false };
                }
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    // Checking email exists or not
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.userRepository.emailExist(userData.email);
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    // Verify OTP in signup
    verifyOtp(otp, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const curTime = Date.now();
                const otpTime = userData === null || userData === void 0 ? void 0 : userData.time;
                let timeInSec = Math.floor((curTime - otpTime) / 1000);
                if (!userData) {
                    return { success: false, message: "User not found signup again.." };
                }
                if (!otp) {
                    return { success: false, message: "Enter a valid otp" };
                }
                if (timeInSec > 30) {
                    return { success: false, message: "OTP expired.." };
                }
                else {
                    if (otp == userData.otp) {
                        return { success: true, message: "OTP Verification successfull" };
                    }
                    else {
                        return { success: false, message: "Invalid OTP" };
                    }
                }
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    // Save all the user after OTP verification in the database
    saveUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                userData.password = yield (0, password_1.hashPassword)(userData.password);
                const user = yield this.userRepository.saveUser(userData);
                if (user) {
                    const userId = String(user === null || user === void 0 ? void 0 : user._id);
                    let accessToken = (0, token_1.generateAccessToken)(userId);
                    let refreshToken = (0, token_1.generateRefreshToken)(userId);
                    return {
                        success: true,
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        user: user,
                        message: "Authenication successfull",
                    };
                }
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    // For Verifying email
    verifyEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.checkEmail(email);
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    // For resending otp in the signup processs
    resendOtp(userData, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!userData) {
                    return { success: false, message: "User Data does't existe Signup again" };
                }
                else {
                    const otp = (0, otp_1.generateOtp)();
                    if (yield (0, otp_1.sendOtp)(userData, otp)) {
                        const time = Date.now();
                        userData.time = time;
                        userData.otp = otp;
                        return { success: true, userData: userData };
                    }
                    else {
                        return { success: false, message: "Otp Sending failed" };
                    }
                }
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    // For login user
    userLogin(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.checkEmail(userData.email);
                if (!user) {
                    return { success: false, message: "User Not Found" };
                }
                else {
                    if (user.isBlocked) {
                        return { success: false, message: "User blocked by Admin" };
                    }
                    const isPasswordValid = yield (0, password_1.comparePassword)(userData.password, user.password);
                    if (isPasswordValid) {
                        const accessToken = (0, token_1.generateAccessToken)(String(user === null || user === void 0 ? void 0 : user._id));
                        const refreshToken = (0, token_1.generateRefreshToken)(String(user === null || user === void 0 ? void 0 : user._id));
                        return {
                            success: true,
                            accessToken: accessToken,
                            refreshToken: refreshToken,
                            user: {
                                _id: user._id,
                                name: user.name,
                                email: user.email,
                                phonenumber: user.phonenumber,
                                isBlocked: user.isBlocked,
                                createdAt: user.createdAt,
                                updatedAt: user.updatedAt,
                            },
                            message: "Authenication successfull",
                        };
                    }
                    else {
                        return {
                            success: false,
                            message: "Invalid Password",
                        };
                    }
                }
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    // Find user byid
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.findById(id);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    verifyUser(arg) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let emailOrPhone = (0, token_1.validateInput)(arg.type);
                if (emailOrPhone.email || emailOrPhone.phonenumber) {
                    emailOrPhone.isForForget = true;
                    const user = yield this.userRepository.findByEmailOrPhone(emailOrPhone);
                    if (user) {
                        const otp = (0, otp_1.generateOtp)();
                        if (yield (0, otp_1.sendOtp)(emailOrPhone, otp)) {
                            return { success: true, time: Date.now(), forgetotp: otp, user: user, message: "Otp Send for verification" };
                        }
                        else {
                            return { succes: false, message: "OTP Verification failed" };
                        }
                    }
                    else {
                        return { success: false, message: "No valid user found with this email or password" };
                    }
                }
                else {
                    return { success: false, message: "Invalid Email or Phonenumber" };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    // Reset password
    resetPassword(userData, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findById(userId);
                if (!user) {
                    return {
                        success: false,
                        message: "User not found",
                    };
                }
                if (userData.oldpassword == userData.newpassword) {
                    return { success: false, message: "Enter a valid password which is not your old password" };
                }
                const isPasswordValid = yield (0, password_1.comparePassword)(userData.oldpassword, user.password);
                if (isPasswordValid) {
                    const newPassword = yield (0, password_1.hashPassword)(userData.newpassword);
                    let result = yield this.userRepository.updatePassword(newPassword, userId);
                    if (result) {
                        return { success: true, message: "Password Updated Successfully" };
                    }
                    else {
                        return { success: false, message: "Password Updation Error" };
                    }
                }
                else {
                    return {
                        success: false,
                        message: "Old Password Is Ivalid",
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    // Forget password
    forgetPassword(pass, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.findUserById(userId);
                const isSamePass = yield (0, password_1.comparePassword)(pass, user.password);
                if (isSamePass) {
                    return {
                        success: false,
                        message: "This password already used enter another password",
                    };
                }
                const hashPass = yield (0, password_1.hashPassword)(pass);
                const result = this.userRepository.updatePassword(hashPass, userId);
                return {
                    success: true,
                    message: "Password Updated Successfully",
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    // Google Authentication
    googleAuthentication(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isEmailExists = yield this.userRepository.emailExist(userData.email);
                if (isEmailExists) {
                    const accessToken = (0, token_1.generateAccessToken)(isEmailExists._id);
                    const refreshToken = (0, token_1.generateRefreshToken)(isEmailExists._id);
                    return { success: true, message: "Successfully Authenticated", user: isEmailExists, accessToken: accessToken, refreshToken: refreshToken };
                }
                else {
                    const password = String(Math.floor(Math.random() * 1000000));
                    userData.password = yield (0, password_1.hashPassword)(`${password}`);
                    const res = yield this.userRepository.createUser(userData);
                    if (res) {
                        const accessToken = (0, token_1.generateAccessToken)(res._id);
                        const refreshToken = (0, token_1.generateRefreshToken)(res._id);
                        return { success: true, message: "Successfully Authenticated", user: res, accessToken: accessToken, refreshToken: refreshToken };
                    }
                    else {
                        return { success: false, message: 'Authentication failed' };
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = UserService;
