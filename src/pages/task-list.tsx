import PageLayout from "@/components/page-layout"
import { FaPen } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { RiSortAlphabetAsc } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useEffect, useState } from "react";
import TaskHandler from "@/components/task-handler";
import { useRouter } from "next/router";
import EditTask from "@/components/edit-task-handler";
import read_api from "@/components/enums";
axios.defaults.withCredentials= true;

const TaskList = ()=>{
    const router = useRouter()
    const [openFilter,setOpenFilter] = useState("")
    const [newTaskEditorOpen,setNewTaskEditorOpen] = useState(false)
    const [taskEditor,setTaskEditor] = useState(false)
    const [taskLst,setTaskLst] = useState<any[]>([])
    const [totalNoOfTasks,setTotalNoOfTasks] = useState(0)
    const [currentOpenPg,setCurrentOpenPg] = useState(1)
    const [selectAllIds,setSelectAllIds] = useState(false)
    const tasksPerPage = 5;
    const [taskFltrs,setTaskFltrs] = useState({
        sort:"",
        priority:"",
        status:""
    })
    const [deleteTasks,setDeleteTasks] = useState<string[]>([])
    const [editTask,setEditTask] = useState({})

    const updateOpenFilter = (filterType:string)=>{
        if(openFilter===filterType){
            setOpenFilter("")
        }else{
            setOpenFilter(filterType)
        }
    }

    const updateTaskFilter = (fltrObj:any)=>{
        if(fltrObj.type==="sorting"){
            if(taskFltrs.sort===fltrObj.value){
                setTaskFltrs((prev)=>({...prev,sort:""}))
            }else{
                setTaskFltrs((prev)=>({...prev,sort:fltrObj.value}))
            }
        }else if(fltrObj.type==="priority"){
            if(taskFltrs.priority===fltrObj.value){
                setTaskFltrs((prev)=>({...prev,priority:""}))
            }else{
                setTaskFltrs((prev)=>({...prev,priority:fltrObj.value}))
            }
        }else{
            if(taskFltrs.status===fltrObj.value){
                setTaskFltrs((prev)=>({...prev,status:""}))
            }else{
                setTaskFltrs((prev)=>({...prev,status:fltrObj.value}))
            }
        }
    }

    const updateDeleteTaskArr =(id:string)=>{
        if(deleteTasks.includes(id)){
            // console.log(true);
            
            setDeleteTasks(deleteTasks.filter((task)=>{
                return task!==id
            }))
        }else{
            setDeleteTasks([...deleteTasks,id])
        }
    }
    const deletedTask = async () => {
        try {
            if (deleteTasks.length > 0) {
                const formData = new FormData();
                formData.append("deleteIds", deleteTasks.join(","));
                
                const res = await axios.post(`${read_api}/task/deleteTasks`, formData, {
                    withCredentials: true,
                });
    
                // console.log(res.data.tasksData);
                setDeleteTasks([]);
                setTaskLst(res.data.tasksData); 
            } else {
                alert("There is no task selected to delete");
            }
        } catch (err) {
            console.error(err);
        }
    };
    

    const fetchAllTasks = async()=>{
        try{
            let endPoint = currentOpenPg*tasksPerPage
            let startPoint = endPoint-tasksPerPage

            const formData = new FormData()
            formData.append("sort",taskFltrs.sort);
            formData.append("priority",taskFltrs.priority)
            formData.append("status",taskFltrs.status)
            formData.append("startPoint",String(startPoint))
            formData.append("endPoint",String(endPoint))
            const tasksResponse = await axios.post(`${read_api}/task/allTasks`,formData)
            if(tasksResponse?.status===200){
                setTotalNoOfTasks(tasksResponse?.data?.tasksTotalLength)
                setTaskLst(tasksResponse?.data?.tasksData)
            }else{
                router.replace("/task-list","/")
            }
        }catch(err:any){
            // console.log(err.status);
        }
        
    }

    useEffect(()=>{
        setOpenFilter("")
        fetchAllTasks()
    },[taskFltrs,currentOpenPg])

    useEffect(()=>{
        fetchAllTasks()
    },[])

    useEffect(()=>{
        setCurrentOpenPg(1)
    },[taskFltrs])

    useEffect(()=>{
        if(selectAllIds){
            setDeleteTasks(taskLst.map((task)=>task._id))
        }else{
            setDeleteTasks([])
        }
    },[selectAllIds])

    return(
        <PageLayout>
            <h1>Task List</h1>
            {taskEditor?<EditTask setEditTask={setEditTask} editTask={editTask} setTaskEditor={setTaskEditor} setTaskLst={setTaskLst}/>:""}
            {newTaskEditorOpen?<TaskHandler setNewTaskEditorOpen={setNewTaskEditorOpen} setTaskLst={setTaskLst}/>:""}
            <div className="updt-tsk-header display-flx-algn-center">
                <div className="edit-tsk-lst display-flx-algn-center">
                    <button className="add-tsk small-font display-flx-algn-center med-weight" onClick={()=>{setNewTaskEditorOpen((prev)=>!prev)}}><FaPlus/> Add task</button>
                    <button className="delete-tsk small-font display-flx-algn-center med-weight" onClick={deletedTask}><MdDelete/> Delete selected</button>
                </div>
                <div className="tsk-fltr display-flx-algn-center">
                    <div className="tsk-fltr-sort sub-tsk-fltr">
                        <div className="tsk-sort fltr-btn display-flx-algn-center small-font med-weight" onClick={()=>{updateOpenFilter("SORT")}}>
                            <RiSortAlphabetAsc/><p>Sort Tasks</p>
                        </div>
                        <div className={`sort-by fltr-lst ${openFilter==="SORT"?"display-lst":""}`}>
                            <ul>
                                <li onClick={()=>{updateTaskFilter({type:"sorting",value:"Start-Time-ASC"})}}>Start time: ASC</li>
                                <li onClick={()=>{updateTaskFilter({type:"sorting",value:"Start-Time-DESC"})}}>Start time: DESC</li>
                                <li onClick={()=>{updateTaskFilter({type:"sorting",value:"End-Time-ASC"})}}>End time: ASC</li>
                                <li onClick={()=>{updateTaskFilter({type:"sorting",value:"End-Time-DESC"})}}>End time: DESC</li>
                                <li className="remove-lst" onClick={()=>{setTaskFltrs(prev=>({...prev,sort:""}))}}>Remove sort</li>
                            </ul>
                        </div>
                    </div>
                    <div className="tsk-fltr-priority sub-tsk-fltr">
                        <div className="priority-fltr fltr-btn display-flx-algn-center small-font med-weight" onClick={()=>{updateOpenFilter("FLTR-BY-PRIORITY")}}>
                            <p>Select Priority</p><MdKeyboardArrowDown/>
                        </div>
                        <div className={`priority-lst fltr-lst ${openFilter==="FLTR-BY-PRIORITY"?"display-lst":""}`}>
                            <ul>
                                <li onClick={()=>{updateTaskFilter({type:"priority",value:1})}}>1</li>
                                <li onClick={()=>{updateTaskFilter({type:"priority",value:2})}}>2</li>
                                <li onClick={()=>{updateTaskFilter({type:"priority",value:3})}}>3</li>
                                <li onClick={()=>{updateTaskFilter({type:"priority",value:4})}}>4</li>
                                <li onClick={()=>{updateTaskFilter({type:"priority",value:5})}}>5</li>
                                <li className="remove-lst" onClick={()=>{setTaskFltrs(prev=>({...prev,priority:""}))}}>Remove filter</li>
                            </ul>
                        </div>
                    </div>
                    <div className="tsk-fltr-status sub-tsk-fltr">
                        <div className="status-fltr fltr-btn display-flx-algn-center small-font med-weight" onClick={()=>{updateOpenFilter("FLTR-BY-STATUS")}}>
                            <p>Status: All</p><MdKeyboardArrowDown/>
                        </div>
                        <div className={`status-lst fltr-lst ${openFilter==="FLTR-BY-STATUS"?"display-lst":""}`}>
                            <ul>
                                <li onClick={()=>{updateTaskFilter({type:"status",value:"pending"})}}>Pending</li>
                                <li onClick={()=>{updateTaskFilter({type:"status",value:"finished"})}}>Completed</li>
                                <li className="remove-lst" onClick={()=>{setTaskFltrs(prev=>({...prev,status:""}))}}>Remove filter</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tbl-stats full-w-tbl-stats">
                <table className="full-w-tbl">
                    <thead>
                        <tr><th><input name="check-all" type="checkbox" onChange={()=>{setSelectAllIds((selectAllIds)=>!selectAllIds)}}/></th><th>Task ID</th><th>Title</th><th>Priority</th><th>Status</th><th>Start Time</th><th>End Time</th><th>Total time to finish (hrs)</th><th>Edit</th></tr> 
                    </thead>
                    <tbody>
                        {
                            taskLst?.map((task,index)=>{
                                const {_id,taskTitle,priority,status,startDate,endDate,totalTime} = task
                                return(
                                    <tr key={index+1}><td><input name="check" type="checkbox" checked={deleteTasks?.includes(_id) } onChange={()=>{updateDeleteTaskArr(_id)}}/></td><td>{_id}</td><td>{taskTitle}</td><td>{priority}</td><td>{status}</td><td>{new Date(startDate).toLocaleString()}</td><td>{new Date(endDate).toLocaleString()}</td><td>{totalTime.toFixed(2)}</td><td><FaPen onClick={()=>{
                                        setEditTask(task)
                                        setTaskEditor(taskEditor=>!taskEditor)
                                    }}/></td></tr>
                                )
                            })
                        }
                    </tbody>
                    
                </table>
                
            </div>
            <div className="pagination-btns display-flx-algn-center">
                {  
                    Array.from({length:Math.ceil(totalNoOfTasks/tasksPerPage)},(_,index)=>{
                        return(
                            <button className="electric-blue-btn sem-font" key={index+1} onClick={()=>setCurrentOpenPg(index+1)}>{index+1}</button>
                        )
                    })
                }
                </div>
        </PageLayout>
    )
}

export default TaskList;