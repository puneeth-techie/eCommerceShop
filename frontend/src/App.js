import React from 'react';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
    <Header />
      <main className="py-3">
        <Container>
          <HomeScreen />
        </Container>
      </main>
    <Footer />
    </>
  );
}

export default App;
