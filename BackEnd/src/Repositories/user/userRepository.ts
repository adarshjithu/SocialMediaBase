import { userInfo } from "os";
import { IUser, User } from "../../Models/userModel";
import { Iuser } from "../../Inteface/IUser";
import { IUserRepository } from "./IUserRepository";

class UserRepository implements IUserRepository {

// For checking user exist or not
     async emailExist(email: string): Promise<IUser | null> {
          try {
               const userFound = await User.findOne({ email: email });
               return userFound as IUser;
          } catch (error) {
               console.log(error as Error);
               return null;
          }
     }

// To Insert Userdata inside database
     async saveUser(data: IUser): Promise<Partial<IUser> | null> {
          try {
               const userObj = { name: data.name, email: data.email, phonenumber: data.phonenumber, password: data.password };
               const newUser = new User(userObj);
               await newUser.save();

               return { name: newUser.name, email: newUser.email, phonenumber: newUser.phonenumber, _id: newUser._id };
          } catch (error) {
               console.log(error as Error);
               return null;
          }
     }
// To check existing user with email
     async checkEmail(email: string): Promise<IUser | null> {
          try {
               return await User.findOne({ email: email });
          } catch (error) {
               console.log(error as Error);
               return null;
          }
     }

// Getting user data with _id
     async findById(id: string): Promise<IUser | null> {
          try {
               return await User.findById(id);
          } catch (error) {
               console.log(error as Error);
               return null;
          }
     }

// Get all the user data with email or phonenumber 
     async findByEmailOrPhone(data:Record<string,any>): Promise<any> {
          console.log(data)
          try {
               if(data.phonenumber){
                    return await User.findOne({phonenumber:data.phonenumber})
               }else{

                    return await User.findOne({email:data.email});
               }
          } catch (error) {
               
               return null;
          }
     }

// Update password of user with userid
     async updatePassword(newPassword: string, userId: string): Promise<any> {
          try {
               return await User.updateOne(
                    { _id: userId },
                    {
                         $set: { password: newPassword },
                    }
               );
          } catch (error) {
               console.log(error as Error);
               return null;
          }
     }
// Create user
     async createUser(userData:any): Promise<Record<string,any>|null> {
          try {
               await User.updateOne({email:userData.email},{$set:userData},{upsert:true,new:true})
               return await User.findOne({email:userData.email})
          } catch (error) {
               console.log(error as Error);
               return null;
          }
     }

}

export default UserRepository;
