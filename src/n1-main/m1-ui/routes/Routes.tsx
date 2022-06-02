import {Navigate, Route, Routes} from "react-router-dom"
import RecoveryPassword from "../../../n2-common/c1-auth/RecoveryPassword";
import Test from "../../../n2-common/Test";
import Error404 from "../../../n2-common/Error404";
import {LoginContainer} from "../../../n2-common/c1-auth/login/LoginContainer";
import {NewPasswordContainer} from "../../../n2-common/c1-auth/NewPassword/NewPasswordContainer";
import Profile from "../../../n2-common/kirill/k1-ui/Profile";
import {RegistrationContainer} from "../../../n2-common/c1-auth/registration/r1-ui/RegistrationContainer";


const MyRoutes = () => {
    return <div>
        <Routes>
            <Route path={'login'} element={<LoginContainer/>}/>
            <Route path={'registration'} element={<RegistrationContainer/>}/>
            <Route path={'/'} element={<Profile/>}/>
            <Route path={'/404'} element={<Error404/>}/>
            <Route path={'recovery-password'} element={<RecoveryPassword/>}/>
            <Route path={'set-new-password/:token'} element={<NewPasswordContainer/>}/>
            <Route path={'set-new-password/'} element={<NewPasswordContainer/>}/>
            <Route path={'test'} element={<Test/>}/>
            <Route path={'*'} element={<Navigate to={'/404'}/>}/>
        </Routes>
    </div>
}

export default MyRoutes