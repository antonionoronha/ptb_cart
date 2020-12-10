import React, { useEffect } from 'react';
import Produto from '../components/Produto';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

export default function HomeScreen(){

    const dispatch = useDispatch();
    const productList = useSelector( state => state.productList );
    const { loading, error, produtos } = productList;


    useEffect(() => {
      dispatch(listProducts());
    }, []);

    return (
  <div>
    {loading? <LoadingBox></LoadingBox>
    :
    error? <MessageBox variant="danger">{error}</MessageBox>
    :
    <div className="row center">
      {
        produtos.map((produto) => (
            <Produto key={produto._id} produto={produto}></Produto>
          ))
      }      
    </div>
    }

    </div>
    );
}