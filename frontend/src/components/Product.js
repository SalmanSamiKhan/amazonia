import { Link } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Rating from "./Rating"

function Product(props) {
    /**
     * destruct product from props
     * Using react Card component
     * Link is used in place of <a>. Link prevents refreshing single page react app
     * Link use to="" instead of href="",
     * 
     * Card.Body, Card.Title are react bootstrap component
     */
    const { product } = props
    return (
        <Card>
            <Link to={`product/${product.slug}`}>
                <img src={product.image} className="card-img-top" alt={product.name} />
            </Link>
            <Card.Body> 
                <Link to={`product/${product.slug}`}>
                    <Card.Title>{product.name}</Card.Title> 
                </Link>
                <Rating rating={product.rating} numReviews={product.numReviews}/>
                <Card.Text><strong>${product.price}</strong></Card.Text>
                <Button variant="primary">Add to Cart</Button>
            </Card.Body>
        </Card>
    )
}
export default Product