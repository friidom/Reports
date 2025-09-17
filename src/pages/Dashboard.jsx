import { Link } from "react-router-dom";

function Dashboard() {
    return (
        <>
            <h1>Dashboard</h1>
            <Link to="reports">go to reports</Link>
        </>
    )
}

export default Dashboard;