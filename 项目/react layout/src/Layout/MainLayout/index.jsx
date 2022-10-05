import { Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import LeftMenu from "View/Component/LeftMenu";
export default function MainLayout() {
  const drawerWidth = 240;
  const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(0),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    })
  );
  return (
    <Stack height="100%" direction={"row"} justifyContent="flex-start">
      <LeftMenu drawerWidth={drawerWidth} />
      <Main open={true} height="100%">
        <Outlet />
      </Main>
    </Stack>
  );
}
