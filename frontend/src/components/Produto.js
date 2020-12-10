import React from 'react';
import { Link } from 'react-router-dom';


export default function Produto(props)
{
    const { produto } = props;

    return (
        <div key={produto._id} className="card">
                <Link to={`/products/${produto._id}`}>
                </Link>
                <div className="card-body">
                <Link to={`/products/${produto._id}`}>
                <h3>{produto.descricao}</h3>
                </Link>                
                <h2>{produto.marca}</h2>
                  
            <div className="price">R${produto.preco}</div>
            </div>
        </div>
    )
}
               