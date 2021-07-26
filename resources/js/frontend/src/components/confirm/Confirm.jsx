
import './Confirm.scss'
import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Confirm({question, button, yes, no, callback, classIcon}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCloseCallback = () => {
    setOpen(false)
    if (callback) {
        callback()
    } 
  }

  const icon = () => {
      if(classIcon) {
        return (<i className={classIcon} aria-hidden="true"></i>)
      }
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
       {icon()} {button}
       </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{question}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {no}
          </Button>
          <Button onClick={handleCloseCallback} color="primary" autoFocus>
            {yes}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

