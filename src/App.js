import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import IsAuth from "./components/utils/IsAuth";
import {observer} from "mobx-react-lite";
import UsersTablePage from "./pages/users/UsersTablePage";
import LogoutComponent from "./components/utils/LogoutComponent";
import Profile from "./pages/users/Profile";
import Settings from "./pages/users/Settings";
import Page404 from "./pages/Page404";
import UserDeleted from "./pages/UserDeleted";
import WishlistPage from "./pages/wishlist/WishlistPage";
import SelectWishlist from "./components/wishlist/SelectWishlist";
import Booking from "./pages/booking/Booking";
import TmpSubscribe from "./pages/saved/TmpSubscribe";
import UserBooking from "./pages/booking/UserBooking";
import SubscriptionsWishlists from "./pages/saved/SubscriptionsWishlists";
import SelectSubscriptionWishlist from "./components/wishlist/SelectSubscriptionWishlist";

function App() {
    return (
        <Routes>
            <Route path={'/login'} element={<LoginPage/>}/>
            <Route path={'/register'} element={<RegisterPage/>}/>
            <Route element={<IsAuth/>}>
                <Route path={'/wishlists'} element={<WishlistPage/>}/>
                <Route path={'/wishlists/:wishlistId'} element={<SelectWishlist/>}/>
                <Route path={'/shared/booking/:sharedId'} element={<Booking/>}/>
                <Route path={'/shared/subscribe/:sharedId'} element={<TmpSubscribe/>}/>
                <Route path={'/booking'} element={<UserBooking/>}/>
                <Route path={'/'} element={<WishlistPage/>}/>
                <Route path={'/subscriptions'} element={<SubscriptionsWishlists/>}/>
                <Route path={'/subscriptions/:wishlistId'} element={<SelectSubscriptionWishlist/>}/>

                <Route path={'/users/settings'} element={<Settings/>}/>
                <Route path={'/users/null'} element={<UserDeleted/>}/>
                <Route path={'/users/:username'} element={<Profile/>}/>

                <Route path={'/users'} element={<UsersTablePage/>}/>

                <Route path={'/404'} element={<Page404/>}/>

                <Route path={'/logout'} element={<LogoutComponent/>}/>
            </Route>
        </Routes>
    )
        ;
}

export default observer(App);
