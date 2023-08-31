import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:"cart",
    initialState:{
        
        items:[],
        cnt:0,
    },
    reducers:{
        addItem:(state,action)=>{
            // console.log(action.payload);
            state.items.push(action.payload);
            state.cnt+=1;
        },
        deleteItem:(state,action)=>{
            // console.log(action.payload.id)
            state.items=state.items.filter(item=>item.id!==action.payload.id)
            // console.log(state.items)
            if(state.items.length!==0){
                state.cnt-=1;
            }else{
                state.cnt=0;
            }
            // console.log(state.items)
        },
        clearCart:(state)=>{
            state.items=[]
            state.cnt=0;
        }
    }
})

export const {addItem,deleteItem,clearCart}=cartSlice.actions;
export default cartSlice.reducer;