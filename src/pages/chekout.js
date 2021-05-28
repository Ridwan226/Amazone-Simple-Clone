import Image from 'next/image';
import {useSelector} from 'react-redux';
import CheckOutProduct from '../components/CheckOutProduct';
import Header from '../components/Header';
import {selectItems, selectTotal} from '../slices/basketSlice';
import Currency from 'react-currency-formatter';
import {useSession} from 'next-auth/client';
function Chekout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const [session] = useSession();

  return (
    <div className="bg-gray-100">
      <Header />

      <div className="lg:flex max-w-screen-2xl mx-auto">
        {/* Left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            alt=""
            width={1020}
            height={250}
            objectFit="contain"
          />
          <div className="flex flex-col p-5 space-x-10 bg-white">
            <h1 className="text-3xl border-b py-4">
              {items.length === 0
                ? `Your Amazon Basket isEmpty`
                : `Your Shopping Basket`}
            </h1>

            {items.map((item, i) => (
              <CheckOutProduct
                key={i}
                id={item.id}
                title={item.title}
                price={item.price}
                category={item.category}
                image={item.image}
                description={item.description}
                hasPrime={item.hasPrime}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        {/* Right */}

        {items.length > 0 && (
          <div className="flex flex-col bg-white p-10 shadow-md">
            <>
              <h2 className="whitespace-nowrap">
                Subtotal {items.length} Items:
                <span className="font-bold">
                  <Currency quantity={total} currency="GBP" />
                </span>
              </h2>

              <button
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  `from-gray-300 to-gray-500 border-gray-200 text-gray-200`
                } `}>
                {!session ? 'Sign In to Chekout' : 'Proccess To Chekout'}
              </button>
            </>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chekout;
