import "./home.css";
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { getAllUsers, deleteUser } from '../../redux/apiRequest'
import { loginSuccess } from '../../redux/authSlice'
import { createAxios } from "../../createInstance";

const HomePage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const user = useSelector( (state) => state.auth.login?.currentUser) 
  const userList = useSelector( (state) => state.users.users?.allUsers)
  const msg = useSelector( (state) => state.users.msg)
  // let axiosJWT = axios.create()
  let axiosJWT = createAxios(user, dispatch, loginSuccess)
 
  const handleDelete = (id) => {
    deleteUser(user?.accessToken, dispatch, id, axiosJWT)
  }

  // const refreshToken = async () => {
  //   try {
  //     const res = await axios.post("/v1/auth/refresh", {
  //       withCredentials: true,
  //     })
  //     return res.data
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
  //check expiration of accessToken before handle
  // axiosJWT.interceptors.request.use(
  //   async(config) => {
  //     let date = new Date()
  //     const decodedToken = jwt_decode(user?.accessToken)
  //     if(decodedToken < date.getTime() / 1000){
  //       const data = await refreshToken()
  //       const refreshUser = {
  //         ...user,
  //         accessToken: data.refreshToken,
  //       }
  //       dispatch(loginSuccess(refreshUser))
  //       config.headers["token"] = "Bearer " + data.accessToken
  //     }
  //     return config
  //   },
  //   (err) => {
  //     return Promise.reject(err)
  //   }
  // )

  
  useEffect(()=>{
    if(!user){
      navigate("/login")
    }
    if(user?.accessToken){
      getAllUsers(user?.accessToken, dispatch, axiosJWT) 
    }
  },[]);

  
  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-role">
        {`Your role: ${!user?.isAdmin ? "User" : "Admin"}`}
      </div>
      <div className="home-userlist">
        {userList?.map((user) => {
          return (
            <div className="user-container">
              <div className="home-user">{user.username}</div>
              <div className="delete-user" onClick={()=>handleDelete(user._id)}> Delete </div>
            </div>
          );
        })}
      </div>
      {msg}
    </main>
  );
};

export default HomePage;
