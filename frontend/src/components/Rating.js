function Rating(props) {
  const { rating, numReviews } = props;
  return (
    <div className="one-line-parent">
      <div className="rating">
        <div className="one-line-child">
          <span>
            <i
              className={
                rating >= 1
                  ? "fas fa-star"
                  : rating >= 0.5
                  ? "fas fa-star-half-alt"
                  : "far fa-star"
              }
            />
          </span>
          <span>
            <i
              className={
                rating >= 2
                  ? "fas fa-star"
                  : rating >= 1.5
                  ? "fas fa-star-half-alt"
                  : "far fa-star"
              }
            />
          </span>
          <span>
            <i
              className={
                rating >= 3
                  ? "fas fa-star"
                  : rating >= 2.5
                  ? "fas fa-star-half-alt"
                  : "far fa-star"
              }
            />
          </span>
          <span>
            <i
              className={
                rating >= 4
                  ? "fas fa-star"
                  : rating >= 3.5
                  ? "fas fa-star-half-alt"
                  : "far fa-star"
              }
            />
          </span>
          <span>
            <i
              className={
                rating >= 5
                  ? "fas fa-star"
                  : rating >= 4.5
                  ? "fas fa-star-half-alt"
                  : "far fa-star"
              }
            />
          </span>
        </div>

        <div className="one-line-child">
          <span className="turquoise">
         &nbsp;{numReviews}
          </span>
        </div>
      </div>
    </div>
  );
}
export default Rating;
