import { useAuth } from '../context/AuthContext';

function SideBar() {
    const { LogoutUser } = useAuth();

    return (
        <>
            SideBar
            <button onClick={LogoutUser}>Log out</button>

        </>
    )
}
export default SideBar;