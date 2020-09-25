import React from "react";
import { Link } from "react-router-dom";
import './TravelCard.css';

const TravelCard = (props) => {
	const { title, imgUrl, id } = props.travelCard;
	return (
		<div className="col-md-4">
			<Link to={`/booking/${id}`}>
				<div className="cards img-container">
				    <img src={imgUrl} style={{ maxWidth: "100%" }} alt="" />
					<h3>{title}</h3>
				</div>
			</Link>
		</div>
	);
};

export default TravelCard;
