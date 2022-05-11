import "./navbar.css";
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import {logOut} from '../../redux/apiRequest';
import { createAxios } from '../../createInstance'
import { logoutSuccess } from "../../redux/authSlice";
const NavBar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.login.currentUser)
  const accessToken = user?.accessToken
  const id = user?._id
  let axiosJWT = createAxios(user, dispatch, logoutSuccess)
  const handleLogout = () => {
    logOut(dispatch, id, navigate, accessToken, axiosJWT);
  }
  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-home"> Home </Link>
      {user? (
        <>
        <p className="navbar-user">Hi, <span> {user.username}  </span> </p>
        <Link to="/logout" className="navbar-logout" onClick={handleLogout}> Log out</Link>
        </>
      ) : (    
        <>
      <Link to="/login" className="navbar-login"> Login </Link>
      <Link to="/register" className="navbar-register"> Register</Link>
      </>
)}
    </nav>
  );
};

export default NavBar;
