import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { STATUS } from '../utils/constants';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AddTaskModal = ({ open, setOpen, addTask }) => {
    const handleClose = () => setOpen(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [deadline, setDeadline] = useState('')
    const [status, setStatus] = useState('TO DO')
    const handleSave = (e) => {
        e.preventDefault()
        addTask({ name, description, deadline, status, id: parseInt(Math.random() * 100) })
    }
    return (
        <div data-testid='add-task-modal'>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        New Task
                    </Typography>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            required
                            data-testid="name"
                            label="Name"
                            disabled={false}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            required
                            data-testid="description"
                            label="Description"
                            disabled={false}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <TextField
                            required
                            data-testid="deadline"
                            label="Deadline"
                            disabled={false}
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                        />
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            labelId="select-status-label"
                            data-testid="select-status"
                            value={status}
                            label="Status"
                            onChange={(e) => setStatus(e.target.value)}
                            sx={{ width: '65%' }}
                        >
                            {STATUS.map(statusOption => <MenuItem key={statusOption} value={statusOption}>{statusOption}</MenuItem>)}
                        </Select>
                    </Box>
                    <Stack spacing={2} sx={{ my: 4 }} direction='row' alignContent='flex-end'>
                        <Button variant="contained" data-testid='save-button' onClick={handleSave}>Save</Button>
                        <Button variant="outlined" data-testid='cancel-button' onClick={handleClose}>Cancel</Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}
export default AddTaskModal;