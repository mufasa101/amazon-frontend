import Image from "next/image";
import { MenuIcon, SearchIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";
import { useSession, signIn, signOut } from "next-auth/client";

function Header(props) {
  const [session] = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);
  return (
    <header>
      <div className="flex items-center bg-amazon_blue py-2 p-1 flex-grow">
        <div className="flex items-center flex-grow mt-2 sm:flex-grow-0">
          <Image
            onClick={() => router.push("/")}
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
            width={150}
            height={35}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>
        <div className="hidden sm:flex items-center h-10 rounded-md bg-yellow-400 hover:bg-yellow-500 flex-grow cursor-pointer">
          <input
            type="text"
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none"
            placeholder={router.route === "/" ? "🔎 Search in products listed below…" : ""}
            onInput={(event) => router.route === "/" && props.onSearchValue(event.target.value)}
          />
          <SearchIcon className="h-12 p-4" />
        </div>
        {/* <div className="hidden sm:flex items-center rounded-md h-10 flex-grow bg-yellow-400 hover:bg-yellow-500 cursor-text ">
          <input
            className="flex-grow w-6 h-full p-2 rounded-l-md flex-shrink focus:outline-none"
            type="text"
          />
          <SearchIcon className="h-12 p-4 cursor-pointer" />
        </div> */}
        <div className="text-white flex items-center space-x-6 mx-6 whitespace-nowrap text-xs">
          <div onClick={!session ? signIn : signOut} className="link">
            <p>{session ? `Hello, ${session.user.name}` : "Sign in"}</p>
            <p className="font-extrabold md:text-sm">Account & Listing</p>
          </div>
          <div className="link" onClick={() => router.push("/orders")}>
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>
          {/* <div className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div> */}
          <div className="link relative flex items-center" onClick={() => router.push("/checkout")}>
            <span className="absolute top-0 right-0 md:right-6 h-4 w-4 bg-yellow-400 font-bold text-black rounded-full text-center">
              {items.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-extrabold md:text-sm">Cart</p>
          </div>
        </div>
      </div>
      <div className="text-sm bg-amazon_blue-light flex items-center text-white py-2 pl-6 space-x-3">
        <p className="flex items-center link" onClick ={(event) => router.route === "/" && props.onClickCategory("all")}>
          <MenuIcon className="h-7 mr-1" />
          All
        </p>
    {/* this will be used for the filtering */}
        {props.categories.map((item)=>(
                  
               <p className="link" onClick ={(event) => router.route === "/" && props.onClickCategory(item)}>{item}</p>
            )) }


 
      </div>
    </header>
  );
}

export default Header;
