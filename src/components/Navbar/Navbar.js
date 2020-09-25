import React, { useContext } from "react";
import "./Navbar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, FormControl, Nav, Navbar } from "react-bootstrap";
import Logo from "../../images/Logo.png";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";

const Header = () => {
	const history = useHistory();
	const handleLogin = () => {
		history.push("/user");
	};
	const [loggedInUser, setLoggedInUser] = useContext(UserContext);

	return (

		<Navbar bg="transparent" expand="md">
			<div className="container-lg">
				<Link to="/" className="navbar-brand">
					<div className="logo">
						<img src={Logo} style={{ maxWidth: "100px" }} alt="Travel Guru Logo" />
					</div>
				</Link>
				<div className="search">
					<FormControl type="search" placeholder="Search your Destination..." className="mr-sm-2" />
				</div>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ml-auto align-items-md-center">
						<Link to="/" className="nav-link mr-lg-5 mr-0">
							News
						</Link>
						<Link to="/destination" className="nav-link mr-lg-5 mr-0">
							Destination
						</Link>
						<Link to="/blog" className="nav-link mr-lg-5 mr-0">
							Blog
						</Link>
						<Link to="/contact" className="nav-link mr-lg-5 mr-0">
							Contact
						</Link>

						{loggedInUser.isSignedIn ? (
							<Button className="btn btn-warning">Sign out</Button>
						) : (
							<Button className="btn btn-warning" onClick={handleLogin}>
								Login
							</Button>
						)}

						{loggedInUser.isSignedIn && (
							<div>
								{loggedInUser.name ? loggedInUser.name.split(" ").slice(0, 1) : "User"}
							</div>
						)}
					</Nav>
				</Navbar.Collapse>
			</div>
		</Navbar>
		
	);
};

export default Header;
