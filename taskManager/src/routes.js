// Material Dashboard 2 React Pages
import Dashboard from "Pages/dashboard";
import TaskApp from "Pages/task/task";
import Completed from "Pages/Completed";
import TodoList from "Pages/ToDo/TodoList";
import Trash from "Pages/trash";
import Team from "Pages/Team";
import SignIn from "Pages/authentication/sign-in";
import SignUp from "Pages/authentication/sign-up";
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
    name: "task",
    key: "task",
    icon: <Icon fontSize="small">assignment</Icon>, // Correct icon for "Task"
    route: "/task",
    component: <TaskApp />,
  },
  {
    type: "collapse",
    name: "Completed",
    key: "completed",
    icon: <Icon fontSize="small">done</Icon>,
    route: "/completed",
    component: <Completed />,
  },
  /*{
    type: "collapse",
    name: "Progress",
    key: "progress",
    icon: <Icon fontSize="small">hourglass_empty</Icon>, // Updated to "hourglass_empty" for progress
    route: "/progress",
    component: <Progress />,
  },*/
  {
    type: "collapse",
    name: "To Do",
    key: "to-do",
    icon: <Icon fontSize="small">checklist</Icon>, // Correct icon for checklist
    route: "/TodoList",
    component: <TodoList />,
  },
  {
    type: "collapse",
    name: "Team",
    key: "Team",
    icon: <Icon fontSize="small">group</Icon>,
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
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
