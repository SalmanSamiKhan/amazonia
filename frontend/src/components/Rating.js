function Rating(props) {
    /**
     * destruct rating numReviews from props
     * 
     */
    const { rating, numReviews } = props
    return (
        <div className="rating">
            <span>
                <i className={
                    /**
                    If Rating is more than 1
                    show 1 solid star fas- font aweome solid, fa - font awesome,
                    If rating less than 1
                    show half empty star by fas fa-star-half-alt
                    Repeat this for 2, 2.5, 3, 3.5 and so on...
                     */
                    rating >= 1
                        ? 'fas fa-star'
                        : rating >= 0.5 
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'
                } ></i>
                <i className={
                    rating >= 2
                        ? 'fas fa-star'
                        : rating >= 1.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'
                } ></i>
                <i className={
                    rating >= 3
                        ? 'fas fa-star'
                        : rating >= 2.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'
                } ></i>
                <i className={
                    rating >= 4
                        ? 'fas fa-star'
                        : rating >= 3.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'
                } ></i>
                <i className={
                    rating >= 5
                        ? 'fas fa-star'
                        : rating >= 4.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'
                } ></i>
            </span>
            <span style={{color:'black'}}> (  {numReviews} reviews ) </span>
        </div>
    )
}
export default Rating