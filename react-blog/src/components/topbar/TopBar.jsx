import React, {useContext} from "react";
import "./topbar.css";
import {Link} from "react-router-dom";
import {Context} from "../../context/Context";


export default function TopBar(){
    const {user,dispatch} = useContext(Context);
    const PF = "http://localhost:5000/images/"
    const handleLogout =()=>{
        dispatch({type:"LOGOUT"});
    };
    return (
        <div className="top">
            <div className="topLeft">
                <i className="topIcon fab fa-facebook"></i>
                <i className="topIcon fab fa-twitter"></i>
                <i className="topIcon fab fa-pinterest"></i>
                <i className="topIcon fab fa-instagram"></i>


            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link to="/" className="link">HOME</Link>
                    </li>
                    <li className="topListItem">
                        <Link to="/" className="link">ABOUT</Link>
                    </li>
                    <li className="topListItem">
                        <Link to="/" className="link">CONTACT</Link>
                    </li>
                    <li className="topListItem">
                        <Link to="/write" className="link">WRITE</Link>
                    </li>
                    <li className="topListItem"  onClick ={handleLogout}>
                        {user && "LOGOUT"}
                    </li>

                </ul>

            </div>
            <div className="topRight">
                {
                    user ?(
                        <Link to="/settings">
                            <img
                                className= "topImg"
                                src= {user.profilePic ? PF+user.profilePic :"https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}
                                alt=""/>
                        </Link>

                    ):(
                        <>
                            <ul className="topList">
                                <li className="topListItem">
                                    <Link className="link" to="/login" >LOGIN</Link>
                                </li>
                                <li className="topListItem">
                                    <Link className="link" to="/register" >REGISTER</Link>
                                </li>
                            </ul>



                        </>

                    )

                }

                <i className="topSearchIcon fas fa-search"></i>
            </div>

        </div>

    );

};


