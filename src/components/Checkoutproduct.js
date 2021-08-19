import Image from "next/image";
import { MinusSmIcon, PlusIcon, StarIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket,removeGroupedFromBasket } from "../slices/basketSlice";

import Currency from "react-currency-formatter";
function CheckOutProduct({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
  hasPrimeDelivery,
  quantity,
  
}) {
  const dispatch = useDispatch();
  const total = price * quantity;
  const addItemsToBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
      hasPrimeDelivery,
    };
    dispatch(addToBasket(product));
  };
  const removeItemsBasket = () => {
    dispatch(removeFromBasket({ id }));
  };
  function removeGroupFromBasket() {
    dispatch(removeGroupedFromBasket({ id }));
}
  return (
    <div className="grid grid-cols-5">
      <Image src={image} width={200} height={200} objectFit="contain"></Image>

      <div className="mx-5 col-span-3 ">
        <h4 className="">{title}</h4>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5  text-yellow-500"></StarIcon>
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3">{description}</p>
        {quantity} × <Currency quantity={price} currency="USD" /> ={" "}
                <span className="font-bold">
                    <Currency quantity={total} currency="USD" />
                </span>


        {/* <Currency quantity={price} currency="USD"></Currency> */}
        {hasPrimeDelivery && (
          <div className="flex items-center space-x-2">
            <img
              className="w-12"
              src="https://links.papareact.com/fdw"
              alt="product image"
              loading="lazy"
            />
            <p className="text-xs text-gray-500">Free next day delivery</p>
          </div>
        )}
      </div>
      {/* <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button className="amazon-button" onClick={addItemsToBasket}>
          Add to basket
        </button>
        <button className="amazon-button " onClick={removeItemsBasket}>
          Remove from basket
        </button>
      </div>
      <button className="amazon-button" onClick={removeGroupFromBasket}>
                    Remove from Basket
                </button> */}
                    <div className="flex flex-col space-y-2 my-auto justify-self-end">
                <div className="flex justify-between xs:justify-start">
                    <button
                        className="amazon-button sm:p-1"
                        onClick={removeItemsBasket}>
                        <MinusSmIcon className="h-5 text-black" />
                    </button>
                    <div className="p-2 whitespace-normal sm:p-1 sm:whitespace-nowrap">
                        Quantity: <span className="font-bold">{quantity}</span>
                    </div>
                    <button className="amazon-button sm:p-1" onClick={addItemsToBasket}>
                        <PlusIcon className="h-5 text-black" />
                    </button>
                </div>
                <button className="amazon-button" onClick={removeGroupFromBasket}>
                    Remove from Basket
                </button>
            </div>
    </div>
  );
}

export default CheckOutProduct;
