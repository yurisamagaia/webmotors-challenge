import React, { useState } from 'react';
import { connect } from 'react-redux'
import { addToCart } from '../../redux/actions'
import notFound from '../../assets/not-found.png'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';


const Item = (props) => {

  const classes = useStyles();
  const [size, setSize] = useState('');
  const [open, setOpen] = useState(false);

  const handleChangeSize = (event) => { 
    setSize(event.target.value);
  }

  const addCart = (item) => {
    console.log('size ', size);
    console.log('props ', props);
    props.addToCart(item, size);
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalBody = (
    <div  className={classes.paper}>
      <h2 id="simple-modal-title">{props.item.title}</h2>
      <p id="simple-modal-description">
      <CardMedia
        component="img"
        alt="Contemplative Reptile"
        height="300"
        image={props.item.image ? props.item.image : notFound}
        title="Contemplative Reptile"
        className={classes.imageZoom}
        onClick={handleOpen}
      />
      </p>
    </div>
  );

  return(
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={props.item.name}
            height="270"
            image={props.item.image ? props.item.image : notFound}
            title={props.item.name}
            className={classes.image}
            onClick={handleOpen}
          />
          <CardContent>
            <Typography gutterBottom className={classes.name}>
              {props.item.name}
            </Typography>
            {props.item.on_sale ? (
              <Box>
                <Box component="span" m={1}>
                  <s>{props.item.regular_price}</s>
                </Box>
                <Box component="span" className={classes.priceSize}>
                  {props.item.actual_price}
                </Box>
              </Box>
            ) : (
              <Box className={classes.priceSize}>
                {props.item.regular_price}
              </Box>
            )}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Tamanho</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={size}
              onChange={handleChangeSize}>
              {props.item.sizes.map((itemSize, i) => (
                itemSize.available ? (
                  <MenuItem key={i} value={itemSize.size}>{itemSize.size}</MenuItem>
                ) : (
                  <MenuItem key={i} value={itemSize.size} disabled>{itemSize.size}</MenuItem>
                )
              ))}
            </Select>
          </FormControl>
          {size ? (
            <Button size="small" className={classes.buttonDetail} onClick={() => addCart(props.item)} startIcon={<AddShoppingCartIcon />}>
              Adicionar
            </Button>
          ) : (
            <Button size="small" disabled className={classes.buttonDetail} startIcon={<AddShoppingCartIcon />}>
              Adicionar
            </Button>
          )}
        </CardActions>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        {modalBody}
      </Modal>
    </Grid>
  )
}

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  paper: {
    position: 'absolute',
    width: 470,
    minHeight: 300,
    left: '50%',
    top: '10%',
    marginLeft: -235,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    padding: theme.spacing(2, 4, 3),
  },
  buttonDetail: {
    width: '100%',
    backgroundColor: '#FF8E53',
    color: '#fff',
    margin: 'auto',
    marginBottom: 10,
    "&:hover": {
      backgroundColor: '#fff',
      color: '#FF8E53'
    },
  },
  image: {
    maxWidth: 213,
    alignItems: 'center',
    margin: 'auto',
  },
  imageZoom: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    margin: 'auto'
  },
  name: {
    minHeight: 50,
    fontWeight: 'bold',
  },
  priceSize: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const mapStateToProps = (state)=>{
  return {
    items: state.dataState.items,
    itemsAdded: state.dataState.itemsAdded,
    total: state.dataState.total,
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addToCart: (id, size) => {dispatch(addToCart(id, size))}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Item)