import React from 'react'
import { Dialog, Slide, DialogTitle, DialogContent, DialogActions, IconButton } from "@material-ui/core"
import CloseIcon from '@material-ui/icons/Close';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Popup({ open = false, onClose = () => { }, actions = '', children, title = '' }) {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            maxWidth="lg"
            fullWidth
            onClose={onClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    // alignContent: 'center'
                }}>
                    <span> {title}</span>
                    <IconButton edge="start" color="inherit" size='small' onClick={onClose} aria-label="close">
                        <CloseIcon  />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                {actions}
            </DialogActions>
        </Dialog>
    )
}

export default Popup