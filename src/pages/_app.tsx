import "@/styles/globals.css";
import { AppProps } from 'next/app';
import "@/styles/dashboard/dashboard.css"
import "@/styles/home/home.css"
import "@/styles/task-handler/task-handler.css";
import "@/styles/home/home.css"
import "@/styles/task-list/task-list.css"
import "react-datepicker/dist/react-datepicker.css";
import "@/styles/page-layout/page-layout.css"
import "@/styles/task-handler/task-handler.css";
import "react-datepicker/dist/react-datepicker.css";


export default function App({ Component,pageProps }:AppProps) {
  return <Component {...pageProps} />;
}