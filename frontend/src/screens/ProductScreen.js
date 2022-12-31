import { useContext, useEffect, useReducer} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
//Bootstrap Component
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { Store } from '../Store';
import { toast } from 'react-toastify';

const reducer = (state, action) => {
  /**
     * defining reducer, 2 params state = react state, action = what action
     * Fetch 3 types of action request, success and fail , all case sensitive
     * 
     */
  switch (action.type) {
    case 'FETCH_REQUEST': // request type
      return { ...state, loading: true };
    case 'FETCH_SUCCESS': //success type hence no loading needed
      return { ...state, product: action.payload, loading: false }; // passing action.payload to products
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }; //passing action.payload to error
    default:
      return state;
  }
};
function ProductScreen() {
  /**
     * useParams() acts as req.params
     * deconstruct slug from params
     * here dealing with single product
     * everything else is same as HomeScreen
     */
  const navigate = useNavigate()
  const params = useParams();
  const { slug } = params;
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store) //dispatch as ctxDispatch. ctx=context
  const {cart} = state // deconstruct cart from state
  const addToCartHandler = async () => {
    /**
     * 1. if current product exists on cart or not
     * 2. if current product exists on cart increase quantity, else set quantity to 1
     * 3. fetch data from ajax request
     * 4. concate product with quantity by default set to 1
     * 5. A <Navigate> element changes the current location when it is rendered.
     */
    const existItem = cart.cartItems.find( (x) => x._id===product._id) // --- (1)
    const quantity = existItem? existItem.quantity + 1 : 1 // --- (2) 
    // const count = product.countInStock-quantity
    const {data} = await axios.get(`/api/products/${product._id}`) // --- (3)
    
    if (data.countInStock<quantity){
      // window.alert('Sorry! Product is out of stock')
      toast.error('Sorry! You have reached maximum limit for this product.')
      return;
    }
    ctxDispatch({  // --- (4)
      type: 'CART_ADD_ITEM', 
      payload: { ...product, quantity } 
    })
    navigate('/cart') // --- (5)
  }

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img
            className="img-large"
            src={product.image}
            alt={product.name}
          ></img>
        </Col>
        <Col md={3}>
          {/* Info column
        ListGroup works as html list and ListGroup.item works as List Item 
        variant="flush" removes outer borders and rounded corners
        */}
          <ListGroup variant="flush">
            {/* {info Card} */}
            <ListGroup.Item>
              {/* using helmet show product name as title on browser tab */}
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
            </ListGroup.Item>
            <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
            <ListGroup.Item>
              Description:
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          {/** 3rd column, A card with price and availability badge */}
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {/* Status */}
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? ( //Conditional rendering
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid"> {/* d-grid -> display utilities and new gap utilities */}
                      <Button onClick={addToCartHandler} variant="primary">Add to Cart</Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default ProductScreen;