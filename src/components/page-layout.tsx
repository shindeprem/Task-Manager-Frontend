import "@/styles/page-layout/page-layout.css"

const PageLayout: React.FC<{children: React.ReactNode}> = ({children})=>{
    return(
        <div className="page-layout w-100">
            <div className="full-w-head">
                <div className="layout w-container">
                    <div className="layout-header display-flx-algn-center">
                        <div className="page-lnks sem-font med-weight">
                            <a href="/dashboard"><p>Dashboard</p></a>
                            <a href="/task-list"><p>Task List</p></a>
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