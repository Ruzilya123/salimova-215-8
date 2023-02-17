import {useNavigate} from "react-router-dom";
import MyButton from "./button/MyButton";

function ComplitedOrders({orders, user}) {
  const navigate = useNavigate();

  const ordersList = orders.map((order) => {
    return (
      <li key={order.id}>
        {order?.cart?.map((checkout) => (
            <h3>{checkout.name}</h3>
        ))}
      </li>
    );
  });

  if (user === null) {
    return (
      <main>
        <h1>Orders</h1>
        <p>Login to view your orders</p>
      </main>
    );
  }

  const goHome = () => {
    navigate("/");
  }

  return (
    <main>
      <MyButton onClick={goHome}>Назад</MyButton>
      <h1>Orders</h1>
      <ul>
        {ordersList}
      </ul>
    </main>
  );
}

export default ComplitedOrders;
