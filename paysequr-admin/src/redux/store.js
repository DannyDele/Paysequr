import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import categoriesReducer from './categoriesSlice';
import itemsReducer from './itemsSlice'; // Import items reducer
import userKycReducer from './userKycSlice'
import subCategoriesReducer from './subCategoriesSlice'
import escrowReducer from './escrowSlice'

export default configureStore({
  reducer: {
    users: userReducer,
    categories: categoriesReducer,
    items: itemsReducer, // Include items reducer,
    userKyc: userKycReducer,
    subcategories: subCategoriesReducer,
    escrow: escrowReducer,
  },
});
