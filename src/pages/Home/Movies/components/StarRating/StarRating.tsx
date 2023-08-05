import React from 'react';
import './StarRating.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

interface StarRatingProps {
    rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
    const filledStars = Math.floor(rating / 2);
    const halfStar = rating % 2 !== 0;
    const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);

    return (
        <div className="star-rating">
            {Array.from({ length: filledStars }, (_, index) => (
                <i key={index} className="fas fa-star filled" />
            ))}
            {halfStar && <i className="fas fa-star-half-alt half-filled" />}
            {Array.from({ length: emptyStars }, (_, index) => (
                <i key={index} className="far fa-star empty" />
            ))}
        </div>
    );
};

export default StarRating;