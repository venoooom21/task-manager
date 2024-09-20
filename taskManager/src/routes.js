// Material Dashboard 2 React Pages
import Dashboard from "Pages/dashboard";
import Task from "Pages/task";
import Completed from "Pages/Completed";
import Progress from "Pages/inProgress";
import ToDo from "Pages/ToDo";
import Trash from "Pages/trash";
import Team from "Pages/Team";
// @mui icons
import Icon from "@mui/material/Icon";
const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Task",
    key: "task",
    icon: <Icon fontSize="small">assignment</Icon>, // Correct icon for "Task"
    route: "/task",
    component: <Task />,
  },
  {
    type: "collapse",
    name: "Completed",
    key: "completed",
    icon: <Icon fontSize="small">done</Icon>,
    route: "/completed",
    component: <Completed />,
  },
  {
    type: "collapse",
    name: "Progress",
    key: "progress",
    icon: <Icon fontSize="small">hourglass_empty</Icon>, // Updated to "hourglass_empty" for progress
    route: "/progress",
    component: <Progress />,
  },
  {
    type: "collapse",
    name: "To Do",
    key: "to-do",
    icon: <Icon fontSize="small">checklist</Icon>, // Correct icon for checklist
    route: "/todo",
    component: <ToDo />,
  },
  {
    type: "collapse",
    name: "Team",
    key: "Team",
    icon: <Icon fontSize="small">Team</Icon>,
    route: "/Team",
    component: <Team />,
  },
  {
    type: "collapse",
    name: "Trash",
    key: "Trash",
    icon: <Icon fontSize="small">delete_sweep</Icon>, // Correct icon name is "delete_sweep"
    route: "/Trash",
    component: <Trash />,
  },
];

export default routes;
