import React, { useContext, useReducer, useRef } from "react";
import "./task.css";

// Actions
const CREATE = "CREATE";
const DELETE = "DELETE";
const FILTER = "FILTER";

const myContext = React.createContext(null);

const TasksList = ({ dispatch }) => {
  const state = useContext(myContext);

  return (
    <div>
      <div className="titleTasks">
        <p style={{ marginRight: "4px" }}>TASKS</p>
        <button
          onClick={() => {
            dispatch({ type: FILTER, payload: { value: "all" } });
          }}
        >
          All
        </button>
        <button
          onClick={() => {
            dispatch({ type: FILTER, payload: { value: "High" } });
          }}
        >
          High
        </button>
        <button
          onClick={() => {
            dispatch({ type: FILTER, payload: { value: "Low" } });
          }}
        >
          Low
        </button>
      </div>
      <table>
        <thead>
          <th>Name</th>
          <th>Priority</th>
          <th>Delete task</th>
        </thead>
        {state.tasks?.map((e) => {
          return (
            <tbody>
              <td key={e.id}>{e.task}</td>
              <td>{e.priority}</td>
              <td>
                <button
                  key={e.id}
                  onClick={() => {
                    dispatch({
                      type: DELETE,
                      payload: { id: e.id },
                    });
                  }}
                >
                  DELETE
                </button>
              </td>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

const Tasks = () => {
  const initialState = {
    allTasks: [
      { id: "task10", task: "task1", priority: "High" },
      { id: "task20", task: "task2", priority: "Low" },
    ],
    tasks: [
      { id: "task10", task: "task1", priority: "High" },
      { id: "task20", task: "task2", priority: "Low" },
    ],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case CREATE:
        return {
          allTasks: [
            ...state.allTasks,
            {
              id: action.payload.task + "0",
              task: action.payload.task,
              priority: action.payload.priority,
            },
          ],
          tasks: [
            ...state.tasks,
            {
              id: action.payload.task + "0",
              task: action.payload.task,
              priority: action.payload.priority,
            },
          ],
        };
      case DELETE:
        let delt = state.allTasks.filter((e) => e.id !== action.payload.id);
        let dekt = state.tasks.filter((e) => e.id !== action.payload.id);
        return {
          allTasks: delt,
          tasks: dekt,
        };
      case FILTER:
        if (action.payload.value === "High") {
          return {
            ...state,
            tasks: state.allTasks.filter((e) => e.priority === "High"),
          };
        } else if (action.payload.value === "Low") {
          return {
            ...state,
            tasks: state.allTasks.filter((e) => e.priority === "Low"),
          };
        } else if (action.payload.value === "all") {
          return {
            ...state,
            tasks: state.allTasks,
          };
        }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const curretTask = useRef("");
  const selectTask = useRef("");

  return (
    <myContext.Provider value={state}>
      <div className="taskDiv">
        <div className="taskForm">
          <input
            placeholder="taskname"
            id="curretTask"
            type="text"
            ref={curretTask}
          />

          <select ref={selectTask}>
            <option hidden>Select Priority</option>
            <option defaultValue={true} disabled value="">
              Select Priority
            </option>
            <option value="High">High</option>
            <option value="Low">Low</option>
          </select>

          <button
            onClick={() => {
              dispatch({
                type: CREATE,
                payload: {
                  id: curretTask.current.value + "0",
                  task: curretTask.current.value,
                  priority: selectTask.current.value,
                },
              });
            }}
          >
            Create
          </button>
        </div>
        <TasksList dispatch={dispatch} />
      </div>
    </myContext.Provider>
  );
};

export default Tasks;
