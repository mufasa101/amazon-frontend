import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Currency from "react-currency-formatter";
import { addToBasket } from "../slices/basketSlice";
const MAX_RATING = 5;
const MIN_RATING = 1;

function Products({ id, title, price, description, category, image }) {
  const dispatch = useDispatch();
  const [rating] = useState(Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING);
  const [hasPrimeDelivery] = useState(Math.random() < 0.5);
  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      hasPrimeDelivery,
      rating,
    };
    dispatch(addToBasket(product));
  };

  return (
    <div className="relative flex flex-col z-30 m-5 bg-white p-10">
      <p className="absolute right-2 top-2 text-xs italic text-gray-400">{category}</p>
      <Image src={image} height={200} width={200} objectFit="contain"></Image>
      <h4 className="my-3">{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon key={i} className="h-5  text-yellow-500"></StarIcon>
          ))}
      </div>

      <p className="text-xs my-2 line-clamp-2">{description}</p>
  <div className="mb-5">
    <Currency quantity={price} currency="USD"></Currency>
  </div>

      {hasPrimeDelivery && (
        <div className="flex items-center -mt-5 space-x-2">
          <img className="w-12" src="https://links.papareact.com/fdw" alt="product image" />
          <p className="text-xs text-gray-500">Free next day delivery</p>
        </div>
      )}

      <button onClick={addItemToBasket} className="mt-auto amazon-button">
        Add to basket
      </button>
    </div>
  );
}

export default Products;
