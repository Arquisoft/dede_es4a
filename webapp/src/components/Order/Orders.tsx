import{ useState, useEffect} from 'react'
import { OrderType } from "../../shared/sharedtypes"
import { ReactSession } from 'react-client-session';
import * as orderService from './OrderService';
import OrdersItem from './OrdersItem';
import { useNavigate } from 'react-router';

const Orders = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const navigate = useNavigate();

  const loadOrders = async () => {
    let res = await orderService.getOrdersOf(ReactSession.get("user"));
    setOrders(res.data.orders);
  }

  useEffect(() => {
    loadOrders();
  }, [])

  const show = (order:OrderType) => {
    navigate('/orders/details/'+order.id);
  }

  return (
    <div>
      <h1 className='title'>Mis pedidos</h1>
      <div className='pedidos'>
        {orders.map(order => 
          {return (<div>
                    <OrdersItem id={order.id} price={order.price}/>
                    <div className="buttom">
                      <div> 
                        <a href="#" className="btn" onClick={() => show(order)}>Mostrar</a>
                      </div>
                    </div>
                  </div>
        )})}
      </div>
    </div>
  )
}

export default Orders
