import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavHashLink } from 'react-router-hash-link'

const AppNav = () => (
    <Navbar
        expand="lg"
        sticky="top"
    >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
                <Nav.Item>
                    <NavHashLink
                        smooth
                        to="/home#"
                        className="nav-link"
                        activeClassName="active"
                        isActive={(match, location) =>
                            location.pathname === '/' ||
                            location.pathname === '/home'
                        }
                    >
                        Home
                    </NavHashLink>
                </Nav.Item>
                <Nav.Item>
                    <NavHashLink
                        smooth
                        to="/reports#"
                        className="nav-link"
                        activeClassName="active"
                        isActive={(match, location) =>
                            location.pathname === '/reports'
                        }
                    >
                        Reports
                    </NavHashLink>
                </Nav.Item>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
)

export default AppNav
