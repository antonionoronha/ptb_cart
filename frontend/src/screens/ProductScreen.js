import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProductScreen(props){

    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const[qty, setQty] = useState(1);
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, produto } = productDetails;


    useEffect(() => {
        dispatch(detailsProduct(productId));
    }, [dispatch, productId]);

    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`);
      };

    return (
    <div>
    {loading? (<LoadingBox></LoadingBox>)
    :
    error? (<MessageBox variant="danger">{error}</MessageBox>)
    : 
    (<div>
        <Link to="/">Voltar</Link>
        <div className="row top">
            <div className="col-1">
                <ul>
                    <li>
                        <h1>
                            <span>{produto.descricao}</span>
                        </h1>
                    </li>
                    <li>
                        Preço: R${produto.preco}
                    </li>
                    <li>
                        Marca: {produto.marca}
                    </li>
                </ul>
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <div className="row">
                                <div> Preço</div>                          
                                <div className="preco">R${produto.preco}</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div> Status</div>                          
                                <div>
                                    {produto.quantidade > 0 ? 
                                    (<span className="success">Em estoque</span>)
                                    :
                                    (<span className="danger">Indisponível</span>)
                                    }
                                </div>
                            </div>
                        </li>
                        {produto.quantidade > 0 && (
                            <>    
                            <li>
                                <div className="row">
                                    <div>
                                        Quantidade:                    
                                    </div>
                                    <div>
                                        <select value={qty} onChange={e => setQty(e.target.value)}>
                                            {
                                                [...Array(produto.quantidade).keys()].map( (x) => (
                                                    <option key={x+1} value={x+1}>{x+1}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </li>
                                <li>
                                    <button onClick={addToCartHandler} className="primary block">Adicionar ao carrinho</button>
                                </li>
                            </>
                            )
                        }
                                        
                    </ul>
                </div>
            </div>
        </div>
    </div>)}
    </div>);
}