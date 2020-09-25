import React from "react";
import { hotels } from "../../fakeData/hotels";
import HotelCard from "../Hotels/Hotels";
import './Destination.css';
import Map from "../Map/Map";

const Destination = () => {
	return (
		<div className="travel-spot container">
			<div className="hotel-info text-left pt-3">
				<h4>252 stays Apr 13-17 3 guests</h4>
				<h3>Stay in Cox’s Bazar</h3>
			</div>
			<div className="row">
				<div className="col-7">
					<div className="hotel-card-wrap mb-lg-0 mb-4">
						{hotels.map((hotel) => (
							<HotelCard hotel={hotel}></HotelCard>
						))}
					</div>
				</div>
				<div className="col-5">
					<Map></Map>
				</div>
			</div>
		</div>
	);
};

export default Destination;
