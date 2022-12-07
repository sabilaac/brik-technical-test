import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../utils/api';

const resource = 'product';
const initialState = {
    data: [],
    success: false,
    message: null,
    status: 'idle',
}

export const productSlice = createSlice({
    name: resource,
    initialState: localStorage.getItem("data2") ? JSON.parse(localStorage.getItem("data2"))[resource] : initialState,
    reducers: {
        // get: (state,action) => {
        //     state.data = action
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.status = 'idle';
                state.success = action.payload?.success;
                state.message = action.payload?.message;

                if (action.payload?.success) {
                    state.data = action.payload?.data;
                }
            })
            .addCase(addProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.status = 'idle';
                state.success = action.payload?.success;
                state.message = action.payload?.message;
                
                if(action.payload?.success) {
                    state.data = [...state.data, action.payload?.data];
                }
            })
            .addCase(updateProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.status = 'idle';
                state.success = action.payload?.success;
                state.message = action.payload?.message;

                if(action.payload?.success) {
                    state.data = state.data.map((item) => {
                        if(item?._id === action?.payload?.data?._id) {
                            return action.payload?.data
                        }
                        else {
                            return item
                        }
                    });
                }
            })
            .addCase(deleteProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.status = 'idle';
                state.success = action.payload?.success;
                state.message = action.payload?.message;
                
                if(action.payload?.success) {
                    state.data = state.data.filter((item) => item?._id !== action.payload?.data?._id);
                }
            });
    }
})

export const getProduct = createAsyncThunk(`${resource}/get`, async () => {
    try {
        const res = await api.request({
            method: "read",
            path: `${resource}/`,
        });

        return {
            success: true,
            message: "Success to get product",
            data: res,
        };
    } catch (err) {
        console.log(`Unable to retrieve dashboard. Error is ${err?.message}`);

        return {
            success: false,
            message: "Unable to create product. Please check paramater or may CURD api is expired",
            data: []
        };
    }
});

export const addProduct = createAsyncThunk(`${resource}/add`, async ({ CategoryId, categoryName, sku, name, description, weight, width, length, height, image, harga }) => {
    try {

        if (!CategoryId || !categoryName || !name || !description || !weight || !width || !length || !height || !image || !harga || !sku) {
            return {
                success: false,
                message: "Mandatory field is required!",
                data: []
            };
        }

        const res = await api.request({
            method: "create",
            path: `${resource}/`,
            data: { CategoryId, categoryName, sku, name, description, weight, width, length, height, image, harga }
        });

        return {
            success: true,
            message: "Success to add product",
            data: res?.data
        };
    } catch (err) {
        console.log(`Unable to add product. Error is ${err?.message}`);

        return {
            success: false,
            message: "Unable to add product. Please check paramater or may CURD api is expired",
            data: {}
        };
    }
});

export const updateProduct = createAsyncThunk(`${resource}/update`, async ({ id, CategoryId, categoryName, sku, name, description, weight, width, length, height, image, harga }) => {
    try {

        if (!CategoryId || !categoryName || !name || !description || !weight || !width || !length || !height || !image || !harga || !sku) {
            return {
                success: false,
                message: "Mandatory field is required!",
                data: {}
            };
        }

        const res = await api.request({
            method: "update",
            path: `${resource}/${id}`,
            data: { CategoryId, categoryName, sku, name, description, weight, width, length, height, image, harga }
        });

        return {
            success: true,
            message: "Success to update product",
            data: { _id: id, CategoryId, categoryName, sku, name, description, weight, width, length, height, image, harga }
        };
    } catch (err) {
        console.log(`Unable to update product. Error is ${err?.message}`);

        return {
            success: false,
            message: "Unable to update product. Please check paramater or may CURD api is expired",
            data: {}
        };
    }
});

export const deleteProduct = createAsyncThunk(`${resource}/delete`, async ({ id }) => {
    try {

        if (!id) {
            return {
                success: false,
                message: "Mandatory field is required!",
                data: {}
            };
        }

        const res = await api.request({
            method: "delete",
            path: `${resource}/${id}`,
        });

        return {
            success: true,
            message: "Success to delete product",
            data: {
                _id: id
            }
        };
    } catch (err) {
        console.log(`Unable to delete product. Error is ${err?.message}`);

        return {
            success: false,
            message: "Unable to delete product. Please check paramater or may CURD api is expired",
            data: {}
        };
    }
});

export const getStatus = (state) => {
    return {
        success: state.product?.success,
        message: state.product?.message,
        status: state.product?.status
    }
};
export const getAllProducts = (state) => state.product?.data;
export const getProductById = (state, id) => state.product?.data.find((item) => item?._id === id);