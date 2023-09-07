import React, { useState } from 'react'
import "./Register.css"
import { Avatar,Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import e from 'express';
const Register = () => {
    const [name,setName]=  useState("");
    const [email,setEmail]=  useState("")
    const [password,setPassword]=  useState("")
    const [avatar,setAvatar]= useState("")

    const submitHandler = (e)=>{
      e.preventDefault();
      console.log(name,email,avatar,password);
    }


    return (
    <div className='register'>
      <form className="registerForm" onSubmit={submitHandler}>

      <Typography variant="h3" style={{ padding: '2vmax' }}>
          Social Aap
        </Typography>

        <Avatar 
        src={avatar}
        alt="User"
        sx={{height:"10vmax",width:"10vmax"}}
        />
        <input type="file" accept='image/*' />


        <input type="text" value={name} required placeholder='Name'
        onChange={(e)=>setName(e.target.value)} className='registerInputs'
        />
        <input
          type="email"
          placeholder="Email"
          className='registerInputs'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input type="password" placeholder="Password" required  value={password}
          className='registerInputs' onChange={(e) => setPassword(e.target.value)} />
        
<Link to="/"><Typography>Already Signed UP? Login Now</Typography> </Link>
        <Button type="submit">Sign Up</Button>
       
      </form>
    </div>
  )
}

export default Register
