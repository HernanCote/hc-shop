import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';

const App = () => (
    <Router>
        <Header />
        <main className="py-3">
            <Container>
                <Route path="/" component={Home} exact />
                <Route path="/product/:id" component={Product} />
                <Route path="/cart/:id?" component={Cart} />
            </Container>
        </main>
        <Footer />
    </Router>
);

export default App;
