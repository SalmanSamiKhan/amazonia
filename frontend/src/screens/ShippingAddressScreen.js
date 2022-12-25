import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Store } from '../Store'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'

export default function ShippingAddressScreen() {
    const {state, dispatch:ctxDispatch} = useContext(Store)
    const {userInfo, cart:{shippingAddress}} = state
    // const {cart:{cartItems}} = state
    const navigate = useNavigate()
    const [fullName, setFullName] = useState(shippingAddress.fullName||'')
    const [address, setAddress] = useState(shippingAddress.address||'')
    const [city, setCity] = useState(shippingAddress.city||'')
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode||'')
    const [country, setCountry] = useState(shippingAddress.country||'')
    // After logging out userinfo is reset
    useEffect(()=>{
        if(!userInfo){
            navigate('/signin?redirect=/shipping')
        }
    },[userInfo,navigate])
    const handleSubmit = (e) => {
        e.preventDefault()
        ctxDispatch({type:'SAVE_SHIPPING_ADDRESS',
        payload:{
            fullName, address, city, postalCode, country
        }
    })
    localStorage.setItem('shippingAddress', JSON.stringify({
        fullName, address, city, postalCode, country
    }))
    navigate('/payment')
    }
    return (
        <div>
            <Helmet>
                <title>Shipping Address</title>
            </Helmet>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <div className="container small-container">
                <h1 className='my-3'>Shipping Address</h1>
                <Form onSubmit={handleSubmit} >
                    <Form.Group className='mb-3' controlId='fullName'>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            value={fullName}
                            onChange={e => setFullName(e.target.value)}
                            required
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='fullName'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            required
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='fullName'>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            required
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='fullName'>
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                            value={postalCode}
                            onChange={e => setPostalCode(e.target.value)}
                            required
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='fullName'>
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                            required
                        ></Form.Control>
                    </Form.Group>
                    <div className="mb-34">
                        <Button variant='primary' type='submit'>
                            Continue
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}
