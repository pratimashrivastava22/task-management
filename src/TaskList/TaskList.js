import { useState } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import useLocalStorage from "../utils/useLocalStorage";
import { Button } from '@mui/material';
import AddTaskModal from "../AddTask/AddTask";
import { useNavigate } from "react-router-dom";
import { STATUS } from '../utils/constants';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export const ResponsiveGrid = ({ tasks, setTasks }) => {
    const navigate = useNavigate();
    const [, setSelectedTask] = useLocalStorage('selectedTask')
    const [draggedTask, setDraggedTask] = useState()

    const handleSelectTask = (task) => {
        setSelectedTask(task)
        navigate(`/taskDetail/${task.id}`)
    }
    const dragStart = (e, dragItem) => {
        e.preventDefault()
        setDraggedTask(dragItem)
    };

    const drop = (e, col) => {
        e.preventDefault()
        const copyListItems = [...tasks];
        copyListItems?.map(item => {
            if (item.id === draggedTask.id)
                item.status = col
            return item
        })
        setTasks(copyListItems);
    };
    const deleteTask = (taskToDelete) => {
        const filteredTasks = tasks?.filter(task => task.id !== taskToDelete.id)
        setTasks([...filteredTasks])
    }
    return (
        <Box sx={{ flexGrow: 1, m: 2 }} data-testid='list-box'>
            <Grid container spacing={{ xs: 2, md: 3 }}>
                {STATUS.map((col, index) => (
                    <Grid
                        item
                        xs={2} sm={4} md={4} bgcolor="grey.300"
                        key={index}
                        onDrop={(e) => drop(e, col)}
                        onDragOver={(event => event.preventDefault())}
                    >
                        <Item>{col}</Item>
                        {tasks?.filter(t => t.status === col).map((task, index1) =>
                            <Item
                                sx={{ my: 2 }}
                                key={index1}
                                data-testid={`task-row-${task.id}`}
                                onDrag={(e) => dragStart(e, task)}
                                draggable
                            >
                                <Box onClick={() => handleSelectTask(task)}>{task.name}</Box>
                                <Box display='flex' justifyContent='flex-end'>
                                    <Button variant="outlined" onClick={() => deleteTask(task)}>
                                        Delete
                                    </Button>
                                </Box>
                            </Item>)}
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

function TaskList() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [tasks, setTasks] = useLocalStorage('tasks', [])
    const sortTasks = () => {
        setTasks([...(tasks.sort((a, b) => a.name.localeCompare(b.name)))]);
    }
    const addTask = (task) => {
        tasks.push(task)
        setTasks([...tasks])
        setOpen(false)
    }
    return (
        <Box>
            <h1>Tasks List</h1>
            <AddTaskModal open={open} setOpen={setOpen} addTask={addTask} />
            <Box sx={{ m: 4, display: 'flex', justifyContent: "flex-end" }}>
                <Button sx={{ mx: 2 }} variant="outlined" onClick={handleOpen}>Add Task</Button>
                <Button variant="outlined" onClick={sortTasks}>Sort Task</Button>
            </Box>
            <ResponsiveGrid tasks={tasks} setTasks={setTasks} />
        </Box>
    );
}

export default TaskList;