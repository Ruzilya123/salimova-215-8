import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MyButton from "./button/MyButton";
import "./style.css";

const gettingAPI = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

function Home({ isLoaded, setIsLoaded, pets, setPets, user, setUser, cart, setCart }) {
  const [loading, setLoading] = useState(false);

  function make_unique_items(items) {
    const unique_items = [];
    items.forEach((item) => {
        if (unique_items.find((unique_item) => unique_item.id === item.id && unique_item.status === item.status && unique_item.name === item.name)) {
            return;
        }
        if (unique_items.find((unique_item) => unique_item.id === item.id)) {
            return;
        }
        unique_items.push(item);
    });
    return unique_items;
  }

  const fetchData = async () => {
    setLoading(true);
    setTimeout(async () => {
      await gettingAPI("https://petstore.swagger.io/v2/pet/findByStatus?status=available").then(
        (data) => {
          const u = make_unique_items(data)
          setPets(u);
          setIsLoaded(true);
          setLoading(false);
        }
      );
    }, 1000);
  };

  useEffect(() => {
    if (!isLoaded) {
      fetchData();
    }
  }, []);

  function logout() {
    setUser(null);
  }

  function isPetInCart(pet) {
    return cart.some((p) => p.id === pet.id)
  }

  const addPetInCart = (pet) => {
    pet = {
        ...pet,
        quantity: 1,
    }
    setCart([...cart, pet]);
  }

  return (
    <div>
      {loading ? (
        <>
          <h1>Дом питомцев</h1>
          <h1>Загрузка...</h1>
        </>
      ) : (
        <>
          {user != null ? (
            <>
              <div className="links">
                  <Link to="/">Дом питомцев</Link>
                  <Link to="/cart">Корзина({cart?.length})</Link>
                  <Link to="/login" onClick={logout}>Выйти из аккаунта</Link>
              </div>
              <h1>Дом питомцев</h1>
              {pets.map((pet) => (
                <li>
                  <p>{pet.name}</p>
                  {!isPetInCart(pet) ?
                    <MyButton onClick={() => addPetInCart(pet)}>Добавить питомца в корзину</MyButton>
                    :
                    <MyButton disabled>Питомец в корзине</MyButton>
                  }
                </li>
              ))}
            </>
          ) : (
            <>
              <div className="links">
                  <Link to="/">Дом питомцев</Link>
                  <Link to="/login">Вход</Link>
                  <Link to="/register">Регистрация</Link>
              </div>
              <h1>Home pets</h1>
              {pets.map((pet) => (
                <li>
                  <p>{pet.name}</p>
                </li>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
