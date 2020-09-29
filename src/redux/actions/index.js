export const ADD_TO_CART = 'ADD_TO_CART'
export const SUB_QUANTITY = 'SUB_QUANTITY';
export const ADD_QUANTITY = 'ADD_QUANTITY';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';

// Adiciona item no carrinho
export function addToCart(item, size) {
    return {
        type: ADD_TO_CART,
        data: item,
        size: size
    }
}

// Atualiza item no carrinho
export function updateItem(item) {
    return {
        type: UPDATE_ITEM,
        data: item
    }
}

// Remove item do carrinho
export const removeItem = (item) => {
    return {
      type: REMOVE_ITEM,
      data: item
    }
  }
  
// Decrementa quantidade do item
export const subtractQuantity = (item) =>{
    return {
      type: SUB_QUANTITY,
      data: item
    }
}

// Incrementa quantidade do item
export const addQuantity = (item) => {
    return {
      type: ADD_QUANTITY,
      data: item
    }
}