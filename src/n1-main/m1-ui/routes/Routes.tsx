import {Navigate, Route, Routes} from "react-router-dom"
import Login from "../../../n2-common/c1-auth/Login";
import NewPassword from "../../../n2-common/c1-auth/NewPassword";
import Profile from "../../../n2-common/c1-auth/Profile";
import RecoveryPassword from "../../../n2-common/c1-auth/RecoveryPassword";
import Test from "../../../n2-common/Test";
import Error404 from "../../../n2-common/Error404";
import {RegistrationContainer} from "../../../n2-common/c1-auth/registration/r1-ui/RegistrationContainer";

const MyRoutes = () => {
    return <div>
        <Routes>
            <Route path={'login'} element={<Login/>}/>
            <Route path={'registration'} element={<RegistrationContainer/>}/>
            <Route path={'/'} element={<Profile/>}/>
            <Route path={'/404'} element={<Error404/>}/>
            <Route path={'recovery-password'} element={<RecoveryPassword/>}/>
            <Route path={'new-password'} element={<NewPassword/>}/>
            <Route path={'test'} element={<Test/>}/>
            <Route path={'*'} element={<Navigate to={'/404'}/>}/>
        </Routes>
    </div>
}

export default MyRoutes