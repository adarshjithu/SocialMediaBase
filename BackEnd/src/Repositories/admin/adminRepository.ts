import { AdminInterface } from "../../Inteface/IAdmin";
import { Admin } from "../../Models/adminModel";
import { IUser, User } from "../../Models/userModel";
import { IAdminRepository } from "./IAdminRepository";

export class AdminRepository implements IAdminRepository {
  
     async blockUser(userId: string):Promise<null|Record<string,any>> {
          try {
               await User.updateOne({ _id: userId }, [
                    { $set: { isBlocked: { $cond: { if: { $eq: ["$isBlocked", true] }, then: false, else: true } } } },
               ]);
               const res = await User.findOne({ _id: userId });
               return res;
          } catch (error) {
               console.log(error as Error);
               return null;
          }
     }
     async deleteUser<T>(userId: T) :Promise<Record<string,any>|null>{
          try {
               return await User.deleteOne({ _id: userId });
          } catch (error) {
               console.log(error as Error);
               return null;
          }
     }
     async getAdminByEmail(email: string): Promise<AdminInterface | null | undefined> {
          try {
               return await Admin.findOne({ email: email });
          } catch (error) {
               console.log(error as Error);
          }
     }
     async getAllUsers(page: number,type:string):Promise<any> {
          try {
               let filter={}
               if(type=='active') filter = {isBlocked:false}
               if(type=='blocked') filter = {isBlocked:true}
              
               const skip = page * 10;
               return await User.find(filter).skip(skip).limit(10);
          } catch (error) {
               console.log(error as Error);
          }
     }

}
