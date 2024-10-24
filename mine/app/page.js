"use client"
import RegButton from "./components/regModal/regModal";
import LoginButton from "./components/authModal/authModal";
import "./page.css"
import Profile from "./components/profile/profile";
import { useEffect,useState } from "react";



export default function Home() {


  return (
    <div className="centralBlock" style={{display:"flex"}}>
      <RegButton/>
      <LoginButton/>
      <Profile token={localStorage.getItem('token')}/>
    </div>

  );
}
