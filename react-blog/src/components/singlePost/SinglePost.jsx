import './singlepost.css';
import {useState,useEffect,useContext} from "react";
import {Link,useLocation} from "react-router-dom";
import axios from "axios";
import {Context} from "../../context/Context";

export default function SinglePost() {
    const PF ="http://localhost:5000/images/"
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const[post,setPost]= useState({})
    const [title,setTitle]= useState("")
    const [desc,setDesc] = useState("")
    const [updateMode, setUpdateMode] =useState(false)

    const {user} = useContext(Context)

    const handleDelete = async (e)=>{
        try{
            await axios.delete(`/posts/${post._id}`,{
                data:{
                    username:user.username
                }
            })
            window.location.replace("/")
        }
        catch(e){

        }

    }

    const handleUpdate =async(e)=>{
        try{
            await axios.put(`/posts/${post._id}`,{
                username:user.username,
                title,
                desc
            })
            setUpdateMode(false)
            
        }
        catch (e) {
            
        }
    }

    useEffect(()=>{
        const getPost = async ()=>{
            const res = await axios.get("/posts/"+path);
            setPost(res.data)
            setTitle(res.data.title)
            setDesc(res.data.desc)

        };
        getPost();

        },[path]);


    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.photo && (
                    <img className="singlePostImg" src={PF+post.photo} alt=""/>)}
                    {
                    updateMode ? <input type ="text" value={title} className="singlePostTitleInput" autoFocus onChange={(e)=>setTitle(e.target.value)}/> :(
                        <h1 className="singlePostTitle">
                            {title}
                            {user && post.username === user.username &&(
                                <div className="singlePostEdit">
                                    <i className="singlePostIcon fas fa-edit" onClick={()=>setUpdateMode(true)}></i>
                                    <i className="singlePostIcon fas fa-trash-alt" onClick={handleDelete}></i>

                                </div>
                            )}
                        </h1>
                    ) }

                <div className="singlePostInfo">
                    <span>
                        Author:
                        <Link className="link" to={`/?user=${post.username}`}>
                            <b className="singlePostAuthor">{post.username}</b>
                        </Link>
                    </span>
                    <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
                </div>

                {updateMode ? (
                    <textarea
                        className="singlePostDescInput"
                        value={desc}
                        onChange={(e)=>setDesc(e.target.value)}
                    />
                    ) :(
                   <p className="singlePostDesc">{desc}</p>
                    )}
                {updateMode &&(
                  <button className="singlePostButton" onClick={handleUpdate}>Update</button>
                )}
            </div>
        </div>
    );
};