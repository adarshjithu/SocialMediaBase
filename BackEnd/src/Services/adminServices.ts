import { AdminInterface } from "../Inteface/IAdmin";
import { IUser } from "../Models/userModel";
import { AdminRepository } from "../Repositories/admin/adminRepository";
import { comparePassword } from "../Utils/password";
import { generateRefreshToken } from "../Utils/token";
interface ServiceResponse {
     success: boolean;
     message: string;
     admin?: AdminInterface;
     adminAccessToken?: string;
}


export class AdminServices {
     constructor(public adminRepository: AdminRepository) {}

// To get all the user data
     async getAllUsers(page: number | any, type: string | any): Promise<IUser[] | null | undefined> {
          try {
               const allUsers = await this.adminRepository.getAllUsers(page, type);
               return allUsers;
          } catch (error) {
               console.log(error as Error);
               return null;
          }
     }

     //For blocking a user
     async blockUser(userId: string): Promise<ServiceResponse | null | undefined> {
          try {
               const res = await this.adminRepository.blockUser(userId);
               console.log(res?.isBlocked);
               if (res?.isBlocked) {
                    return { success: true, message: "User has been blocked successfully" };
               } else {
                    return { success: true, message: "User has been Unblocked successfully" };
               }
          } catch (error) {
               console.log(error as Error);
          }
     }
     
     //Deleting a specific user
     async deleteUser<T>(userId: T): Promise<Record<string, any> | undefined|null> {
          try {
               return await this.adminRepository.deleteUser(userId);
          } catch (error) {
               console.log(error as Error);
               return null;
          }
     }
     
     //Admin login
     async login<T>(adminData: { email: string; password: string }): Promise<Record<string, any> | undefined> {
          try {
               const admin = await this.adminRepository.getAdminByEmail(adminData.email);
               if (!admin) return { success: false, message: "Invalid Email" };
               const isPasswordValid = await comparePassword(adminData?.password, admin.password);
               console.log(isPasswordValid);
               if (isPasswordValid) {
                    const adminAccessToken = generateRefreshToken(admin._id);
                    return { success: true, message: "Admin Login Successfull", admin: admin, adminAccessToken: adminAccessToken };
               } else {
                    return { success: false, message: "Invalid password" };
               }
          } catch (error) {
               console.log(error as Error);

          }
     }
}
