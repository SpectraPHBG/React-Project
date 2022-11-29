import './App.scss';
import Layout from "./components/layout/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from "react-router";
import {LoginForm} from "./components/Auth/login-form/LoginForm";
import {Home} from "./components/home/Home";
import {NonAuthenticatedGuard} from "./utils/guards/NonAuthenticatedGuard";
import {AuthenticatedRoute} from "./utils/guards/AuthenticatedRoute";
import {UserContext} from "./utils/contexts/UserContext";
import {useMemo, useState} from "react";
import {RegisterForm} from "./components/Auth/register-form/RegisterForm";
import {ProfileMain} from "./components/profile/profile-main/ProfileMain";
import {EditUserForm} from "./components/user/edit-user-form/EditUserForm";
import {VehiclesBrowse} from "./components/vehicles/vehicles-browse/VehiclesBrowse";
import {EditPasswordForm} from "./components/user/edit-password-form/EditPasswordForm";
import {AuthenticatedAdminRoute} from "./utils/guards/AuthenticatedAdminRoute";
import {VehicleForm} from "./components/vehicles/vehicle-form/VehicleForm";
import {VehicleRent} from "./components/vehicles/vehicle-rent/VehicleRent";
import {EndDateContext, StartDateContext} from "./utils/contexts/DateContext";
import {Admin} from "./components/admin/Admin";
import {UserForm} from "./components/user/user-form/UserForm";

function App() {
    const now = new Date();
    const [startDate, setStartDate] = useState(new Date(now.getTime() + 86400000));
    const [endDate, setEndDate] = useState(new Date(now.getTime() + 176400000));
    const [loggedUser, setLoggedUser] = useState(null);
    const startDateValue = useMemo(() => ({startDate, setStartDate}), [startDate, setStartDate]); // only changes when either logged user changes or setLoggedUserChanges
    const endDateValue = useMemo(() => ({endDate, setEndDate}), [endDate, setEndDate]); // only changes when either logged user changes or setLoggedUserChanges
    const userValue = useMemo(() => ({loggedUser, setLoggedUser}), [loggedUser, setLoggedUser]); // only changes when either logged user changes or setLoggedUserChanges

    return (
        <div className="App">
            <UserContext.Provider value={userValue}>
                <StartDateContext.Provider value={startDateValue}>
                    <EndDateContext.Provider value={endDateValue}>
                        <Routes>
                            <Route path="/login" element={<NonAuthenticatedGuard><LoginForm/></NonAuthenticatedGuard>}/>
                            <Route path="/register"
                                   element={<NonAuthenticatedGuard><RegisterForm/></NonAuthenticatedGuard>}/>
                            <Route path="/edit/:id"
                                   element={<AuthenticatedAdminRoute><UserForm/></AuthenticatedAdminRoute>}/>
                            <Route exact path="/" element={<Layout/>}>
                                <Route index element={<Home/>}/>
                                <Route path="/profile"
                                       element={<AuthenticatedRoute> <ProfileMain/></AuthenticatedRoute>}/>
                                <Route path="/edit/profile/:id"
                                       element={<AuthenticatedRoute> <EditUserForm/></AuthenticatedRoute>}/>
                                <Route path="/edit/password/:id"
                                       element={<AuthenticatedRoute> <EditPasswordForm/></AuthenticatedRoute>}/>
                                <Route path="/browse"
                                       element={<AuthenticatedRoute> <VehiclesBrowse/></AuthenticatedRoute>}/>
                                <Route path="/browse/page=:page"
                                       element={<AuthenticatedRoute> <VehiclesBrowse/></AuthenticatedRoute>}/>
                                <Route path="/vehicles/add"
                                       element={<AuthenticatedAdminRoute> <VehicleForm/></AuthenticatedAdminRoute>}/>
                                <Route path="/vehicles/edit/:id"
                                       element={<AuthenticatedRoute> <VehicleForm/></AuthenticatedRoute>}/>
                                <Route path="/rent/:id"
                                       element={<AuthenticatedRoute> <VehicleRent/></AuthenticatedRoute>}/>
                                <Route path="/admin"
                                       element={<AuthenticatedAdminRoute> <Admin/></AuthenticatedAdminRoute>}/>
                            </Route>
                        </Routes>
                    </EndDateContext.Provider>
                </StartDateContext.Provider>
            </UserContext.Provider>
        </div>
    );
}

export default App;
