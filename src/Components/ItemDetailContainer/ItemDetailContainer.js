import React, { useState, useEffect, useContext } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
import ItemCountContainer from '../ItemCountContainer/ItemCountContainer';
import {CartContext} from "../../Context/CartContext";
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { getFiresTore } from "../../firebase";

const ItemDetailContainer = () => {

    const [show, setShow] = useState(true)
    const {cart, addCart} = useContext(CartContext)
    const [datos, setDatos] = useState({})
    const {id} = useParams()
    const [items, setItems] = useState([])
    //const [notFound, setNotFound] = useState(false);

    console.log(items)

  useEffect(()=>{
      const db = getFiresTore();
      const itemsCollection = db.collection("items");
      const itemDetail = itemsCollection.doc(id);
        console.log(itemDetail)  
      itemDetail.get().then((doc)=>{
          if (!doc.exists) {
              console.log("items no existe");
              return;
          }
          setItems({id: doc.id, ...doc.data()});
      }). catch((error) =>console.log("ocurrio un error",error))
        .finally(()=>console.log("finalizado"))
      
  },[])

 const onAdd = (cantidad) =>{
    addCart(datos[0],cantidad)
    setShow(!show)
}
 return(
        <div>
            {items.length > 0  ? <ItemDetail items={items}/> : 
            <p>Cargando...</p>}
            {show ? items.length > 0 ? <ItemCountContainer items={items[0]} onAdd={onAdd}/> : <p>Cargando...</p> : <Link to={`/cart`} ><Button className="buttonTerminarCompra">TERMINAR COMPRA</Button></Link>}
        </div>  
    );     
};

export default ItemDetailContainer;