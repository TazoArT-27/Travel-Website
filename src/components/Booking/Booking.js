import React from "react";
import { Button } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import fakeData from "../../fakeData/Details";
import "../Booking/Booking.css";

const Booking = () => {
	const history = useHistory();
	const handleLogin = () => {
		history.push("/destination");
	};

	const { id } = useParams();

	const booking = fakeData.find((element) => element.id === id);
	const { title, detail } = booking;

	return (
		<main className="page d-flex align-items-center">
			<div className="container">
				<div className="row align-items-center">
					<div className="col-lg-6">
						<div className="titles">
							<h1>{title}</h1>
							<p>{detail}</p>
						</div>
					</div>
					<div className="col-lg-6">
						<div className="bookingForm">
							<div className="">
								<div className="form-group">
									<label>Origin</label>
									<input type="text" className="form-control" placeholder="enter a city name" />
								</div>
								<div className="form-group">
									<label>Destination</label>
									<input type="text" className="form-control" placeholder="enter a city name" />
								</div>
								<div className="form-group row booking-date">
									<div className="col-6">
										<label htmlFor="date-input">From</label>
										<input className="form-control" type="date" id="dateFrom" />
									</div>
									<div className="col-6">
										<label htmlFor="dateTo">To</label>
										<input className="form-control" type="date" id="dateTo" />
									</div>
								</div>
								<Button variant="contained" onClick={handleLogin} type="submit" style={{backgroundColor:"#fbbc04"}} className="btn">
								    Start Booking
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Booking;
