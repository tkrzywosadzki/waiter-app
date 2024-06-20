import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import NotFound from './components/pages/NotFound/NotFound';
import TablePage from './components/pages/TablePage/TablePage';
import Header from './components/views/Header/Header';
import Footer from './components/views/Footer/Footer';
import { useDispatch } from 'react-redux';
import { fetchTables } from './redux/tablesRedux';
import { fetchStatus } from './redux/statusRedux';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchTables()), [dispatch]);
  useEffect(() => dispatch(fetchStatus()), [dispatch]);

  return (
    
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/table/:tableId" element={<TablePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Container>
    
  );
};

export default App;
