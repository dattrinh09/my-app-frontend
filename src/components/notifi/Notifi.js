import { Alert, Snackbar } from '@mui/material'
import React from 'react'

const Notifi = ({ open, severity, message, onClose }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={onClose}
        >
            <Alert
                onClose={onClose}
                severity={severity}
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}

export default Notifi