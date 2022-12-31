import { useContext } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup'
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import MessageBox from '../components/MessageBox';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/esm/Card';
import axios from 'axios';
export default function CartScreen() {
    /**
     * 1. Deconstruct state dispatch as ctxDispatch
     * 2. Deconstruct cart and cartItems from state. Loop deconstruct
     */
    const navigate = useNavigate()
    const { state, dispatch: ctxDispatch} = useContext(Store) // --- (1)
    const { cart: { cartItems } } = state // --- (2)
    const updateCartHandler = async (item, quantity)=>{
        const {data} = await axios.get(`/api/products/${item._id}`)
        if (data.countInStock<quantity){
            window.alert('Sorry! You have reached maximum limit for this product.')
            return;
          }
          ctxDispatch({  // --- (4)
            type: 'CART_ADD_ITEM', 
            payload: { ...item, quantity} 
          })
    }

    const removeItemHandler = (item)=>{
        ctxDispatch({type: 'CART_REMOVE_ITEM', payload:item}) // sending remove request to Store.js
    }

    const checkoutHandler = ()=> {
        navigate('signin?redirect=/shipping');
    }

    return (
        <div>
            <Helmet>
                <title>Shopping Cart</title>
            </Helmet>
            <h1>Shopping Cart</h1>
            <Row>
                <Col md={8}>
                    {cartItems.length === 0 ? (
                        <MessageBox>Cart is Empty. <Link to='/'>Go Shopping</Link></MessageBox>
                    )
                        : <ListGroup>
                            {cartItems.map(item => (
                                <ListGroup.Item>
                                    <Row className='align-items-center'>
                                        <Col md={4}>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className='img-fluid rounded img-thumbnail' ></img>{' '}
                                            <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={3}>
                                            <Button 
                                                onClick={() => updateCartHandler(item, item.quantity - 1)}
                                                variant='light' disabled={item.quantity === 1}
                                                >
                                                <i className='fas fa-minus-circle'></i>
                                            </Button>{' '}
                                            <span>{item.quantity}</span>{' '}
                                            <Button variant='light'
                                                onClick={() => updateCartHandler(item, item.quantity + 1)}
                                                disabled={item.quantity === item.countInStock}
                                                >
                                                <i className='fas fa-plus-circle'></i>
                                            </Button>
                                        </Col>
                                        <Col md={3}>${item.price}</Col>
                                        <Col md={2}>
                                            <Button 
                                            onClick={()=>removeItemHandler(item)}
                                            variant='light'
                                            >
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    }
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>
                                        Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                                        items) : $
                                        {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                                    </h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="d-grid">
                                        <Button type='button' variant='primary' onClick={checkoutHandler} disabled={cartItems.length === 0}>
                                            Proceed to Checkout</Button>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}