import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Navbar from 'react-bootstrap/Navbar'
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from './Store';
function App() {
  const { state} = useContext(Store) //dispatch as ctxDispatch. ctx=context
  const {cart} = state
  return (
    <BrowserRouter>
    {/* d-flex = display flex */}
      <div className="d-flex flex-column site-container"> 
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>amazonia</Navbar.Brand>
              </LinkContainer>
              {/* Cart Item number on navbar */}
              <Nav className="me-auto">
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.length}
                    </Badge>
                  )}
                </Link>
              </Nav>
            </Container>
          </Navbar>
        </header>

        <main>
        {/* Container Component provides a way to center and horizontally pad the contents */}
          <Container className='mt-3'>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/product/:slug" element={<ProductScreen />} />
            </Routes>
          </Container>
        </main>
        
        <footer>
          <div className="text-center">All rights reserved </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
