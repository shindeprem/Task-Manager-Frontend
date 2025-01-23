import read_api from "@/components/enums";
import PageLayout from "@/components/page-layout";
import "@/styles/dashboard/dashboard.css"
import axios from "axios";
axios.defaults.withCredentials=true;
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Dashboard = ()=>{
    const router = useRouter()
    const [dashboardStats,setDashboardStats] = useState({
        totalTasks:0,
        taskCompleted:0.000,
        taskPending:0.000,
        avgTimeForCompletedTask:0,
        totalPendingTasks:0,
        totalTimeLapsed:0,
        totalTimeToFinish:0,
        pendingTasksStatsWithPriority:[
            {
                taskPriority:1,
                pendingTasks:1,
                timeLapsed:1,
                timeToFinish:1
            }
        ]
    })

    useEffect(()=>{
        const getDashboardData = async() =>{
            try{
                const dashboardRes = await axios.get(`${read_api}/dashboard/dashboardStats`)
                
                if(dashboardRes?.status===200){
                    setDashboardStats(dashboardRes?.data)
                }else{
                    router.push("/")
                }
            }catch(err:any){
                // console.log(err.status);
                if(err.status===401){
                    router.push("/")
                }
            }
        }
        getDashboardData()
        
    },[])

    return(
        <PageLayout>
        <div className="dashboard">
            <h1>Dashboard</h1>

            <div className="dashboard-summary">
                <h2 className="sem-weight">Summary</h2>
                <div className="dashboard-stats ">
                    <div className="stats">
                        <span className="stats-val med-weight">{dashboardStats?.totalTasks}</span>
                        <p className="sem-font">Total tasks</p>
                    </div>
                    <div className="stats">
                        <span className="stats-val med-weight">{dashboardStats?.taskCompleted?.toFixed(0)}%</span>
                        <p className="sem-font">Tasks completed</p>
                    </div>
                    <div className="stats">
                        <span className="stats-val med-weight">{Number(dashboardStats?.taskPending).toFixed(0)}%</span>
                        <p className="sem-font">Tasks pending</p>
                    </div>
                    <div className="stats">
                        <span className="stats-val med-weight">{dashboardStats?.avgTimeForCompletedTask?.toFixed(0)} hrs</span>
                        <p className="sem-font">Average time per completed task</p>
                    </div>
                </div>
            </div>

            <div className="dashboard-summary">
                <h2 className="sem-weight">Pending task summary</h2>
                <div className="dashboard-stats ">
                    <div className="stats">
                        <span className="stats-val med-weight">{dashboardStats?.totalPendingTasks}</span>
                        <p className="sem-font">Pending tasks</p>
                    </div>
                    <div className="stats">
                        <span className="stats-val med-weight">{dashboardStats?.totalTimeLapsed?.toFixed(0)} hrs</span>
                        <p className="sem-font">Total time lapsed</p>
                    </div>
                    <div className="stats">
                        <span className="stats-val med-weight">{dashboardStats?.totalTimeToFinish?.toFixed(0)} hrs</span>
                        <p className="sem-font">Total time to finish estimated based on endtime</p>
                    </div>
                </div>
            </div>

            <div className="tbl-stats">
                <table>
                    <thead>
                       <tr><th>Task Priority</th><th>Pending Tasks</th><th>Time lapsed(hrs)</th><th>Time to finish(hrs)</th></tr> 
                    </thead>
                    <tbody>
                        {
                            dashboardStats?.pendingTasksStatsWithPriority?.map((task)=>{
                                return(
                                    <tr><td>{task?.taskPriority}</td><td>{task?.pendingTasks}</td><td>{task?.timeLapsed?.toFixed(2)}</td><td>{task?.timeToFinish?.toFixed(2)}</td></tr>
                                )
                            })
                        }
                    </tbody>
                    
                </table>
            </div>
        </div>
        </PageLayout>
    )
}

export default Dashboard;