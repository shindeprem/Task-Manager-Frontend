import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import read_api from "./enums";
axios.defaults.withCredentials=true;

const TaskHandler = (props: any) => {
  const [taskFinished, setTaskFinished] = useState(false);
  const [selectedStartDateTime, setSelectedStartDateTime] = useState<Date | null>(new Date());
  const [selectedEndDateTime, setSelectedEndDateTime] = useState<Date | null>(null);
  const newTaskInputRef ={
      taskName:useRef<HTMLInputElement | null>(null),
      priority: useRef<HTMLInputElement | null>(null)
  }
  const {setNewTaskEditorOpen,setTaskLst} = props;

  const updateTaskFinished = () => {
    setTaskFinished((prev) => !prev);
  };

  const createNewTask = async(e:any)=>{
    e.preventDefault()
    try{
        const formData = new FormData()
        if(newTaskInputRef?.taskName?.current?.value==="" ||
           newTaskInputRef?.priority?.current?.value===null ||
            selectedEndDateTime===null){
            alert("Please don't keep any field empty")
        }else{
            formData.append("taskTitle",newTaskInputRef?.taskName?.current?.value??"")
            formData.append("priority",newTaskInputRef?.priority?.current?.value??"")
            formData.append("status",taskFinished?"finished":"pending")
            formData.append("startDate",selectedStartDateTime?.toISOString()??"")
            formData.append("endDate",selectedEndDateTime?.toISOString()??"")
            const newTaskResponse = await axios.post(`${read_api}/task/addNewTask`,formData)
            if(newTaskResponse.status===200){
                // console.log(newTaskResponse.data);
                
                setTaskLst(newTaskResponse.data.data.tasks)
                setNewTaskEditorOpen(false)
            }
        }
        
    }catch(err){
        alert("Please don't keep any field empty")
    }
  }

  return (
    <div className="task-handler">
      <form>
        <h2 className="task-header">Task Handler</h2>

        <label htmlFor="task-title" className="task-title-lbl med-weight">
          Title
        </label>
        <br />
        <input
          name="task-title"
          required
          id="task-title"
          type="text"
          placeholder="Apply for new jobs"
          className="med-weight"
          ref={newTaskInputRef.taskName}
        />

        <div className="priority-status-input display-flx-algn-center">
          <div className="priority-input">
            <label htmlFor="priority-input" className="med-weight">
              Priority
            </label>
            <br />
            <input
              min={1}
              max={5}
              required
              type="number"
              name="priority"
              id="priority-input"
              className="med-weight"
              placeholder="1"
              ref={newTaskInputRef.priority}
            />
          </div>

          <div className="status-input">
            <label className="med-weight">Status</label>
            <div className="status-toggler-container display-flx-algn-center">
              <p>Pending</p>
              <div
                className={`display-flx-algn-center status-toggler ${
                  taskFinished ? "task-finished" : ""
                }`}
              >
                <div className="inner-circle" onClick={updateTaskFinished}></div>
              </div>
              <p>Finished</p>
            </div>
          </div>
        </div>

        <div className="time-input-container">
          <div className="start-time">
            <label>Start date</label>
            <DatePicker
              selected={selectedStartDateTime}
              onChange={(date) => setSelectedStartDateTime(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </div>
          <div className="end-time">
            <label>End date</label>
            <DatePicker
              selected={selectedEndDateTime}
              onChange={(date) => setSelectedEndDateTime(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
              minDate={selectedStartDateTime?selectedStartDateTime:new Date()}
            />
          </div>
        </div>

        <div className="form-btn-container display-flx-algn-center">
          <button type="submit" className="add-task-btn electric-blue-btn small-font med-weight" onClick={createNewTask}>
            Add task
          </button>
          <button type="button" className="cancel-add-task small-font med-weight" onClick={()=>{setNewTaskEditorOpen(false)}}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskHandler;
