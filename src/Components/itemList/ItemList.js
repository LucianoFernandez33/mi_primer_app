import React from 'react';
import "./ItemList.css"
import Item from '../items/Item';

const ItemList = ({productos}) =>{

    return (
        <>
        <div className="container-tit">CATÁLOGO</div>
        <div className="catalogo">
            {productos.map((arrayItems)=>
            <div key={arrayItems.id} className="container-card">
                <Item img={arrayItems.img} tittle={arrayItems.tittle} description= {arrayItems.description} price={arrayItems.price} stock= {arrayItems.stock}/>
            </div>
        )}
        </div>
        </>
    )
}
 export default ItemList;

