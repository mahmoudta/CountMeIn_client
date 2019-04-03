import React, { Component } from 'react';

export default class ClientView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			style: {
				'.header': {
					background: 'green',
					font: 'yellow'
				}
			}
		};
	}
	componentDidMount() {
		console.log(this.props.match.params.name);
	}
	render() {
		// var stringStyle = '';
		// for (let key in this.state.style) {
		// 	stringStyle += key + '{';
		// 	for (let inner in this.state.style[key]) {
		// 		stringStyle += inner + ':' + this.state.style[key][inner] + ';';
		// 	}
		// 	stringStyle += '}';
		// }
		// console.log(stringStyle);
		return (
			<section className="mt-5">
				{/* <style>{stringStyle}</style> */}
				<link
					rel="stylesheet"
					type="text/css"
					href="https://drive.google.com/uc?id=1batJ1VAiU_yXbdlHSFpoprebS8__ceQ0"
				/>
				<div className="container">
					<div className="row">
						<div className="col-12 header">
							<div className="row">
								<div className="col-2">
									<img
										className="img-fluid rounded-circle"
										src="https://www.w3schools.com/w3images/avatar2.png"
										alt=""
									/>
								</div>
								<div className="col-8 offset-md-1">
									<h1 className="h3 title">
										My Business
										<button className=" mx-2 btn btn-sm btn-secondary">follow</button>
									</h1>
									<p>
										<span className="mr-2 follower">
											<strong>600 </strong>followers
										</span>
										<span className="mx-2">
											<a href="#">
												<strong>200 </strong>review
											</a>
										</span>
									</p>
									<p>
										<img
											src="http://www.sclance.com/pngs/5-star-rating-png/5_star_rating_png_8434.png"
											alt="rating"
											height="22/"
											width="auto"
										/>
									</p>
									<p>
										Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio sunt veniam
										libero ut iste? Inventore, aspernatur aut repellendus corporis voluptas
										consequatur, dicta quibusdam nesciunt explicabo porro similique sunt architecto
										reprehenderit.
									</p>
									<button className="btn btn-sm btn-primary">new appointment</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}
