import Head from "next/head";
import Image from "next/image";
import PageLayout from "@/components/page-layout";
import "@/styles/home/home.css"

export default function Home() {
  return (
    <>
    <PageLayout>
      <div className="index-sign-in">
        <h1>Welcome to the Task Manager</h1>
        <div className="sign-in-container">
          <form className="sign-in-form">
            <h2>Sign in</h2>
            <input className="sem-font" placeholder="Email ID" required />
            <input className="sem-font" placeholder="Password" required/>
            <button type="submit" className="electric-blue-btn small-font med-weight">Sign in to continue</button>
          </form>
        </div>
      </div>
      
    </PageLayout>
    
    </>
  );
}
