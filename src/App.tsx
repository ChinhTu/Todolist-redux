import "./App.css";
import { styled } from "@mui/material/styles";
import { Grid, Box, Paper } from "@mui/material";
import CreateTaskForm from "./components/CreateTaskForm";
import EditTaskForm from "./components/EditTaskForm";
import ActionAndTasklist from "./components/ActionAndTasklist";
import { useSelector } from "react-redux";

interface DataArray {
  id: any;
  name: string;
  status: string;
  date: string;
}

interface Task {
  renderCreateForm: boolean;
  renderForm: boolean;
  editJob: DataArray;
  list: [DataArray];
}

interface State {
  task: Task;
}

function App() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const showForm = useSelector((state: State): Task => state.task);
  return (
    <div className="App">
      <h1>Quản lý công việc</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={1}></Grid>
          <Grid item xs={3}>
            <div className="card">
              <Item>
                {showForm.renderForm ? (
                  <EditTaskForm />
                ) : showForm.renderCreateForm ? (
                  <CreateTaskForm />
                ) : null}
              </Item>
            </div>
          </Grid>
          <Grid item xs={7}>
            <div className="card">
              <Item>
                <ActionAndTasklist />
              </Item>
            </div>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
