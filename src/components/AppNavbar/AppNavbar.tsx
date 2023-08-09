import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { useLocation } from 'react-router-dom';

const AppNavbar: React.FC = () => {
    const location = useLocation();

    return (
        <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink
                        to="/clients"
                        className={`nav-link${location.pathname === '/clients' ? ' active' : ''}`}
                    >
                        Clients
                    </NavLink>
                </NavItem>
                {/* Add more NavItems as needed */}
            </Nav>
        </Navbar>
    );
};

export default AppNavbar;
