import read_api from "@/components/enums";
import PageLayout from "@/components/page-layout"
import axios from "axios"
axios.defaults.withCredentials= true;
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"

const SignUp = ()=>{
    const router = useRouter()
    const[isLoggedIn,setIsLoggedIn] = useState(true)
    const userSignupRef ={
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
        // console.log(err.status);
        if(err.status===303){
          setIsLoggedIn(true)
          router.push("/dashboard")
        }
      }
    }
    isUserLoggedIn()
  },[])

  const userSignUp = async(e:any)=>{
    e.preventDefault()
    try{
      const formData = new FormData()
      formData.append("email",userSignupRef?.emailRef?.current?.value??"")
      formData.append("password",userSignupRef?.passwordRef?.current?.value??"")
      const signupRes = await axios.post(`${read_api}/user/createUser`,formData)
      if(signupRes.status===200){
        router.push("/")
      }else if(signupRes.status===401){
        alert("User already exists")
      }else{
        alert("Please recheck your login credentials")
      }
    }catch(err:any){
        if(err.status===401){
            alert("User already exists")
        }
    }
  }

  return (
    <>
    <PageLayout>
    {isLoggedIn?"Loading...":<div className="index-sign-in">
        <h1>Welcome to the Task Manager</h1>
        <div className="sign-in-container">
          <form className="sign-in-form" onSubmit={userSignUp}>
            <h2>Sign Up</h2>
            <input className="sem-font" placeholder="Email ID" required ref={userSignupRef.emailRef}/>
            <input className="sem-font" placeholder="Password" required ref={userSignupRef.passwordRef}/>
            <button type="submit" className="electric-blue-btn small-font med-weight" onClick={userSignUp}>Sign up to continue</button>
          </form>
        </div>
      </div>}
      
    </PageLayout>
    
    </>
  );
}

export default SignUp;