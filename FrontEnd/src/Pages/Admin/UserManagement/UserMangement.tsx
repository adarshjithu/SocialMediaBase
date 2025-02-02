import { useEffect, useState } from "react";

import { blockUser,deleteUser, getAllUsers } from "../../../Services/apiService/adminServices";
import "./UserManagement.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


function UserManagement() {
     const [users, setUsers] = useState([]);
     const [block, setBlock] = useState<boolean>(false);
     const [page, setPage] = useState<number>(0);
     const admin = useSelector((data: any) => data.auth.adminData);
     const navigate = useNavigate();
     const [type, setType] = useState<string>("");
     const [search, setSearch] = useState<string>("");
     const [allUsers,setAllUsers] = useState([])

     const banUser = async (user: any): Promise<void> => {
          await blockUser(user);
          setBlock(!block);
     };

     const deleteUserData = async(obj: any) => {
         
             await  deleteUser(obj)
            setBlock(!block)
          
     };

     const next = () => {
          if (users.length < 10) {
               toast.error("Max Page Limit Reached");
          } else {
               async function fetchData() {
                    const result = await getAllUsers(page + 1, type);
                    setPage(page + 1);
                    
                    setUsers(
                         result?.data.users.map((obj: any, index: any) => {
                              obj.id = index;
                              obj.createdAt = new Date(obj.createdAt).toDateString();
                              obj.isAdmin = obj.isAdmin ? "Admin" : "User";
                              obj.isBlocked = obj.isBlocked ? "Blocked" : "Active";
                              return obj;
                         })
                    );
               }
               fetchData();
          }
     };

     const previous = () => {
          if (page >= 1) {
               async function fetchData() {
                    const result = await getAllUsers(page - 1, type);
                    setPage(page - 1);
                    setUsers(
                         result?.data.users.map((obj: any, index: any) => {
                              obj.id = index;
                              obj.createdAt = new Date(obj.createdAt).toDateString();
                              obj.isAdmin = obj.isAdmin ? "Admin" : "User";
                              obj.isBlocked = obj.isBlocked ? "Blocked" : "Active";
                              return obj;
                         })
                    );
               }
               fetchData();
          } else {
               toast.error("Invalid Page");
          }
     };

     const searchUser = (e: any) => {

          const searchValue = e.target.value; // Get the current search value
          setSearch(searchValue); // Update the search state
        
          const pattern = new RegExp(searchValue, 'i'); // Create a regex pattern from the current search value
          console.log(pattern)
          // Filter the users based on the new pattern
          const newUsers = allUsers.filter((obj: any) => pattern.test(obj?.name));
          console.log(newUsers)
          setUsers(newUsers); 
     };

     useEffect(() => {
          document.title = "usermanagement";
          if (!admin) {
               navigate("/admin/login");
          }
          async function fetchData() {
               const result = await getAllUsers(page, type);
               if (result) {
                    setAllUsers(result?.data.users)
                    setUsers(
                         result?.data.users.map((obj: any, index: any) => {
                              obj.id = index;
                              obj.createdAt = new Date(obj.createdAt).toDateString();
                              obj.isAdmin = obj.isAdmin ? "Admin" : "User";
                              obj.isBlocked = obj.isBlocked ? "Blocked" : "Active";
                              return obj;
                         })
                    );
               }
          }
          fetchData();
     }, [block, admin, type]);

     return (
          <div className="p-4">
               <div className="w-[100%] flex flex-row justify-between">
                    <h1 className="text-[20px] mb-4 mt-4">USER MANAGEMENT</h1>
                    <div>
                         <input
                              value={search}
                              onChange={(e) => searchUser(e)}
                              type="text"
                              placeholder="Search"
                              name=""
                              id=""
                              className="p-2 text-black mr-2 rounded-md h-8"
                         />

                         <select name="" id="" className="h-8 rounded" onChange={(e) => setType(e.target.value)}>
                              <option value="all">All</option>
                              <option value="blocked">Blocked</option>
                              <option value="active">Active</option>
                         </select>
                    </div>
               </div>
               <div className="card-container">
                    {users.map((obj: any) => (
                         <div className="card" key={obj.id}>
                              <div>
                                   <strong>ID:</strong> {obj.id}
                              </div>
                              <div>
                                   <strong>Name:</strong> {obj.name}
                              </div>
                              <div>
                                   <strong>Email:</strong> {obj.email}
                              </div>
                              <div>
                                   <strong>Role:</strong> {obj.isAdmin}
                              </div>
                              <div>
                                   <td style={{ color: `${obj.isBlocked == "Active" ? "#40fa07" : "red"}` }}>{obj.isBlocked}</td>
                              </div>
                              <div>
                                   <strong>Date:</strong> {obj.createdAt}
                              </div>
                              <td>
                                   {obj.isBlocked == "Active" ? (
                                        <i onClick={() => banUser(obj)} className={`fa-solid fa-user fa-lg`}></i>
                                   ) : (
                                        <i onClick={() => banUser(obj)} className={`fa-solid fa-user-slash fa-lg `}></i>
                                   )}
                              </td>
                         </div>
                    ))}
                    <div className="w-full bg-white flex flex-row justify-between bg-[#DEDFE0] p-5">
                         <div
                              onClick={previous}
                              className="prev pointer border-black]"
                              style={{ border: "1px solid gray", borderRadius: "4px", padding: "5px" }}
                         >
                              <h2>
                                   <i className="fa-solid fa-arrow-left"></i>Previous
                              </h2>
                         </div>
                         <div className="midd" style={{ border: "1px solid gray", borderRadius: "4px", padding: "5px" }}>
                              <h1 className="w-[20px] flex justify-center">{page}</h1>
                         </div>
                         <div onClick={next} className="next" style={{ border: "1px solid gray", borderRadius: "4px", padding: "5px" }}>
                              <h2>
                                   Next<i className="fa-solid fa-arrow-right"></i>
                              </h2>
                         </div>
                    </div>
               </div>

               {/* Table for Larger Screens */}
               <div className="table-container">
                    <table id="table" className="w-full bg-white">
                         <thead>
                              <tr>
                                   <th>ID</th>
                                   <th>Name</th>
                                   <th>Email</th>
                                   <th>Role</th>
                                   <th>Status</th>
                                   <th>Date</th>
                                   <th>Actions</th>
                              </tr>
                         </thead>
                         <tbody>
                              {users.map((obj: any) => (
                                   <tr key={obj.id}>
                                        <td>{obj.id}</td>
                                        <td>{obj.name}</td>
                                        <td>{obj.email}</td>
                                        <td>{obj.isAdmin}</td>
                                        <td style={{ color: `${obj.isBlocked == "Active" ? "#40fa07" : "red"}` }}>{obj.isBlocked}</td>
                                        <td>{obj.createdAt}</td>
                                        <td>
                                             {obj.isBlocked == "Active" ? (
                                                  <i onClick={() => banUser(obj)} className={`fa-solid fa-user fa-lg m-4`}></i>
                                             ) : (
                                                  <i onClick={() => banUser(obj)} className={`fa-solid fa-user-slash fa-lg `}></i>
                                             )}
                                             <i onClick={() => deleteUserData(obj)} className={`fa-solid fa-trash fa-lg`}></i>
                                        </td>
                                   </tr>
                              ))}
                         </tbody>
                    </table>
                    <div className="w-full bg-white flex flex-row justify-between bg-[#DEDFE0] p-5">
                         <div
                              onClick={previous}
                              className="prev pointer border-black]"
                              style={{ border: "1px solid gray", borderRadius: "4px", padding: "5px" }}
                         >
                              <h2>
                                   <i className="fa-solid fa-arrow-left"></i>Previous
                              </h2>
                         </div>
                         <div className="midd" style={{ border: "1px solid gray", borderRadius: "4px", padding: "5px" }}>
                              <h1 className="w-[20px] flex justify-center">{page}</h1>
                         </div>
                         <div onClick={next} className="next" style={{ border: "1px solid gray", borderRadius: "4px", padding: "5px" }}>
                              <h2>
                                   Next<i className="fa-solid fa-arrow-right"></i>
                              </h2>
                         </div>
                    </div>
               </div>
          </div>
     );
}

export default UserManagement;
