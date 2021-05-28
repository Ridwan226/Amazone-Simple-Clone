import Image from 'next/image';
import {MenuIcon, SearchIcon, ShoppingCartIcon} from '@heroicons/react/outline';
import {signIn, signOut, useSession} from 'next-auth/client';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {selectItems} from '../slices/basketSlice';

function header() {
  const [session] = useSession();
  const Router = useRouter();

  const items = useSelector(selectItems);

  // session.user

  return (
    <header>
      {/* Top Nav */}
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <div className="mt-2 items-center flex-grow sm:flex-grow-0 ">
          <Image
            onClick={() => Router.push('/')}
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>

        {/* search */}

        <div className="hidden sm:flex items-center h-10 rounded-md flex-grow bg-yellow-400 hover:bg-yellow-500">
          <input
            type="text"
            className="p-2 h-full flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
          />
          <SearchIcon className="h-12 p-4" />
        </div>

        {/* Right */}
        <div className="text-white  flex item-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div onClick={!session ? signIn : signOut} className="link">
            <p>Hallo {session ? `${session.user.name}` : 'Sign In'}</p>
            <p className="font-extrabold md:text-sm">Account & list</p>
          </div>
          <div className=" link">
            <p>Return</p>
            <p className="font-extrabold md:text-sm">& Order</p>
          </div>
          <div
            onClick={() => Router.push('/chekout')}
            className="relative link flex items-center">
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
              {items.length}
            </span>

            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>
      {/* Buttom Nav */}
      <div className="flex item-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
        <p className="link flex item-center">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deals</p>
        <p className="link hidden lg:inline-flex">Electric</p>
        <p className="link hidden lg:inline-flex">Food & Grocy</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">
          Healty & Person & Personal care
        </p>
      </div>
    </header>
  );
}

export default header;
