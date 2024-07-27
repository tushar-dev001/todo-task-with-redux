import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import List from "@mui/material/List";
import moment from "moment";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  deleteTask,
  toggleTaskStatus,
  updateTask,
} from "../../actions/taskActions";

const Tasks = () => {
  const time = moment().format("HH : mm");
  //   const [addTask, setAddTask] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  const tasks = useSelector((state) => state.tasks);
  console.log(tasks);

  const dispatch = useDispatch();

  const handleAddTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (editingTaskId !== null) {
      // If editingTaskId is not null, it means we are editing an existing task
      dispatch(
        updateTask({
          id: editingTaskId,
          name: newTask,
          time,
        })
      );
    //   localStorage.setItem('tasks', JSON.stringify(updateTask))
      
      setEditingTaskId(null);
    } else {
      // Create a new task object with a unique ID and the entered task name
      const newTaskObject = {
        id: Date.now(),
        name: newTask,
        status: "Incomplete",
        time: time,
      };
      
      //update the tasks array with the new task
      // setAddTask([...addTask, newTaskObject]);
      dispatch(addTask(newTaskObject));
    //   localStorage.setItem('tasks', JSON.stringify(addTask(newTaskObject)))

      //clear the input field after adding the task
      setNewTask("");
    }
  };

  const handleDeleteTask = (id) => {
    //filter out the task with the specified index
    // const updateTasks = addTask.filter((task, i) => i !== id);
    // setAddTask(updateTasks);
    dispatch(deleteTask(id));
    // localStorage.setItem('tasks', JSON.stringify(id))
  };

  const handleIncomplete = (id) => {
    //Update the status of the task with the specified index to "Competed"
    // const updateTasks = addTask.map((task, i) =>
    //   i === index ? { ...task, status: "Complete" } : task
    // );
    // setAddTask(updateTasks);
    dispatch(toggleTaskStatus(id));
    // localStorage.setItem('tasks', JSON.stringify(id))
  };

  const handleEditTask = (id) => {
    console.log(id);
    setEditingTaskId(id);
    const taskToEdit = tasks.find((task) => task.id === id);
    setNewTask(taskToEdit ? taskToEdit.name : '');
  };

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 660,
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        margin: "auto",
        maxHeight: 600,
        "& ul": { padding: 0 },
      }}
      subheader={<li />}
    >
      <form onSubmit={handleAddTask}>
        <input
          onChange={handleAddTaskChange}
          value={newTask}
          type="text"
          placeholder="Add your task"
          className="p-3 mt-2 mb-4 bg-slate-100 rounded-xl"
        />
        <input
          type="submit"
          className="bg-orange-500 px-3 py-2 rounded"
          value={editingTaskId !== null ? "Update Task" : "Add Task"}
        />
      </form>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Task Name</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Action</TableCell>
              <TableCell align="right">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {Array.isArray(tasks) && tasks.length > 0 ? (
              tasks.map((task) => (
                <TableRow
                  key={task.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {task.name}
                  </TableCell>
                  <TableCell align="right">
                    {task.status === "Incomplete" ? (
                      <button
                        onClick={() => handleIncomplete(task.id)}
                        className="bg-orange-500 p-1 mr-2 rounded text-white font-bold text-lg"
                      >
                        Incomplete
                      </button>
                    ) : (
                      <button className="bg-orange-500 p-1 rounded text-white font-bold text-lg">
                        Complete
                      </button>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="bg-orange-500 p-1 rounded mr-2 text-white font-bold text-lg"
                    >
                      <DeleteIcon />
                    </button>
                    <button
                      onClick={() => handleEditTask(task.id)}
                      className="bg-orange-500 p-1 rounded text-white font-bold text-lg"
                    >
                      <EditIcon />
                    </button>
                  </TableCell>
                  <TableCell align="right">{task.time}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No tasks found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <ul className="flex items-center gap-2 justify-between"></ul>
      {/* <Divider className="pb-2" />
      <TableBody className="w-full">
        {addTask.map((task, index) => (
          <li
            key={index}
            className="text-lg flex items-center justify-between bg-slate-100 mt-2"
          >
            <TableCell component="th" scope="row">
              <div className="flex justify-center items-center">
                <Checkbox label="Label" defaultChecked />
                <p>{task.name}</p>
              </div>
            </TableCell>
            <TableCell align="right">
              {task.status === "Incomplete" ? (
                <button className="bg-orange-500 p-1 mr-2 rounded text-white font-bold text-lg">
                  Incomplete
                </button>
              ) : (
                <button className="bg-orange-500 p-1 rounded text-white font-bold text-lg">
                  Complete
                </button>
              )}
            </TableCell>
            <TableCell align="right" className="flex justify-evenly gap-2">
              
            </TableCell>
            <TableCell align="right" className="bg-purple-300 p-1 rounded">
              
            </TableCell>
          </li>
        ))}
      </TableBody> */}
    </List>
  );
};

export default Tasks;
