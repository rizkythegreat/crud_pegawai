import React from 'react';
import { DialogActions, Button } from '@mui/material';

const UserFormDialogActions = ({ handleClose, handleSubmit, initialData }) => {
    return (
        <DialogActions>
            <Button onClick={handleClose} sx={{ color: "#3C5B6F" }}>
                Cancel
            </Button>
            <Button onClick={handleSubmit} sx={{
                backgroundColor: "#3C5B6F", ":hover": {
                    backgroundColor
                        : "#153448"
                }
            }} variant='contained'>
                {initialData ? 'Update' : 'Add'}
            </Button>
        </DialogActions>
    );
};

export default UserFormDialogActions;
