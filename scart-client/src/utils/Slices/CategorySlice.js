import { createSlice } from "@reduxjs/toolkit";

const categorySlice=createSlice({
    name:"cat",
    initialState:{
        category:""
    },
    reducers:{
        updateCat:(state,action)=>{            
            state.category=action.payload;            
        }
    }
});
export const {updateCat}=categorySlice.actions;
export default categorySlice.reducer;