import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

export default function AddEdge({ open = false, onChange, options }) {
  //   const [open, setOpen] = React.useState(false);
  //   useEffect(() => {}, [showFlag]);
  const nameInput = useRef();
  const [source, setSource] = useState();
  const [target, setTarget] = useState();

  const amountInput = useRef();
  const unitInput = useRef();

  const handleConfirm = () => {
    onChange({
      source,
      target,
      amount_transferred_unit: unitInput.current.value,
      amount_transferred: amountInput.current.value,
    });
  };

  const handleClose = () => {
    onChange();
  };

  const handleSourceChange = event => {
    console.log(event.target.value);
    setSource(event.target.value);
  };

  const handleTargetChange = event => {
    setTarget(event.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Edge</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="source-dialog-select-label">Source</InputLabel>
            <Select
              labelId="source-dialog-select-label"
              id="source-dialog-select"
              value={source}
              //   label="Source"
              onChange={handleSourceChange}
              input={<OutlinedInput label="Source" />}
              //   fullWidth
            >
              {options.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="Target-dialog-select-label">Target</InputLabel>
            <Select
              labelId="target-dialog-select-label"
              id="target-dialog-select"
              value={target}
              //   label="Source"
              onChange={handleTargetChange}
              input={<OutlinedInput label="Target" />}
              //   fullWidth
            >
              {options.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            inputRef={amountInput}
            label="Amount transferred"
            margin="dense"
            fullWidth
          />
          <TextField
            inputRef={unitInput}
            label="Amount transferred unit"
            margin="dense"
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}
