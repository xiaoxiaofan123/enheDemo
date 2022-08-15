import React, { useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function EdgeDialog({ open = false, onChange, data }) {
  //   const [open, setOpen] = React.useState(false);
  //   useEffect(() => {}, [showFlag]);
  const amountInput = useRef();
  const unitInput = useRef();

  const handleConfirm = () => {
    onChange({
      amount_transferred_unit: unitInput.current.value,
      amount_transferred: amountInput.current.value,
    });
  };

  const handleClose = () => {
    onChange();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit container info</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
        <TextField
          inputRef={amountInput}
          label="Amount transferred"
          defaultValue={data?.amount_transferred}
          margin="dense"
          fullWidth
        />
        <TextField
          inputRef={unitInput}
          label="Amount transferred unit"
          defaultValue={data?.amount_transferred_unit}
          margin="dense"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}
