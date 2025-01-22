import { useEffect, useState } from "react";
import "@/styles/task-handler/task-handler.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TaskHandler = (props: any) => {
  const [taskFinished, setTaskFinished] = useState(false);
  const [selectedStartDateTime, setSelectedStartDateTime] = useState<Date | null>(new Date());
  const [selectedEndDateTime, setSelectedEndDateTime] = useState<Date | null>(null);

  const {setNewTaskEditorOpen} = props;

  const updateTaskFinished = () => {
    setTaskFinished((prev) => !prev);
  };

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
          <button type="submit" className="add-task-btn electric-blue-btn small-font med-weight">
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
