import { combineReducers } from 'redux';
import { ADD_TO_CART, REMOVE_ITEM, ADD_QUANTITY, SUB_QUANTITY } from '../actions'
import db from '../../db.json'

// Inicializa as variaveis
const INITIAL_DATA = {
  items: db.products,
  itemsAdded: [],
  total: 0
}

function dataReducer(state = INITIAL_DATA, action) {
 switch(action.type) {
   // Adiciona item no carrinho
   case ADD_TO_CART:
    let newItem = []
     let existItem = state.itemsAdded.find(item => item.name === action.data.name && item.sizeSelected === action.size)
     if(existItem) {
       action.data.quantity += 1
       let newTotal = calcTotal(state.itemsAdded)
       return {
          ...state,
          total: newTotal
        };
      } else { 
        action.data.quantity = 1
        action.data.sizeSelected = action.size
        newItem = [...state.itemsAdded, action.data];
        let newTotal = calcTotal(newItem)
        if(newItem.length < 2) {
          return {
            ...state,
            itemsAdded: newItem,
            total: newTotal
          };
        } else {
          return {
            ...state
          };
        }
    }
    case REMOVE_ITEM:
      const newItems = state.itemsAdded.filter((p) =>
        p.name !== action.data.name && p.sizeSelected !== action.data.sizeSelected
      );
      let newTotalRm = calcTotal(newItems)
      return {
        ...state,
        itemsAdded: newItems,
        total: newTotalRm
      };
    // Incrementa quantidade do item no carrinho
    case ADD_QUANTITY:
      let newQuantity = state.itemsAdded.map((item) =>{
        if (item.name === action.data.name && item.sizeSelected === action.data.sizeSelected) {
          item.quantity += 1
          return item
        }
        return item;
      });
      let newTotalAdd = calcTotal(newQuantity)
      return {
        ...state,
        itemsAdded: newQuantity,
        total: newTotalAdd
      };
    // Decrementa quantidade do item no carrinho
    case SUB_QUANTITY:
      if (action.data.quantity > 1) {
        let newSubQuantity = state.itemsAdded.map((item) =>{
          if (item.name === action.data.name && item.sizeSelected === action.data.sizeSelected) {
            item.quantity -= 1
            return item
          }
          return item;
        });
        let newTotalSub = calcTotal(newSubQuantity)
        return {
          ...state,
          itemsAdded: newSubQuantity,
          total: newTotalSub
        };
      } else {
        return{
          ...state
        }
      }
    default:
      return state
  }
  function calcTotal(items) {
    let newTotal = 0;
    let total = 0;
    items.forEach((product) => {
      let rmR = (product.on_sale ? product.actual_price.split('R$').join('') : product.regular_price.split('R$').join(''))
      let aux = rmR.split(' ').join('')
      let aux2 = aux.split(',').join('.')
      total += (product.quantity * aux2)
    });
    newTotal = total.toFixed(2).toString().split('.').join(',')
    return newTotal
  }
}
 
const rootReducer = combineReducers({ dataState: dataReducer })
 
export default rootReducer
