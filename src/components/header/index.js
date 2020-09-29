import React from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const Header = () => {
  const classes = useStyles();
  return(
    <AppBar position="static" className={classes.bgColor}>
      <Container maxWidth="lg">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Link to="/" className={classes.cartButton}>
              <HomeIcon />
            </Link>
          </IconButton>
          <Typography variant="h5" className={classes.title}>
            Shopping
          </Typography>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Link to="/cart" className={classes.cartButton}>
              <ShoppingCartIcon />
            </Link>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

const useStyles = makeStyles((theme) => ({
  bgColor: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxShadow: "0px 2px 4px -1px #fcaf9e"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  cartButton: {
    color: '#fff',
    width: 24,
    height: 24
  },
  title: {
    textAlign: 'center',
    flexGrow: 1
  },
}));

export default Header;