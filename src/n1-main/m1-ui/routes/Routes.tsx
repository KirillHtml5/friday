import {Navigate, Route, Routes} from "react-router-dom"
import Test from "../../../n2-common/Test";
import Error404 from "../../../n2-common/Error404";
import {RecoveryPasswordContainer} from "../../../n2-common/c1-auth/recoveryPassword/r1-ui/RecoveryPasswordContainer";
import {RegistrationContainer} from "../../../n2-common/c1-auth/registration/r1-ui/RegistrationContainer";
import {LoginContainer} from "../../../n2-common/c1-auth/login/LoginContainer";
import {NewPasswordContainer} from "../../../n2-common/c1-auth/NewPassword/NewPasswordContainer";
import Profile from "../../../n2-common/c1-auth/profile/k1-ui/Profile";
import {PacksPage} from "../../../n2-common/c2-cards/packs/p1-ui/PacksPage";
import {CardsPage} from "../../../n2-common/c2-cards/cards/x2-cards-page/cardsPage";



const MyRoutes = () => {
    return <div>
        <Routes>
            <Route path={'login'} element={<LoginContainer/>}/>
            <Route path={'registration'} element={<RegistrationContainer/>}/>
            <Route path={'/'} element={<Profile/>}/>
            <Route path={'/404'} element={<Error404/>}/>
            <Route path={'set-new-password/:token'} element={<NewPasswordContainer/>}/>
            <Route path={'set-new-password/'} element={<NewPasswordContainer/>}/>
            <Route path={'recovery-password'} element={<RecoveryPasswordContainer/>}/>
            <Route path={'test'} element={<Test/>}/>
            <Route path={'packs'} element={<PacksPage/>}/>
            <Route path={'*'} element={<Navigate to={'/404'}/>}/>
            <Route path={'cards/:id'} element={<CardsPage/>}/>
        </Routes>
    </div>
}

export default MyRoutes