import create from 'zustand';

interface Search {
    search:string;
    setSearch:(value:string) => void
}
interface SearchModal {
    isOpen:boolean;
    setOpenModal:(value:boolean) => void
}
export interface CartItem {
    image:string;
    name:string;
    price:number;
    id:string;
}

interface CartMenu {
    isOpen:boolean,
    openCartMenu:()=>void,
    closeCartMenu:()=>void
}

interface Cart {
    cartItems:CartItem[],
    addCartItem:(cartItem:CartItem) =>void;
    removeCartItem:(id:string)=>void;
}

export const useCartMenu = create<CartMenu>((set)=>({
    isOpen:false,
    openCartMenu:()=>set(()=>({ isOpen:true })),
    closeCartMenu:()=>set(()=>({ isOpen:false }))
}));

export const useSearch = create<Search>((set)=>({
    search:"",
    setSearch:(value:string)=>set(()=>({ search: value }))
}));

export const useSearchModal = create<SearchModal>((set)=>({
    isOpen:false,
    setOpenModal:(value:boolean)=>set(()=>({ isOpen:value }))
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