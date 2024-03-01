import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import './Reviewpopup.css';

const StarRating = ({ bikeId, userEmail }) => {
  const [clickedRating, setClickedRating] = useState(() => {
    const storedRating = localStorage.getItem(`rating-${bikeId}`);
    return storedRating ? parseInt(storedRating, 10) : 0;
  });

  const [isRatingSelected, setIsRatingSelected] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [reviewText, setReviewText] = useState('');

  const handleClick = (star) => {
    if (clickedRating !== 0) {
      return;
    }
    setClickedRating(star);
    setIsRatingSelected(true);
    setIsPopupOpen(true);
    localStorage.setItem(`rating-${bikeId}`, star.toString());
  };
  const handlePopupDone = async () => {
    setIsPopupOpen(false);
  
    // If the user clicks "Cancel," set the default description to "good"
    const descriptionToSave = reviewText.trim() === '' ? ['good'] : [reviewText];
  
    // Convert userEmail to an array
    const userEmailToSave = [userEmail];
  
    // Call the API to submit the review
    await submitReview(descriptionToSave, userEmailToSave);
  
    // Reset the state or perform any other necessary actions
    setReviewText('');
  };

  const handlePopupCancel = () => {
    setIsPopupOpen(false);

    // If the user clicks "Cancel," set the default description to "good"
    const descriptionToSave = ['good'];

    // Convert userEmail to an array
    const userEmailToSave = [userEmail];

    // Call the API to submit the review
    submitReview(descriptionToSave, userEmailToSave);

    // Reset the state or perform any other necessary actions
    setReviewText('');
  };

  const submitReview = async (description, userEmail) => {
    try {
      const response = await fetch('http://localhost:5000/api/submit-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating: clickedRating,
          bikeId,
          description,
          userEmail,
        }),
      });

      if (response.ok) {
        console.log('Review submitted successfully.');
        // Reset the state or perform any other necessary actions
      } else {
        console.error('Error submitting review.');
        // Handle error scenario
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      // Handle error scenario
    }
  };

  useEffect(() => {
    localStorage.setItem(`rating-${bikeId}`, clickedRating.toString());
  }, [clickedRating, bikeId]);
  const handleReset = () => {
    setClickedRating(0);
    setIsRatingSelected(false);
    localStorage.removeItem(`rating-${bikeId}`);
  };
  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <FaStar
            key={index}
            className="star"
            color={(clickedRating) >= starValue ? '#ffc107' : '#e4e5e9'}
            size={25}
            onClick={() => handleClick(starValue)}
          />
        );
      })}
      {isPopupOpen && (
        <div className="popup">
          <textarea
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <button onClick={handlePopupDone}>Done</button>
          <button onClick={handlePopupCancel}>Cancel</button>
        </div>
        
      )}

        <button onClick={handleReset}>Reset Rating</button>

    </div>
  );
};

export default StarRating;
