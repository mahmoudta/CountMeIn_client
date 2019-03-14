import React, { Component } from 'react';
import './global.css';

class Navbar extends Component {
	render() {
		return (
			<aside className="py-5 px-lg-2">
				<ul className="list-unstyled">
					<li className="border-bottom py-3 active">
						{/* <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle"> */}
						<a href="#homeSubmenu">Dashboard</a>
					</li>
					<li className="border-bottom py-3">
						<a href="#">About</a>
					</li>
				</ul>
			</aside>
		);
	}
}

export default Navbar;
