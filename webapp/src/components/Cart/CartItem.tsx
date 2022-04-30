import {Cloudinary} from "@cloudinary/url-gen";
import { Producto } from "../../shared/sharedtypes";
import { pad } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "@cloudinary/react";

interface Props{
    producto: Producto;
    num: number;
    
}

const CartItem = ({producto, num}: Props) => {

    

    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dede4a'
        }
    }); 

    const url = producto.urlImage
    const myImage = cld.image(url);

    const price = producto.basePrice + (producto.basePrice * producto.IVA)
    
    
    
    myImage
    .resize(pad().width(250).height(250))

  return (
        <div>
            <div className="producto__img">
                <AdvancedImage cldImg={myImage} />
            </div>
            <div className="producto__footer">
                <h1>{producto.name} - Uds:{num}</h1>
                
                <p className="price">{price.toFixed(2)}€</p>
            </div>
            
        </div>
  );
}

export default CartItem