import useLocalStorage from "../utils/useLocalStorage";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TaskDetail() {
    const [selectedTask] = useLocalStorage('selectedTask', undefined)
    if (!selectedTask) return
    return (
        <Box sx={{ mx: 2 }}>
            <h1>Task Detail</h1>
            <Typography data-testid="name" variant="h2">{selectedTask?.name}</Typography>
            <Typography data-testid="desc" variant="body1">{selectedTask?.description}</Typography>
            <Typography data-testid="deadline" variant="body1">{selectedTask?.deadline}</Typography>
        </Box>
    );
}

export default TaskDetail;