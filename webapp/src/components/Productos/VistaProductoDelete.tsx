import { useEffect, useState, useRef } from 'react'
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { pad } from "@cloudinary/url-gen/actions/resize";
import {Producto, Item} from '../../shared/sharedtypes'
import {useNavigate, useParams} from "react-router-dom";
import * as productoService from '../Services/ProductsService';
import { ConstructionOutlined } from '@mui/icons-material';
import {ReactSession} from 'react-client-session';
import { unstable_createChainedFunction } from '@mui/utils';




export const VistaProductoDelete = () => {

    const initialState = {
        category:"",
        name: "",
        description: "",
        urlImage: "",
        basePrice: 0,
        units: 0,
        onSale: true,
        IVA: 0.21
    };

    const [productos, setProductos] = useState<Producto[]>([])
    const [detalle, setDetalle] = useState<Producto>(initialState)
    const navigate = useNavigate();


    const params = useParams();
    console.log("parametros")
    console.log(params);
    

    const loadProductos = async () => {
        const res = await productoService.getProductos()
        console.log(res)
        let datos = res.data
        console.log(datos)
        setProductos(datos.products)   
    }

    useEffect(() => {
        loadProductos()
    }, [])

    console.log("productos")
    console.log(productos);

    useEffect(() => {
        productos.forEach(producto =>{
            if((producto._id) === params._id){
                setDetalle(producto)
            }
        } 
        )
    }, [params._id, productos])
   

    console.log("Detalle")
    console.log(detalle)

    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dede4a'
        }
    });

    const myImage = cld.image(detalle?.urlImage);

    myImage
        .resize(pad().width(350).height(350))

    const price = detalle?.basePrice + (detalle?.basePrice * detalle?.IVA)

    console.log("detalle.basePrice")
    console.log(detalle.basePrice)
    console.log("detalle.IVA")
    console.log(detalle.IVA)
    
    

  return (
    <div className='detalles'>
        <h2>{detalle?.name}</h2>
        <div className='separacion'>
            <AdvancedImage className='imagenc' cldImg={myImage} />
            <a className='precio'>Price: {price.toFixed(2)}$</a>
        </div>
        <p className='descripcion'>{detalle?.description}</p>
    </div>
    
  )
}
