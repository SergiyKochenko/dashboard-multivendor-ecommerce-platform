import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

export const delete_product = createAsyncThunk(
  'product/delete_product',
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(`/product-delete/${productId}`, { withCredentials: true });
      return fulfillWithValue({ productId, message: data.message });
    } catch (error) {
      return rejectWithValue(error.response?.data || { error: 'Delete failed' });
    }
  }
);

export const add_product = createAsyncThunk(
  'product/add_product',
  async (product, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/product-add', product, { withCredentials: true });
      // console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

// End Method

export const get_products = createAsyncThunk(
  'product/get_products',
  async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/products-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        { withCredentials: true }
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

// End Method

export const get_product = createAsyncThunk(
  'product/get_product',
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/product-get/${productId}`, { withCredentials: true });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

// End Method

export const update_product = createAsyncThunk(
  'product/update_product',
  async (product, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/product-update', product, { withCredentials: true });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

// End Method

export const product_image_update = createAsyncThunk(
  'product/product_image_update',
  async ({ oldImage, newImage, productId, removeImage = false }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('oldImage', oldImage);
      formData.append('productId', productId);
      formData.append('removeImage', removeImage);
      if (!removeImage && newImage) {
        formData.append('newImage', newImage);
      }
      const { data } = await api.post('/product-image-update', formData, { withCredentials: true });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response?.data || { error: 'An error occurred' });
    }
  }
);

// End Method

export const productReducer = createSlice({
  name: 'product',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    products: [],
    product: '',
    totalProduct: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(add_product.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(add_product.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload?.error || payload?.message || 'An error occurred';
      })
      .addCase(add_product.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      })

      .addCase(get_products.fulfilled, (state, { payload }) => {
        state.totalProduct = payload.totalProduct;
        state.products = payload.products;
      })
      .addCase(get_product.fulfilled, (state, { payload }) => {
        state.product = payload.product;
      })

      .addCase(update_product.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(update_product.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload?.error || payload?.message || 'An error occurred';
      })
      .addCase(update_product.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.product = payload.product;
        state.successMessage = payload.message;
      })

      .addCase(product_image_update.fulfilled, (state, { payload }) => {
        state.product = payload.product;
        state.successMessage = payload.message;
      })

      .addCase(delete_product.fulfilled, (state, { payload }) => {
        state.products = state.products.filter((p) => p._id !== payload.productId);
        state.successMessage = payload.message;
      })
      .addCase(delete_product.rejected, (state, { payload }) => {
        state.errorMessage = payload?.error || payload?.message || 'Delete failed';
      });
  },
});
export const { messageClear } = productReducer.actions;
export default productReducer.reducer;
