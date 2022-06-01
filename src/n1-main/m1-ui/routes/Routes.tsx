import {Navigate, Route, Routes} from "react-router-dom"
import Test from "../../../n2-common/Test";
import Error404 from "../../../n2-common/Error404";
import Login from "../../../n2-common/c1-auth/login/Login";
import {RecoveryPasswordContainer} from "../../../n2-common/c1-auth/recoveryPassword/r1-ui/RecoveryPasswordContainer";
import NewPassword from "../../../n2-common/c1-auth/NewPassword";
import {RegistrationContainer} from "../../../n2-common/c1-auth/registration/r1-ui/RegistrationContainer";
import Profile from "../../../n2-common/kirill/k1-ui/Profile";

const MyRoutes = () => {
    return <div>
        <Routes>
            <Route path={'login'} element={<Login/>}/>
            <Route path={'registration'} element={<RegistrationContainer/>}/>
            <Route path={'/'} element={<Profile/>}/>
            <Route path={'/404'} element={<Error404/>}/>
            <Route path={'recovery-password'} element={<RecoveryPasswordContainer/>}/>
            <Route path={'new-password'} element={<NewPassword/>}/>
            <Route path={'test'} element={<Test/>}/>
            <Route path={'*'} element={<Navigate to={'/404'}/>}/>
        </Routes>
    </div>
}

export default MyRoutes