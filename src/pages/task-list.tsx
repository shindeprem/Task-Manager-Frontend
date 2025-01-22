import PageLayout from "@/components/page-layout"
import "@/styles/task-list/task-list.css"
import { FaPen } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { RiSortAlphabetAsc } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";
import TaskHandler from "@/components/task-handler";

const TaskList = ()=>{

    const [openFilter,setOpenFilter] = useState("")
    const [newTaskEditorOpen,setNewTaskEditorOpen] = useState(false)

    const updateOpenFilter = (filterType:string)=>{
        if(openFilter===filterType){
            setOpenFilter("")
        }else{
            setOpenFilter(filterType)
        }
    }

    return(
        <PageLayout>
            <h1>Task List</h1>
            {newTaskEditorOpen?<TaskHandler setNewTaskEditorOpen={setNewTaskEditorOpen}/>:""}
            <div className="updt-tsk-header display-flx-algn-center">
                <div className="edit-tsk-lst display-flx-algn-center">
                    <button className="add-tsk small-font display-flx-algn-center med-weight" onClick={()=>{setNewTaskEditorOpen((prev)=>!prev)}}><FaPlus/> Add task</button>
                    <button className="delete-tsk small-font display-flx-algn-center med-weight"><MdDelete/> Delete selected</button>
                </div>
                <div className="tsk-fltr display-flx-algn-center">
                    <div className="tsk-fltr-sort sub-tsk-fltr">
                        <div className="tsk-sort fltr-btn display-flx-algn-center small-font med-weight" onClick={()=>{updateOpenFilter("SORT")}}>
                            <RiSortAlphabetAsc/><p>Sort Tasks</p>
                        </div>
                        <div className={`sort-by fltr-lst ${openFilter==="SORT"?"display-lst":""}`}>
                            <ul>
                                <li>Start time: ASC</li>
                                <li>Start time: DESC</li>
                                <li>End time: ASC</li>
                                <li>End time: DESC</li>
                                <li className="remove-lst">Remove sort</li>
                            </ul>
                        </div>
                    </div>
                    <div className="tsk-fltr-priority sub-tsk-fltr">
                        <div className="priority-fltr fltr-btn display-flx-algn-center small-font med-weight" onClick={()=>{updateOpenFilter("FLTR-BY-PRIORITY")}}>
                            <p>Select Priority</p><MdKeyboardArrowDown/>
                        </div>
                        <div className={`priority-lst fltr-lst ${openFilter==="FLTR-BY-PRIORITY"?"display-lst":""}`}>
                            <ul>
                                <li>Start time: ASC</li>
                                <li>Start time: DESC</li>
                                <li>End time: ASC</li>
                                <li>End time: DESC</li>
                                <li className="remove-lst">Remove filter</li>
                            </ul>
                        </div>
                    </div>
                    <div className="tsk-fltr-status sub-tsk-fltr">
                        <div className="status-fltr fltr-btn display-flx-algn-center small-font med-weight" onClick={()=>{updateOpenFilter("FLTR-BY-STATUS")}}>
                            <p>Status: Finished</p><MdKeyboardArrowDown/>
                        </div>
                        <div className={`status-lst fltr-lst ${openFilter==="FLTR-BY-STATUS"?"display-lst":""}`}>
                            <ul>
                                <li>Start time: ASC</li>
                                <li>Start time: DESC</li>
                                <li>End time: ASC</li>
                                <li>End time: DESC</li>
                                <li className="remove-lst">Remove filter</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tbl-stats full-w-tbl-stats">
                <table className="full-w-tbl">
                    <thead>
                        <tr><th><input name="check-all" type="checkbox"/></th><th>Task ID</th><th>Title</th><th>Priority</th><th>Status</th><th>Start Time</th><th>End Time</th><th>Total time to finish (hrs)</th><th>Edit</th></tr> 
                    </thead>
                    <tbody>
                        <tr><td><input name="check" type="checkbox"/></td><td>4</td><td>6</td><td>8</td><td>2</td><td>4</td><td>6</td><td>8</td><td><FaPen/></td></tr>
                        <tr><td><input name="check" type="checkbox"/></td><td>4</td><td>6</td><td>8</td><td>2</td><td>4</td><td>6</td><td>8</td><td><FaPen/></td></tr>
                        <tr><td><input name="check" type="checkbox"/></td><td>4</td><td>6</td><td>8</td><td>2</td><td>4</td><td>6</td><td>8</td><td><FaPen/></td></tr>
                    </tbody>
                    
                </table>
            </div>
        </PageLayout>
    )
}

export default TaskList;