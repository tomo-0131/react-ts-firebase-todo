import { useContext } from "react"
import { AuthContext } from "../providers/AuthProvider"
import { logOut, signInWithGoogle } from "../service/firebase"
import dig from 'object-dig';
import { makeStyles } from "@mui/styles"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const useStyles = makeStyles({
  toolbar: {
    justifyContent: 'space-between',
  },
  button: {
    color: 'black'
  }
});

export const Header = (props) => {
  const currentUser = useContext(AuthContext);

  // もしログインしていたら
  const classes = useStyles(props);
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
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TODO
          </Typography>
          { buttonRender() }
        </Toolbar>
      </AppBar>
  )
}
