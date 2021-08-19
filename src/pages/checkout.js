import Image from "next/image";
import { useSelector } from "react-redux";
import CheckOutProduct from "../components/Checkoutproduct";
import Header from "../components/Header";
import { selectItems, selectTotal } from "../slices/basketSlice";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/client";
import { groupBy } from "lodash";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
function Checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const [session] = useSession();
  const stripePromise = loadStripe(process.env.stripe_public_key);

  // const createCheckoutSession = async () => {
  //   const stripe = await stripePromise;
  //   const checkoutsession = await axios.post("/api/create-checkout-session", {
  //     items: items,
  //     email: session.user.email,
  //   });
  //   const result = await stripe.redirectToCheckout({
  //     sessionId: checkoutsession.data.id,
  //   });
  //   if (result.error) {
  //     alert(result.error.message);
  //   }
  // };
  
  async function createCheckoutSession() {
    const stripe = await stripePromise;

    // Call the backend to create a checkout session...
    const checkoutSession = await axios.post(
        "/api/create-checkout-session",
        {
            items,
            email: session.user.email,
        }
    );

    // After have created a session, redirect the user/customer to Stripe Checkout
    const result = await stripe.redirectToCheckout({
        sessionId: checkoutSession.data.id,
    });

    if (result.error) {
        alert(result.error.message); // @todo : Improve that!
    }
}

  const groupedItems = Object.values(groupBy(items, "id"));

  return (
    <div className="bg-gray-100">
      <Header></Header>
      <div className="lg:flex max-w-screen-2xl mx-auto ">
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectfit="contain"
          ></Image>
          <div className="flex flex-col bg-white p-5 space-y-5">
            <h1 className="pb-4 border-b text-2xl">
              {items.length === 0
                ? "Your shopping basket is empty my nigga"
                : "Your shopping basket"}
            </h1>
            <TransitionGroup>
              {groupedItems.map((group, i) => (
                <CSSTransition key={group[0].image} timeout={500} classNames="item">
                  <CheckOutProduct
                    key={group[0].id}
                    id={group[0].id}
                    title={group[0].title}
                    rating={group[0].rating}
                    price={group[0].price}
                    description={group[0].description}
                    category={group[0].category}
                    image={group[0].image}
                    hasPrime={group[0].hasPrime}
                    quantity={group.length}
                  />
                </CSSTransition>
              ))}
            </TransitionGroup>
            {/* {items.map((item, i) => (
              <CheckOutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                rating={item.rating}
                hasPrimeDelivery={item.hasPrimeDelivery}
              />
            ))} */}
          </div>
        </div>
        <CSSTransition
                    in={items.length > 0}
                    timeout={300}
                    classNames="disappear"
                    unmountOnExit>
                    <div className="flex flex-col bg-white p-10 shadow-md">
                        <h2 className="whitespace-nowrap">
                            Subtotal ({items.length} items):{" "}
                            <span className="font-bold">
                                <Currency quantity={total} currency="USD" />
                            </span>
                        </h2>

                        <button
                            role="link"
                            onClick={createCheckoutSession}
                            disabled={!session}
                            className={`amazon-button mt-2 ${
                                !session &&
                                "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed hover:from-gray-300"
                            }`}>
                            {!session
                                ? "Sign in to checkout"
                                : "Proceed to checkout"}
                        </button>
                    </div>
                </CSSTransition>
        {/* <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length}) items:
                <span className="font-bold">
                  <Currency quantity={total} currency="USD"></Currency>
                </span>
              </h2>
              <button
                role="link"
                onClick={createCheckoutSession}
                disabled={!session}
                className={`amazon-button mt-2 ${!session && "illegal-button"}`}
              >
                {!session ? `Sign in to checkout` : "Procceed to checkout"}
              </button>
            </>
          )}
        </div> */}
      </div>
    </div>
  );
}

export default Checkout;
