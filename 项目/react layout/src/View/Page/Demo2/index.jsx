import { Box, Breadcrumbs, Link, Typography } from "@mui/material";

export default function Demo1() {
  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          全部
        </Link>
        <Typography color="text.primary">Demo2</Typography>
        <Typography color="text.primary">Demo2</Typography>
        <Typography color="text.primary">Demo2</Typography>
      </Breadcrumbs>
      <Typography p={2}>Demo2</Typography>
    </Box>
  );
}
