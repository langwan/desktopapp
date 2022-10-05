import { Folder as FolderIcon } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function LeftMenu(props) {
  let navigate = useNavigate();
  return (
    <Drawer
      anchor="left"
      variant="persistent"
      sx={{
        width: props.drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: props.drawerWidth,
          boxSizing: "border-box",
        },
      }}
      open={true}
    >
      <Box p={2}>
        <Stack direction={"row"} spacing={1} alignItems="center">
          <Avatar src="chi.jpg" sx={{ width: 32, height: 32 }}></Avatar>
          <Typography>痴货发明家</Typography>
        </Stack>
      </Box>
      <List>
        <ListItemButton onClick={() => navigate("/")}>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText>Demo1</ListItemText>
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/demo2")}>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText>Demo2</ListItemText>
        </ListItemButton>
      </List>
    </Drawer>
  );
}
