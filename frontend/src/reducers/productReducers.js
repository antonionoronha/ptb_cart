const { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_SUCCESS } = require("../constants/productConstants");

export const productListReducer = (state = { loading: true, produtos:[] }, action) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading: true};
        case PRODUCT_LIST_SUCCESS:
            return {loading: false, produtos: action.payload};
        case PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const productDetailsReducer = ( state = { produto:{}, loading:true }, action) => {
    switch (action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {loading:true};
        case PRODUCT_DETAILS_SUCCESS:
            return {loading:false, produto: action.payload };
        case PRODUCT_DETAILS_FAIL:
            return {loading:false, error: action.payload };
        default:
            return state;
    }
}