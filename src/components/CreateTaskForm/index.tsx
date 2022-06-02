import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CancelIcon from "@mui/icons-material/Cancel";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import * as S from "./styles";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import {
  addTaskAction,
  switchCreateFormStatus,
} from "../../redux/actions/task.actions";

const CreateTaskForm: React.FC = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("activated");
  const dispatch = useDispatch();

  const handleAddTask = () => {
    dispatch(
      addTaskAction({
        id: uuidv4(),
        name: name,
        status: status,
        date: new Date().toLocaleDateString(),
      })
    );
    setName("");
    setStatus("activated");
  };

  const handleSwitchFormStatus = () => {
    dispatch(switchCreateFormStatus(false));
  };

  return (
    <div>
      <S.HeaderCustom>
        Thêm công việc
        <CancelIcon onClick={() => handleSwitchFormStatus()} />
      </S.HeaderCustom>
      <InputLabel
        id="demo-simple-select-label"
        style={{ display: "flex", justifyContent: "flex-start" }}
      >
        Tên:
      </InputLabel>
      <TextField
        required
        id="outlined-required"
        value={name}
        size="small"
        style={{ display: "flex", justifyContent: "flex-start" }}
        onChange={(e) => setName(e.target.value)}
      />
      <InputLabel
        id="demo-simple-select-label"
        style={{ display: "flex", justifyContent: "flex-start", width: 230 }}
      >
        Trạng thái:
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={status}
        label="Status"
        size="small"
        style={{ display: "flex", justifyContent: "flex-start" }}
        onChange={(e) => setStatus(e.target.value)}
      >
        <MenuItem value="activated">Kích hoạt</MenuItem>
        <MenuItem value="hidden">Ẩn</MenuItem>
      </Select>
      <Stack
        spacing={2}
        direction="row"
        style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
      >
        <Button variant="contained" onClick={() => handleAddTask()}>
          Lưu
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleSwitchFormStatus()}
        >
          Hủy
        </Button>
      </Stack>
    </div>
  );
};

export default CreateTaskForm;
