import { getAllTables } from "../../../redux/tablesRedux";
import { useSelector } from "react-redux";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


const Home = () => {
    const tables = useSelector((state) => getAllTables(state));
    return (
        <div>
            <Row className="mb-4">
                <Col>
                    <h1>All Tables</h1>
                </Col>
            </Row>
            <Row>
                <Col className="p-0">
                    {tables.map(table => (
                        <Card key={tables.id} className="mb-4 border-0 border-bottom">
                            <Card.Body className="d-flex justify-content-between">
                                <div>
                                    <Card.Title className="h2">Table {table.id}</Card.Title>
                                </div>
                                <div className="me-auto mx-4">
                                    <span><b>Status:</b></span> {table.status}
                                </div>
                                <Link to={`/table/${table.id}`}>
                                    <Button>Show more</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>
            </Row>
        </div>
    )
}

export default Home;