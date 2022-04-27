import {Cloudinary} from "@cloudinary/url-gen";
import { Item } from "../../shared/sharedtypes";
import { pad } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "@cloudinary/react";


const OrderItem = ({producto, num}: Item) => {  

    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dede4a'
        }
    }); 

    const url = producto.urlImage
    const myImage = cld.image(url); 
    
    myImage
    .resize(pad().width(250).height(250))

  return (
        <div>
          <a href="#">
                <div className="producto__img">
                    <AdvancedImage cldImg={myImage} />
                </div>
            </a>
            <div className="producto__footer">
                <h1>{producto.name} - Uds:{num}</h1>
                
                <p className="price">{producto.price}€</p>
            </div>
            
        </div>
  );
}

export default OrderItem