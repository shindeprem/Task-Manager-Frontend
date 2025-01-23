import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import read_api from "./enums";
axios.defaults.withCredentials = true;

const EditTask = (props: any) => {
  const { setTaskEditor, setTaskLst, editTask,setEditTask } = props; 
  const [taskFinished, setTaskFinished] = useState(editTask.status === "finished");
  const [selectedStartDateTime, setSelectedStartDateTime] = useState<Date | null>(
    new Date(editTask.startDate)
  );
  const [selectedEndDateTime, setSelectedEndDateTime] = useState<Date | null>(
    new Date(editTask.endDate)
  );

  const editTaskInputRef = {
    taskName: useRef<HTMLInputElement | null>(null),
    priority: useRef<HTMLInputElement | null>(null),
  };

  const updateTaskFinished = () => {
    setTaskFinished((prev) => !prev);
  };

  const updateTask = async (e: any) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (
        editTaskInputRef?.taskName?.current?.value === "" ||
        editTaskInputRef?.priority?.current?.value === null ||
        selectedEndDateTime === null
      ) {
        alert("Please don't keep any field empty");
      } else {
        formData.append("taskId",editTask?._id)
        formData.append("taskTitle", editTaskInputRef?.taskName?.current?.value ?? "");
        formData.append("priority", editTaskInputRef?.priority?.current?.value ?? "");
        formData.append("status", taskFinished ? "finished" : "pending");
        formData.append("startDate", selectedStartDateTime?.toISOString() ?? "");
        formData.append("endDate", selectedEndDateTime?.toISOString() ?? "");

        const updatedTaskResponse = await axios.post(
          `${read_api}/task/updateUserTask`, 
          formData
        );

        if (updatedTaskResponse.status === 200) {
          // console.log(updatedTaskResponse?.data);
          setTaskLst(updatedTaskResponse?.data?.tasks);
          setTaskEditor(false)
        }
      }
    } catch (err) {
      alert("Failed to update the task");
    }
  };

  return (
    <div className="task-handler">
      <form>
        <h2 className="task-header">Edit Task</h2>

        <label htmlFor="task-title" className="task-title-lbl med-weight">
          Title
        </label>
        <br />
        <input
          name="task-title"
          required
          id="task-title"
          type="text"
          defaultValue={editTask.taskTitle}
          className="med-weight"
          ref={editTaskInputRef.taskName}
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
              defaultValue={editTask.priority}
              className="med-weight"
              placeholder="1"
              ref={editTaskInputRef.priority}
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
              minDate={selectedStartDateTime ? selectedStartDateTime : new Date()}
            />
          </div>
        </div>

        <div className="form-btn-container display-flx-algn-center">
          <button
            type="submit"
            className="add-task-btn electric-blue-btn small-font med-weight"
            onClick={updateTask}
          >
            Update Task
          </button>
          <button
            type="button"
            className="cancel-add-task small-font med-weight"
            onClick={() => setTaskEditor(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
