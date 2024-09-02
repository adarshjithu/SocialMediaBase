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
const httpStatusCodes_1 = require("../Constants/httpStatusCodes");
const token_1 = require("../Utils/token");
const { OK, BAD_REQUEST, UNAUTHORIZED, CONFLICT } = httpStatusCodes_1.STATUS_CODES;
class UserControler {
    constructor(userServices) {
        this.userServices = userServices;
    }
    // @desc   User registation
    // @route  POST /register
    // @access Public
    registerUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const newUser = yield this.userServices.createUser(req.body);
                if (!newUser) {
                    let user = yield this.userServices.registerUser(req.body);
                    if (user.success == true) {
                        req.session.userData = user.user;
                        res.status(OK).json({ success: true, message: "OTP Send for verification..", time: (_a = user === null || user === void 0 ? void 0 : user.user) === null || _a === void 0 ? void 0 : _a.time, otpPlace: (_b = user === null || user === void 0 ? void 0 : user.user) === null || _b === void 0 ? void 0 : _b.email });
                    }
                    else {
                        res.status(BAD_REQUEST).json({ success: false, message: 'OTP authentication failed' });
                    }
                }
                else {
                    res.status(BAD_REQUEST).json({ success: false, message: "The email already in use.." });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @desc   OTP Verification
    // @route  POST /verify-otp
    // @access Public
    verifyOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //taking req.body.otp and session otp
                //validate otp verifying otp valid or not
                const otp = req.body.otp;
                const userData = req.session.userData;
                const isOtpValid = yield this.userServices.verifyOtp(otp, userData);
                const accessTokenMaxAge = 5 * 60 * 1000;
                const refreshTokenMaxAge = 48 * 60 * 60 * 1000;
                if (isOtpValid === null || isOtpValid === void 0 ? void 0 : isOtpValid.success) {
                    //Is otp valid create new User and JWT
                    const newUser = yield this.userServices.saveUser(userData);
                    if (newUser === null || newUser === void 0 ? void 0 : newUser.success) {
                        console.log(newUser.success);
                        res.cookie("access_token", newUser.accessToken, { maxAge: accessTokenMaxAge });
                        res.cookie("refresh_token", newUser.refreshToken, { maxAge: refreshTokenMaxAge });
                        res.status(OK).json(newUser);
                    }
                    else {
                        res.status(UNAUTHORIZED).json(isOtpValid);
                    }
                }
                else {
                    res.status(UNAUTHORIZED).json(isOtpValid);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @desc   For checking email already exist or not
    // @route  POST /verify-email
    // @access Public
    verifyEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let isEmailExists = yield this.userServices.verifyEmail(req.body.email);
                if (isEmailExists) {
                    res.status(CONFLICT).json({ success: false, message: "Email already exists" });
                }
                else {
                    res.status(OK).json({ success: true });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @desc   For resending otp
    // @route  POST /resend-otp
    // @access Public
    resendOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                let result = yield this.userServices.resendOtp(req.session.userData, req.params.id);
                if (result === null || result === void 0 ? void 0 : result.success) {
                    req.session.userData = result.userData;
                    res.status(OK).json({
                        success: true,
                        message: "OTP Send for verification..",
                        time: (_a = req.session.userData) === null || _a === void 0 ? void 0 : _a.time,
                        otpPlace: (_b = req.session.userData) === null || _b === void 0 ? void 0 : _b.email,
                    });
                }
                else {
                    res.status(BAD_REQUEST).json(result);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @desc   Logout user
    // @route  Get /logout
    // @access Public
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.cookie("access_token", "", { maxAge: 0 });
                res.cookie("refresh_token", "", { maxAge: 0 });
                res.status(OK).json({ success: true, message: "User logout successfull" });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @desc   Login user
    // @route  Post /login
    // @access Public
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accessTokenMaxAge = 5 * 60 * 1000;
                const refreshTokenMaxAge = 48 * 60 * 60 * 1000;
                const result = yield this.userServices.userLogin(req.body);
                if (result === null || result === void 0 ? void 0 : result.success) {
                    res.status(OK)
                        .cookie("access_token", result === null || result === void 0 ? void 0 : result.accessToken, { maxAge: accessTokenMaxAge })
                        .cookie("refresh_token", result === null || result === void 0 ? void 0 : result.refreshToken, { maxAge: refreshTokenMaxAge })
                        .json({ success: true, user: result === null || result === void 0 ? void 0 : result.user, message: result === null || result === void 0 ? void 0 : result.message });
                }
                else {
                    res.status(UNAUTHORIZED).json(result);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @desc   For refreshing accesstoken
    // @route  POST /refresh-token
    // @access Public
    refreshToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { refresh_token } = req.cookies;
            if (!refresh_token)
                res.status(401).json({ success: false, message: "No Refresh Token Found" });
            try {
                const decoded = (0, token_1.verifyRefreshToken)(refresh_token);
                const user = yield this.userServices.findUserById(decoded.data);
                if (user) {
                    const newAccessToken = (0, token_1.generateAccessToken)(user._id);
                    res.json({ access_token: newAccessToken });
                }
                else {
                    res.status(401).json({ success: false, message: "Invalid refresh token" });
                }
            }
            catch (error) {
                res.status(401).json({ success: false, message: "Invalid refresh token" });
            }
        });
    }
    // @desc   For forgeting password
    // @route  POST /forget-password
    // @access Public
    forgetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (!req.session.forgetData)
                    res.status(BAD_REQUEST).json({ success: false, message: "No User Found" });
                const result = yield this.userServices.forgetPassword(req.body.password, (_a = req.session.forgetData) === null || _a === void 0 ? void 0 : _a.user._id);
                console.log(result);
                if (result.success) {
                    res.status(OK).json(result);
                }
                else {
                    res.status(BAD_REQUEST).json(result);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @desc   For Verify email or phonenumber
    // @route  POST /verify-user
    // @access Public
    verifyUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userServices.verifyUser(req.body);
                if (result.success) {
                    req.session.forgetData = result;
                    console.log(req.session.forgetData);
                    res.status(OK).json({ success: true, time: result.time, userId: result.user._id, message: "Otp send for verification" });
                }
                else {
                    res.status(BAD_REQUEST).json(result);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @desc   For For reseting password of user
    // @route  POST /reset-password
    // @access Private
    resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userServices.resetPassword(req.body, req === null || req === void 0 ? void 0 : req.userId);
                console.log(result, 'result');
                // if (result.success) {
                //      res.status(OK).json(result);
                // } else {
                //      res.status(400).json(result);
                // }
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @desc   For For reseting password of user
    // @route  POST /reset-password
    // @access Private
    submitOtpForgetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            try {
                const time = (_a = req.session.forgetData) === null || _a === void 0 ? void 0 : _a.time;
                const otp = (_b = req.body) === null || _b === void 0 ? void 0 : _b.otp;
                const timeInSec = Math.floor((Date.now() - time) / 1000);
                if (timeInSec > 30) {
                    res.status(BAD_REQUEST).json({ success: false, message: "Otp Expired" });
                }
                if (otp == ((_d = (_c = req === null || req === void 0 ? void 0 : req.session) === null || _c === void 0 ? void 0 : _c.forgetData) === null || _d === void 0 ? void 0 : _d.forgetotp)) {
                    res.status(OK).json({ success: true, message: "OTP Verified Successfully" });
                }
                else {
                    res.status(BAD_REQUEST).json({ success: false, message: "Invalid Otp" });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @desc   Google authentication
    // @route  POST /googe/auth
    // @access Public
    googleAuth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accessTokenMaxAge = 5 * 60 * 1000;
                const refreshTokenMaxAge = 48 * 60 * 60 * 1000;
                const result = yield this.userServices.googleAuthentication(req.body);
                if (result.success) {
                    res.status(OK)
                        .cookie("access_token", result.accessToken, { maxAge: accessTokenMaxAge })
                        .cookie("refresh_token", result.refreshToken, { maxAge: refreshTokenMaxAge })
                        .json(result);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = UserControler;
