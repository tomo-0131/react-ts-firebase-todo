import { useContext, useState } from "react"
import { AuthContext } from "../providers/AuthProvider"
import { logOut, signInWithGoogle } from "../service/firebase"
import dig from 'object-dig';

import { makeStyles } from "@mui/styles"
import { AppBar } from "@mui/material";
import { Drawer } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemText } from "@mui/material";
import { List } from '@mui/material'
import { red } from '@mui/material/colors';
import { Toolbar } from '@mui/material';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const useStyles = makeStyles(
  theme => (
    {
      toolBar: {
        color: '#f44336'
      },
      menuButton: {
        justifyContent: 'space-between',
      },
      listItem: {
        textAlign: "center"
      },
      drawerPaper: {
        marginTop: theme.mixins
      },
      drawerModal: {
        zIndex: theme.zIndex
      },
      toolbar: {
        justifyContent: 'space-between',
      },
    }
  )
);

export const Header = () => {
  const currentUser = useContext(AuthContext);
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => {
    setIsOpen(open);
  }

  const FullList = () => {
    const classes = useStyles();

    return (
      // ドロワーオープン時のリスト
      <List>
        <ListItem className={classes.listItem}>
          <ListItemText>Home</ListItemText>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText>{ buttonRender()}</ListItemText>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText>About</ListItemText>
        </ListItem>
      </List>
    );
  };

  const buttonRender = () => {
    let buttonDom
    if( dig(currentUser, 'currentUser', 'uid') ){
      buttonDom =
        <Button className={classes.button} variant="outlined" onClick={logOut} >
          ログアウト
        </Button>
    // もしログインしていなかったら
    }else{
      buttonDom = <Button className={classes.button} variant='outlined' onClick={signInWithGoogle}>ログイン</Button>
    }
    return buttonDom
  }


  return　(
    <>
      <AppBar position="relative" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit">
            REACT TODO
          </Typography>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            className={classes.menuButton}
            onClick={() => toggleDrawer(!isOpen)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="top"
        open={isOpen}
        onClose={()=>toggleDrawer(false)}
        classes={{
          paper: classes.drawerPaper,
          modal: classes.drawerModal
        }}
      >
        <FullList />
      </Drawer>
    </>
  )
}
