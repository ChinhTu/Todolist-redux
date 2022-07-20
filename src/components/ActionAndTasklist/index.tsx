import React, { useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { TextField } from "@mui/material";
import { ArrowDropDownCircle } from "@mui/icons-material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { sortBy } from "lodash";
import * as S from "./styles";

import { connect, useDispatch } from "react-redux";
import {
  deleteTaskAction,
  editTaskAction,
  turnOnEditFormAction,
  searchAction,
  sortAction,
  filterStatusAction,
  switchCreateFormStatus,
  getTaskListAction,
} from "../../redux/actions/task.actions";
import { createStructuredSelector } from "reselect";
import {
  loading,
  taskListFilterSearch,
  usedVariant,
} from "../../redux/selectors";

interface DataArray {
  id: any;
  name: string;
  status: string;
  date: string;
}

interface Task {
  filter: {
    search: string;
    sort: string;
    status: string;
  };
  editJob: DataArray;
  list: [DataArray];
}

interface State {
  task: Task;
}

const ActionAndTasklist: React.FC<any> = ({
  filteredList,
  filter,
  taskListLoading,
}) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getTaskListAction());
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[]);

  //Old useSelector
  // const { filter, list } = useSelector((state: State): Task => {
  //   return state.task;
  // });

  // const dataFilter = list.filter((item) => {
  //   if (filter.status === "all") {
  //     return item.name.toLowerCase().includes(filter.search.toLowerCase());
  //   } else if (filter.status === "activated") {
  //     return (
  //       item.name.toLowerCase().includes(filter.search.toLowerCase()) &&
  //       item.status === "activated"
  //     );
  //   } else {
  //     return (
  //       item.name.toLowerCase().includes(filter.search.toLowerCase()) &&
  //       item.status === "hidden"
  //     );
  //   }
  // });

  const handleDataSort = () => {
    const sortData = sortBy(filteredList, [(o) => o.name.toLowerCase()]);
    dispatch(sortAction(sortData));
    return sortData;
  };
  const handleDeleteTask = (id: any) => {
    dispatch(deleteTaskAction(id));
  };
  const handleEditTask = (row: DataArray) => {
    dispatch(editTaskAction(row));
  };
  const editForm = () => {
    dispatch(turnOnEditFormAction(true));
  };
  const handleTurnOnCreateForm = () => {
    dispatch(turnOnEditFormAction(false));
    dispatch(switchCreateFormStatus(true));
  };
  return (
    <>
      <div>
        <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={() => handleTurnOnCreateForm()}>
            <AddCircleIcon />
            Thêm công việc
          </Button>
          <Button variant="contained" color="error">
            Generate Data
          </Button>
        </Stack>
        <S.SearchbarCustom>
          <TextField
            required
            id="outlined-required"
            label="Search"
            value={filter.search}
            size="small"
            // style={{ display: "flex", justifyContent: "flex-start" }}
            onChange={(e) => {
              dispatch(searchAction(e.target.value));
            }}
          />
          <Button
            variant="contained"
            color="success"
            style={{ width: 150, margin: "0  100px" }}
            onClick={() => {
              handleDataSort();
            }}
          >
            <ArrowDropDownCircle />
            Sắp xếp
          </Button>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter.status}
            label="Status"
            size="small"
            style={{ display: "flex", justifyContent: "flex-start" }}
            onChange={(e) => {
              dispatch(filterStatusAction(e.target.value));
            }}
          >
            <MenuItem value="all">Tất cả</MenuItem>
            <MenuItem value="activated">Kích hoạt</MenuItem>
            <MenuItem value="hidden">Ẩn</MenuItem>
          </Select>
        </S.SearchbarCustom>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell align="left">Tên</TableCell>
                <TableCell align="left">Trạng thái</TableCell>
                <TableCell align="left">Ngày khởi tạo</TableCell>
                <TableCell align="left">Hoạt động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredList.map((row: any, i: number) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{i + 1}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">
                    {row.status === "activated" ? (
                      <Chip label="Kích hoạt" color="success" />
                    ) : (
                      <Chip label="Ẩn" color="error" />
                    )}
                  </TableCell>
                  <TableCell align="left">{row.date}</TableCell>
                  <TableCell align="left">
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => {
                          handleEditTask(row);
                          editForm();
                        }}
                      >
                        <CreateIcon />
                        Sửa
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteTask(row.id)}
                      >
                        <DeleteOutlineIcon />
                        Xóa
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};
const StructSelector = createStructuredSelector({
  filteredList: taskListFilterSearch,
  filter: usedVariant,
  taskListLoading: loading,
});
export default connect(StructSelector)(ActionAndTasklist);
