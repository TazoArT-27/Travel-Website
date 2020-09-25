import React from "react";
import './Hotels.css';
import StarIcon from '@material-ui/icons/Star';

const HotelCard = (props) => {
	const { title, guests, bedrooms, beds, baths, info1, info2, ratings, totalRating, price, imgUrl } = props.hotel;
	return (
		<div className="information-part d-flex my-4 align-items-lg-center">
			<div className="mr-4">
				<img src={imgUrl} alt="" style={{ maxWidth: "280px" }} />
			</div>
			<div className="details">
				<h4 className="details-title">{title}</h4>
				<p>{guests} guests {bedrooms} bedrooms {beds} beds {baths} baths</p>
				<p>{info1}</p>
				<p>{info2}</p>
				<p className="ratings d-flex">
					<small>
					    
						<strong className="rating-digit">
						<StarIcon fontSize="small" style={{ color: 'orange'}}></StarIcon>
							{ratings} ({totalRating})
						</strong>
					</small>
					<strong className='ml-3'>${price}/night</strong>
					<small className="text-muted ml-3">
					    $167 total
					</small>
				</p>
			</div>
		</div>
	);
};

export default HotelCard;
