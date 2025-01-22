import PageLayout from "@/components/page-layout";
import "@/styles/dashboard/dashboard.css"

const Dashboard = ()=>{
    return(
        <PageLayout>
        <div className="dashboard">
            <h1>Dashboard</h1>

            <div className="dashboard-summary">
                <h2 className="sem-weight">Summary</h2>
                <div className="dashboard-stats ">
                    <div className="stats">
                        <span className="stats-val med-weight">25</span>
                        <p className="sem-font">Total tasks</p>
                    </div>
                    <div className="stats">
                        <span className="stats-val med-weight">40%</span>
                        <p className="sem-font">Tasks completed</p>
                    </div>
                    <div className="stats">
                        <span className="stats-val med-weight">60%</span>
                        <p className="sem-font">Tasks pending</p>
                    </div>
                    <div className="stats">
                        <span className="stats-val med-weight">3.5 hrs</span>
                        <p className="sem-font">Average time per completed task</p>
                    </div>
                </div>
            </div>

            <div className="dashboard-summary">
                <h2 className="sem-weight">Pending task summary</h2>
                <div className="dashboard-stats ">
                    <div className="stats">
                        <span className="stats-val med-weight">25</span>
                        <p className="sem-font">Pending tasks</p>
                    </div>
                    <div className="stats">
                        <span className="stats-val med-weight">40%</span>
                        <p className="sem-font">Total time lapsed</p>
                    </div>
                    <div className="stats">
                        <span className="stats-val med-weight">60%</span>
                        <p className="sem-font">Total time to finish estimated based on endtime</p>
                    </div>
                </div>
            </div>
        </div>
        </PageLayout>
    )
}

export default Dashboard;