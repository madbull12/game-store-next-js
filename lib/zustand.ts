import create from 'zustand';

interface Search {
    search:string;
    setSearch:(value:string) => void
}
interface CartItem {
    image:string;
    name:string;
    price:string;
    id:string;
}
interface Cart {
    cartItems:CartItem[],
    addCartItem:(cartItem:CartItem) =>void;
    removeCartItem:(id:string)=>void;
}

export const useSearch = create<Search>((set)=>({
    search:"",
    setSearch:(value:string)=>set(()=>({ search: value }))
}));

export const  useCartItem = create<Cart>((set)=>({
    cartItems:[],
    addCartItem:(cartItem)=>{
        set((state)=>({
            cartItems:[
                ...state.cartItems,
                cartItem
            ]
        }))
    },
    removeCartItem:(id)=>{
        set((state)=>({
            cartItems:state.cartItems.filter((cartItem)=>cartItem.id !== id)
        }))
    },

}));