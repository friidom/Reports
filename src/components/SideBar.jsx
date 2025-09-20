import { useAuth } from '../context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function SideBar() {
    const { LogoutUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const result = await LogoutUser();
            
            if (result.success) {
                if (result.warning) {
                    console.log("Logout completed with warning:", result.warning);
                } else {
                    console.log("Logout successful");
                }
                navigate("/login");
            } else {
                console.log("Logout failed:", result.error);
                // Still redirect to login page since local session should be cleared
                navigate("/login");
            }
        } catch (error) {
            console.error("Unexpected error during logout:", error);
            // Always redirect to login page to ensure user is logged out
            navigate("/login");
        }
    };

    const menuItems = [
        {
            name: 'Dashboard',
            path: '/dashboard',
            icon: '/dashboard-icon.svg'
        },
        {
            name: 'Tables',
            path: '/dashboard/tables',
            icon: '/tables-icon.svg'
        },
        {
            name: 'Reports',
            path: '/dashboard/reports',
            icon: '/report-icon.svg'
        },
        {
            name: 'Turnover',
            path: '/dashboard/turnover',
            icon: '/box-icon.svg'
        },
        {
            name: 'Analytics',
            path: '/dashboard/analytics',
            icon: '/analytics-icon.svg'
        },
        {
            name: 'Settings',
            path: '/dashboard/settings',
            icon: '/settings-icon.svg'
        }
    ];

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h2 className="sidebar-title">Admin Dashboard</h2>
            </div>

            <nav className="sidebar-nav">
                <ul className="sidebar-menu">
                    {menuItems.map((item, index) => (
                        <li key={index} className="sidebar-menu-item">
                            <Link
                                to={item.path}
                                className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
                            >
                                <img src={item.icon} alt={item.name} className="sidebar-icon" />
                                <span className="sidebar-text">{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="sidebar-footer">
                <div className="sidebar-user">
                    <div className="user-info">
                        <span className="user-email">admin@example.com</span>
                        <span className="user-role">Администратор</span>
                    </div>
                    
                    <img 
                        onClick={handleLogout} 
                        src="/log-out-icon.svg" 
                        alt="Logout" 
                        className="logout-icon"
                        style={{ cursor: 'pointer', width: '20px', height: '20px' }}
                    />
                    
                </div>
            </div>
        </div>
    )
}
export default SideBar;
