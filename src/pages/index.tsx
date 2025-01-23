import PageLayout from "@/components/page-layout";
import "@/styles/home/home.css"
import { useEffect, useRef, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials= true;
import { useRouter } from "next/router";
import Link from "next/link";
import read_api from "@/components/enums";

const Home= ()=> {
  const router = useRouter()
  const[isLoggedIn,setIsLoggedIn] = useState(true)
  const userLoginRef ={
    emailRef:useRef<HTMLInputElement | null>(null),
    passwordRef: useRef<HTMLInputElement | null>(null)
  }

  useEffect(()=>{
    const isUserLoggedIn = async()=>{
      try{
        const res = await axios.get(`${read_api}/user/userLoginPg`)
        if(res.status===200){
          setIsLoggedIn(false)
        }
      }catch(err:any){ 
        if(err.status===303){
          setIsLoggedIn(true)
          router.push("/dashboard")
        }
      }
    }
    isUserLoggedIn()
  },[])

  const userLogin = async(e:any)=>{
    e.preventDefault()
    try{
      const formData = new FormData()
      formData.append("email",userLoginRef?.emailRef?.current?.value??"")
      formData.append("password",userLoginRef?.passwordRef?.current?.value??"")
      const loginRes = await axios.post(`${read_api}/user/userLogin`,formData)
      if(loginRes.status===200){
        router.push("/dashboard")
      }else{
        alert("Please recheck your login credentials")
      }
      
    }catch(err:any){
      alert("Please recheck your login credentials")
    }
  }

  return (
    <>
    <PageLayout>
    {isLoggedIn?"Loading...":<div className="index-sign-in">
        <h1>Welcome to the Task Manager</h1>
        <div className="sign-in-container">
          <form className="sign-in-form" onSubmit={userLogin}>
            <h2>Sign in</h2>
            <input className="sem-font" placeholder="Email ID" required ref={userLoginRef.emailRef}/>
            <input className="sem-font" placeholder="Password" required ref={userLoginRef.passwordRef}/>
            <p>Don't have an account? <Link href={"/signup"}>Create One</Link></p>
            <button type="submit" className="electric-blue-btn small-font med-weight" onClick={userLogin}>Sign in to continue</button>
          </form>
        </div>
      </div>}
      
    </PageLayout>
    
    </>
  );
}

export default Home;