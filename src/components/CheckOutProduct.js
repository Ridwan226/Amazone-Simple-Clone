import {StarIcon} from '@heroicons/react/solid';
import Image from 'next/image';
import Currency from 'react-currency-formatter';
import {useDispatch} from 'react-redux';
import {addToBasket, removeFromBasket} from '../slices/basketSlice';

function CheckOutProduct({
  id,
  title,
  price,
  category,
  image,
  description,
  hasPrime,
  rating,
}) {
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      category,
      image,
      description,
      hasPrime,
      rating,
    };
    // Push Items Into Redux
    dispatch(addToBasket(product));
  };

  const removeItemFromBasket = () => {
    // Remove Items From Redux
    dispatch(removeFromBasket({id}));
  };

  return (
    <div className="grid grid-cols-5">
      <Image src={image} height={200} width={200} objectFit="contain" />
      {/* Middel */}

      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs mt-2 my-2 line-clamp-3">{description}</p>
        <Currency quantity={price} currency="GBP" />

        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              loading="lazy"
              src="https://links.papareact.com/fdw"
              alt=""
              className="w-12"
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>
      {/* Right Add/Remove Button */}
      <div className="flex flex-col space-y-1 my-auto justify-self-end">
        <button className="button" onClick={addItemToBasket}>
          Add To Basket
        </button>
        <button className="button" onClick={removeItemFromBasket}>
          Remove To basket
        </button>
      </div>
    </div>
  );
}

export default CheckOutProduct;
