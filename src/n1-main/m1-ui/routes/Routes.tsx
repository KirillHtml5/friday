import {Navigate, Route, Routes} from "react-router-dom"
import RecoveryPassword from "../../../n2-common/c1-auth/RecoveryPassword";
import Registration from "../../../n2-common/c1-auth/Registration";
import Test from "../../../n2-common/Test";
import Error404 from "../../../n2-common/Error404";
import Profile from "../../../n2-common/c1-auth/Profile";
import {LoginContainer} from "../../../n2-common/c1-auth/login/LoginContainer";
import {NewPasswordContainer} from "../../../n2-common/c1-auth/NewPassword/NewPasswordContainer";

const MyRoutes = () => {
    return <div>
        <Routes>
            <Route path={'login'} element={<LoginContainer/>}/>
            <Route path={'registration'} element={<Registration/>}/>
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