import React from 'react';
import { Link } from 'react-router-dom';
import MyButton from './button/MyButton';
import './style.css'

function Cart({ cart, setCart, user, pets, setOrders }) {

    const handleRemoveFromCart = (pet) => {
      setCart(cart.filter((a) => a.id !== pet.id));
    };

    if (user === null) {
        return (
          <main>
            <Link to="/">Дом питомцев</Link>
            <h1>Корзина</h1>
            <p>Войдите чтобы открыть корзину</p>
          </main>
        );
    }
    
    if (cart.length === 0) {
        return (
          <main>
            <Link to="/">Дом питомцев</Link>
            <Link to="/orders">Заказы</Link>
            <h1>Корзина</h1>
            <p>Ваша корзина пуста</p>
          </main>
        );
    }

    const updateProductQuantity = (pet, quantity) => {
        const newCart = cart.map((item) => {
          if (item.id === pet.id) {
            if (item.quantity + quantity === 0) {
              return null;
            }
            return {
              ...item,
              quantity: item.quantity + quantity,
            };
          }
          return item;
        });
        setCart(newCart.filter((item) => item !== null));
    };

    const maxId = pets.reduce((acc, pet) => {
        return Math.max(acc, pet.id);
    }, 0);

    const checkout = () => {
        if (cart.length === 0) {
          alert("Ваша корзина пуста");
          return;
        }
        const obj_cart = {
          id: maxId + 1,
          products: cart
        }
        setOrders([...pets, obj_cart]);
        setCart([]);
    }

    return (
        <div>
            <div className="links">
                <Link to="/">Дом питомцев</Link>
                <Link to="/orders">Заказы</Link>
            </div>
            <h1>Корзина</h1>
            <p style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                {cart.map((pet) => (
                    <div key={pet.id}>
                        <p>{pet.name}</p>
                        {pet.quantity}
                        <MyButton onClick={() => updateProductQuantity(pet, 1)}>+</MyButton>
                        <MyButton onClick={() => updateProductQuantity(pet, -1)}>-</MyButton>
                        <MyButton onClick={() => handleRemoveFromCart(pet)}>Удалить из корзины</MyButton>
                    </div>
                ))}
            </p>
            <MyButton onClick={checkout}>Заказать</MyButton>
        </div>
    )
}

export default Cart;