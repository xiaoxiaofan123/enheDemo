import React, { useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function NodeDialog({ open = false, onChange, data }) {
  //   const [open, setOpen] = React.useState(false);
  //   useEffect(() => {}, [showFlag]);
  const nameInput = useRef();
  const solutionInput = useRef();
  const locationInput = useRef();

  const handleConfirm = () => {
    onChange({
      operator_note: nameInput.current.value,
      solution_name: solutionInput.current.value,
      inventory_location: locationInput.current.value,
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
          inputRef={nameInput}
          label="Operator note"
          defaultValue={data?.operator_note}
          margin="dense"
          fullWidth
        />
        <TextField
          inputRef={solutionInput}
          label="Solution name"
          defaultValue={data?.solution_name}
          margin="dense"
          fullWidth
        />
        <TextField
          inputRef={locationInput}
          label="Inventory location"
          defaultValue={data?.inventory_location}
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
