import React from 'react';
import { connect } from 'react-redux'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import { removeItem, subtractQuantity, addQuantity } from '../../redux/actions';
import notFound from '../../assets/not-found.png'
import Remove from '@material-ui/icons/Remove';
import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';


const Cart = (props) => {
  const classes = useStyles();
  return(
    <Container maxWidth="lg">
      <Typography variant="h4" component="h2" className={classes.title}>
        Carrinho
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="center">Tamanho</TableCell>
              <TableCell align="center">Quantidade</TableCell>
              <TableCell align="center">Preço</TableCell>
              <TableCell align="center">Remover</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.itemsAdded.map((row, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Box display="flex" flexDirection="row" alignItems="center">
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      image={row.image ? row.image : notFound}
                      title="Contemplative Reptile"
                      className={classes.image}
                    />
                    {row.name}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  {row.sizeSelected}
                </TableCell>
                <TableCell className={classes.quantidade}>
                  <Box display="flex" flexDirection="row" alignItems="center">
                    <Remove className={classes.quantity} onClick={() => props.subtractQuantity(row)} />
                    {row.quantity}
                    <Add className={classes.quantity} onClick={() => props.addQuantity(row)} />
                  </Box>
                </TableCell>
                <TableCell align="center">
                  {row.on_sale ? (
                    row.actual_price
                  ) : (
                    row.regular_price
                  )}
                </TableCell>
                <TableCell align="center">
                  <Delete onClick={() => props.removeItem(row)} />
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell align="right" colSpan={4}>
                <Typography variant="h5" component="h4" className={classes.total}>
                  Total
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5" component="h4" className={classes.total}>
                  R${props.total}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  image: {
    width: 45,
    height: 90,
    marginRight: 10
  },
  quantity: {
    margin: 10,
  },
  quantidade: {
    alignItems: 'center',
    margin: 'auto',
  },
  title: {
    textAlign: 'center',
    flexGrow: 1,
    margin: 30
  },
  total: {
    fontWeight: 'bold'
  }
}));

const mapStateToProps = (state)=>{
  return{
      items: state.dataState.items,
      itemsAdded: state.dataState.itemsAdded,
      total: state.dataState.total,
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
      removeItem: (id)=>{dispatch(removeItem(id))},
      addQuantity: (id)=>{dispatch(addQuantity(id))},
      subtractQuantity: (id)=>{dispatch(subtractQuantity(id))}
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart)