import { Link } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Rating from "./Rating"
import axios from "axios"
import { useContext} from "react"
import { Store } from "../Store"


function Product(props) {
    /**
     * destruct product from props
     * Using react Card component
     * Link is used in place of <a>. Link prevents refreshing single page react app
     * Link use to="" instead of href="",
     * addToCartHandler() for adding products to cart from home screen
     * Card.Body, Card.Title are react bootstrap component
     * 1. copied from cartScreen.js
     */
    const { product } = props

    const { state, dispatch: ctxDispatch } = useContext(Store) // copied from cartScreen.js
    const {
        cart: { cartItems },
    } = state;

    const addToCartHandler = async (item) => { // copied from cartScreen.js
        const { data } = await axios.get(`/api/products/${item._id}`)
        const existItem = cartItems.find((x) => x._id === product._id) // copied from ProductScreen.js
        const quantity = existItem ? existItem.quantity + 1 : 1 // copied from ProductScreen.js
        // const countInStock = existItem ? product.countInStock - existItem.quantity : product.countInStock
        // item.countInStock--;
        console.log('quantity: '+quantity)
        console.log('stock: '+data.countInStock)
        if (product.countInStock < quantity) {
            window.alert('Sorry! Out of stock')
            return;
        }
        ctxDispatch({  // --- (4)
            type: 'CART_ADD_ITEM',
            payload: { ...item, quantity }
        })
        // ctxDispatch({  // --- (4)
        //     type: 'CART_ADD_ITEM',
        //     payload: { ...item, countInStock }
        // })
    }
    console.log('product stock: '+product.countInStock)
    return (
        <Card>
            <Link to={`product/${product.slug}`}>
                <img src={product.image} className="card-img-top" alt={product.name} />
            </Link>
            <Card.Body>
                <Link to={`product/${product.slug}`}>
                    <Card.Title>{product.name}</Card.Title>
                </Link>
                <Rating rating={product.rating} numReviews={product.numReviews} />
                <Card.Text><strong>${product.price}</strong></Card.Text>
                <Card.Text><strong>{product.countInStock}</strong></Card.Text>
                {/* Check if out of stock */}
                {product.countInStock < product.quantity ? (
                    <Button variant="light" disabled>
                        Out of stock
                    </Button>
                ) : (
                    <Button onClick={() => addToCartHandler(product)}>Add to cart</Button>
                )}
            </Card.Body>
        </Card>
    )
}
export default Product