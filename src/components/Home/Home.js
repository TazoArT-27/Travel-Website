import React from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import fakeData from "../../fakeData/Details";
import TravelCard from "../TravelCard/TravelCard";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import "./Home.css";

const Home = () => {
	const history = useHistory();
	const travelCard = fakeData.slice(0, 3);

	const handleBooking = () => {
		history.push(`/booking/${travelCard[0].id}`);
	};

	return (
		<div className="page d-flex align-items-center">
			<div className="container">
				<div className="row">
					<div className="col-md-5">
						<div className="titles mb-md-0 mb-5">
							<h1>COX'S BAZAR</h1>
							<p>
								Cox's Bazar is a city, fishing port, tourism centre and district headquarters in
								southeastern Bangladesh. It is famous mostly for its long natural sandy beach, and it
								...
							</p>
							<Button variant="contained" style={{backgroundColor:"#fbbc04"}} onClick={handleBooking}>
							     Booking<ArrowForwardIcon></ArrowForwardIcon>
							</Button>
						</div>
					</div>
					<div className="col-md-7">
						<div className="cards-row">
							<div className="row">
								{travelCard.map((element) => (
									<TravelCard travelCard={element} key={element.id}></TravelCard>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
