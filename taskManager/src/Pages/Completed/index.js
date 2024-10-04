
import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Completed() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={4}>
        <Grid container spacing={3}>
          {/* Add blank content or leave empty */}
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Completed;
