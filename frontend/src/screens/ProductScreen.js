import axios from "axios"
import { useEffect, useReducer } from "react"
import { useParams } from "react-router-dom"
import Rating from "../components/Rating"
import { Helmet } from "react-helmet-async"
//React Bootstrap imports
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

const reducer = (state, action) => {
    /**
     * defining reducer, 2 params state = react state, action = what action
     * Fetch 3 types of action request success and fail , all case sensitive
     * 
     */
    switch (action.type) {
        case 'FETCH_REQUEST': // request type
            return ({ ...state, loading: true })

        case 'FETCH_SUCCESS': //success type hence no loading needed
            return ({ ...state, product: action.payload, loading: false }) // passing action.payload to products

        case 'FETCH_FAIL':
            return ({ ...state, loading: false, error: action.payload }) //passing action.payload to error

        default:
            return state;
    }
}
function ProductScreen() {
    /**
     * useParams() acts as req.params
     * destruct slug from params
     * here dealing with single product
     * everything else is same as HomeScreen
     */
    const params = useParams()
    const { slug } = params
    const [{ loading, error, product }, dispatch] = useReducer(reducer, {
        product: [],
        loading: true,
        error: ''
    })
    // const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' })
            try {
                const result = await axios.get(`/api/products/slug/${slug}`)

                dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
            } catch (err) {
                dispatch({ type: 'FETCH_REQUEST', payload: err.message })
            }
            // setProducts(result.data)
        };
        fetchData();
    }, [slug]) // ???
    return (
        loading ? <div>Loading...</div>
            : error ? <div>{error}</div>
                :
                <Row>
                    {/* image column */}
                    <Col md={6}>
                        <img className="img-large" src={product.image} alt={product.name} />
                    </Col>
                    <Col md={3} >
                        {/* Info column
            ListGroup works as list and ListGroup.item===List Item 
        variant="flush" removes outer borders and rounded corners
        */}
                        <ListGroup variant="flush">
                            {/* Info Card */}
                            <ListGroup.Item>
                            {/* using helmet show product name as title on browser tab */}
                            <Helmet>
                             <title>{product.name}</title>
                             </Helmet>
                             <h1>{product.name}</h1>
                             </ListGroup.Item>
                            <ListGroup.Item><Rating rating={product.rating} numReviews={product.numReviews} /></ListGroup.Item>
                            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                            <ListGroup.Item>Description: <p> {product.description} </p></ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        {/** 3rd column, A card with price and availability badge */}
                        <Card>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        {/* Price */}
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>{product.price}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        {/* Status */}
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>{product.countInStock ? //Conditional rendering
                                                <Badge bg="success">In Stock</Badge> :
                                                <Badge bg="danger">Out of Stock</Badge>
                                            }</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        {/* d-grid -> display utilities and new gap utilities */}
                                        <div className="d-grid">
                                            <Button variant="primary">Add to Cart</Button>
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

    )
}
export default ProductScreen