import GuestCheckout from "./GuestCheckout";
import UserCheckout from "./UserCheckout";

export default function Checkout() {
    const userId = localStorage.getItem("userId");
   return (
       <>
        {userId ? (
                <UserCheckout
                userId = {userId}
                />
        ) : (
                <GuestCheckout/>
        )}
       </>
   )
}