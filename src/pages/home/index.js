import React from "react";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Item from '../../components/item'
 
const Home = (props) => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h2" className={classes.title}>
        Produtos
      </Typography>
      <Grid container spacing={2}>
        {props.items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Grid>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    flexGrow: 1,
    margin: 30
  },
}));

//Carrega os produtos do redux
const mapStateToProps = state => {
 return {
  items: state.dataState.items,
 }
};
 
export default connect(mapStateToProps)(Home)