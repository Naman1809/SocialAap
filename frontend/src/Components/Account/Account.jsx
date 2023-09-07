import React, { useEffect, useState } from 'react'
import "./Account.css"
import {useDispatch, useSelector} from "react-redux"
import { getMyPosts, logoutUser } from '../../Actions/User';
import Post from '../Post/Post'
import User from '../User/User'

import Loader from '../Loader/Loader';
import { Avatar, Button, Typography,Dialog } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
const Account = () => {
  
  const dispatch = useDispatch();
  const {user,loading:userLoading}= useSelector((state)=>state.user);
  const {loading,error,posts} = useSelector((state)=>state.myPosts); 
  const {error:likeError,message} = useSelector((state)=>state.like);
  const alert = useAlert();
  const [followersToggle,setFollowersToggle] =useState(false);
  const [followingToggle,setFollowingToggle] =useState(false);

  const logoutHandler = async () =>{
    await dispatch(logoutUser());
    alert.success("Logged out Successfully")
  }



  useEffect(()=>{
    dispatch(getMyPosts());
  },[dispatch])
  

  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch({type:"clearErrors"});
    }  
    if(likeError){
      alert.error(likeError);
      dispatch({type:"clearErrors"});
    }       
    if(message){
      alert.success(message)
      dispatch({type:"clearMessage"});
  
    }
    },[alert,error,message,likeError, dispatch])
  return loading===true || userLoading === true ? (
    <Loader/>):(
      <div className='account'>
      <div className="accountleft">
        {
          posts && posts.length > 0 ? posts.map(post=>(
            <Post 
            key={post._id}
           
            postId={post._id}
            caption={post.caption}
            postImage={post.image.url}
            likes = {post.likes}
            comments = {post.comments}
            ownerImage={post.owner.avatar.url}
            ownerName={post.owner.name}
            ownerId={post.owner._id}
            isAccount={true}
            isDelete={true}
            
            />
          )): (<Typography variant="h5">You have not made any posts</Typography>)
        }
      </div>
      <div className="accountright">
        <Avatar src={user.avatar.url}
        sx={{height:"8vmax", width:"8vmax"}}        
        />
        <Typography>{user.name}</Typography>
      <div>
      <button onClick={()=>setFollowersToggle(!followersToggle)}>
        <Typography>Followers</Typography>
      </button>
      <Typography>{user.followers.length}</Typography>
      </div>

      <div>
      <button onClick={()=>setFollowingToggle(!followingToggle)}>
        <Typography>Following</Typography>
      </button>
      <Typography>{user.following.length}</Typography>
      </div>

      <div>
      
        <Typography>Posts</Typography>
      
      <Typography>{user.posts.length}</Typography>
      </div>
      <Button variant="contained" onClick={logoutHandler}>Logout</Button>
      <Link to="/update/profile">Update Profile</Link>
      <Link to="/update/password">Change Password</Link>
      <Button
      variant='text'
      style={{color:"red",margin:"2vmax"}}
      >
        Delete My Profile
      </Button>



      <Dialog open={followersToggle} onClose={()=>setFollowersToggle(!followersToggle)}>
<div className="DialogBox">
  <Typography variant="h4">Followers</Typography>
  {
    user && user.followers.length>0 ? user.followers.map((follower)=>((
<User 
      key={follower._id}
  userId = {follower._id}
  name = {follower.name}
  avatar= {follower.avatar.url}
  />
    ))):<Typography style={{margin:"2vmax"}}>You have no Followers</Typography>
  }
 
</div>
</Dialog>


<Dialog open={followingToggle} onClose={()=>setFollowingToggle(!followingToggle)}>
<div className="DialogBox">
  <Typography variant="h4">Following</Typography>
  {
    user && user.following.length>0 ? user.following.map((follow)=>((
<User 
      key={follow._id}
  userId = {follow._id}
  name = {follow.name}
  avatar= {follow.avatar.url}
  />
    ))):<Typography style={{margin:"2vmax"}}>You are following no one</Typography>
  }
 
</div>
</Dialog>
      </div>
    </div>
    )
  
}

export default Account
