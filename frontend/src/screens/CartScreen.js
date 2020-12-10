import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';  
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';

export default function CartScreen(props){
    const productId = props.match.params.id;
    const qty = props.location.search? Number(props.location.search.split('=')[1]): 1;

    const cart = useSelector((state) => state.cart);

    const { cartItems } = cart;

    const dispatch = useDispatch();

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId,qty));
        }
    }, [dispatch,productId,qty]);

    const removeFromCartHandler = (id) =>
    {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        props.history.push('/shipping');
    }

    return (
        <div className="row top">
            <div className="col-2">
                <h1>Carrinho de compras</h1>
                {cartItems.length === 0?<MessageBox>
                    Carrinho tá vazio. <Link to="/">Vá às compras!!</Link>
                </MessageBox>
                :
                <ul>
                    {
                        cartItems.map((item) => (
                            <li key={item.produto}>
                                <div className="row">
                                    <div className="min-30">
                                        <Link to={`/product/${item.produto}`}>{item.descricao}</Link>
                                    </div>
                                    <div>
                                        <select value={item.qty} onChange={(e) => dispatch(addToCart(item.produto, Number(e.target.value)))}>
                                        {
                                                [...Array(item.quantidade).keys()].map( (x) => (
                                                    <option key={x+1} value={x+1}>{x+1}</option>
                                                ))
                                        }
                                        </select>
                                    </div>
                                    <div>
                                      R$ {item.preco}
                                    </div>
                                    <div>
                                        <button type="button" onClick={() => removeFromCartHandler(item.produto)}>Remover</button>
                                    </div>
                                </div>
                            </li>
                        ),)
                                    }
                    
                </ul>
                
                }
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>
                                Subtotal ({cartItems.reduce((a,c) => a + c.qty, 0)} itens): 
                                R${cartItems.reduce((a,c) => a + c.preco * c.qty, 0)}
                            </h2>
                        </li>
                        <li>
                            <button type="button" onClick={checkoutHandler} className="primary block" disabled={cartItems.length === 0}>
                                Ir paga pagamento
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}