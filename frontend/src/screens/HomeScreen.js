import { useEffect, useReducer,} from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const reducer = (state, action) => { // async reducer function
  switch (action.type) {
    case 'FETCH_REQUEST': // request type
      return { ...state, loading: true };
    case 'FETCH_SUCCESS': //success type
      return { ...state, products: action.payload, loading: false }; // passing action.payload to products. Payload = details
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }; //passing action.payload to error
    default:
      return state;
  }
};
function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    /** Takes 2 params - an object and dispatch
         * object contains loading, error and products which are defined below
         * dispatch sends data
         * useReducer takes 2 params. 1. reducer and default values
         */
    products: [],
    loading: true,
    error: '',
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    /**
         * useEffect contains 2 params- 1. fetchData async function
         * 2. An empty array which helps render component only once
         */
    const fetchData = async () => {
      /**
           * dispatch sends fetch request to back end
           * if not err axios fetch data from backend using express url
           */
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        // sending success type with data
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        //sending err msg
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
      // setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>Amazonia</title>
      </Helmet>
      <h1>Featured Products</h1>
      <div className="products">

        {
          /**
                  Using ternary operator
                  1. If loading true render Loading... via LoadingBox
                  2. If there was an err render error via MessageBox
                  3. If success render products using map
                  4. using Row Col for responsiveness
                  */
          loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <Row>
              {products.map((product) => (
                // sm = small , md=medium. lg = large -- screen
                // slug is the unique identifying part of a web address,
                //typically at the end of the URL.
                <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                  <Product product={product}></Product>
                </Col>
              ))}
            </Row>
          )}
      </div>
    </div>
  );
}
export default HomeScreen;