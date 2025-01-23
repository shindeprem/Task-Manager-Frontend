import "@/styles/page-layout/page-layout.css"
import { useRouter } from "next/router";

const PageLayout: React.FC<{children: React.ReactNode}> = ({children})=>{
    const router = useRouter()
    
    return(
        <div className="page-layout w-100">
            <div className="full-w-head">
                <div className="layout w-container">
                    <div className="layout-header display-flx-algn-center">
                        <div className="page-lnks sem-font med-weight">
                            {router.pathname==="/" || router.pathname==="/signup"?"":<a href="/dashboard"><p>Dashboard</p></a>}
                            {router.pathname==="/" || router.pathname==="/signup"?"":<a href="/task-list"><p>Task List</p></a>}
                        </div>
                        <div><button className="signout-btn electric-blue-btn small-font med-weight">Sign Out</button></div>
                    </div>
                </div>
            </div>
            
            <div className="layout w-container">
                <div className="child-component c-padding">{children}</div>
            </div>
        </div>
    )
}

export default PageLayout;