import { useDispatch, useSelector } from "react-redux";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { getTableById } from "../../../redux/tablesRedux";
import { getStatus } from "../../../redux/statusRedux";
import { useState, useEffect } from "react";
import { editTableRequest } from "../../../redux/tablesRedux";
import { Form, Row, Col, InputGroup, Button, Spinner} from "react-bootstrap";



const TablePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { tableId } = useParams();
    const tableData = useSelector(state => getTableById(state, tableId));
    const statusData = useSelector(getStatus)

    // //states
    const [status, setStatus] = useState(tableData.status || '');
    const [peopleAmount, setPeopleAmount] = useState(tableData.peopleAmount || '0');
    const [maxPeopleAmount, setMaxPeopleAmount] = useState(tableData.maxPeopleAmount || '');
    const [bill, setBill] = useState(tableData.bill || '0');
    const [showBill, setShowBill] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // nie uzywac time outa tylko bazowac na fetchu


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        await dispatch(editTableRequest({ id: tableId, status, peopleAmount, maxPeopleAmount, bill }));
        setTimeout(() => {
            setIsSubmitting(false);
            navigate('/');
        }, 500);
    };

    const handleStatus = (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        if (newStatus === "Busy") {
            setShowBill(true);
            setBill('0');
        } else {
            setShowBill(false);
            setPeopleAmount(tableData.peopleAmount);
        };
    };

    const handlePeople = (e) => {  
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 0 && value <= 10 && value < parseInt(maxPeopleAmount)) {
            setPeopleAmount(value.toString());
        }
    };

    const handleMaxPeople = (e) => {
        const value = parseInt(e.target.value);
        const currentPeopleAmount = parseInt(peopleAmount);
        if (!isNaN(value) && value >= 0 && value <= 10) {
            setMaxPeopleAmount(value.toString());
            if (currentPeopleAmount > value) {
                setPeopleAmount(value.toString());
            }
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timeout);
    }, [tableData]);

    if (loading || isSubmitting) {
        return (
            <div>
                <Spinner animation="border" variation="primary" />
                <span>Loading...</span>
            </div>
        )
    }


    if(!tableData) return <Navigate to='/' />

    return(
        <Form onSubmit={handleSubmit} style={{ width: '30%'}}>
            <h1 className="mb-4">Table {tableData.id}</h1>
            <Row className="mb-4">
                <Col><b>Status: </b></Col>
                <Col xs="auto" lg="8">
                    <Form.Select value={status} onChange={handleStatus}>
                        {statusData.map(({ id, name }) => (
                            <option key={id} value={name}>{name}</option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col xs="4"><b>People: </b></Col>
                <Col xs="auto">
                    <InputGroup><Form.Control style={{ maxWidth: '50px', marginRight: '-30px' }} value={peopleAmount} onChange={handlePeople}></Form.Control></InputGroup>
                </Col>
                <Col xs="auto">
                    <InputGroup.Text className="border-0 bg-transparent" >/</InputGroup.Text>
                </Col>
                <Col xs="auto">
                    <InputGroup><Form.Control style={{ maxWidth: '50px', marginLeft: '-30px' }} value={maxPeopleAmount} onChange={handleMaxPeople}></Form.Control></InputGroup>
                </Col>
            </Row>
            {(showBill || status === 'Busy') ? (
                <Row className="mb-4">
                    <Col xs="4"><b>Bill: </b></Col>
                    <Col xs="auto">
                        <InputGroup.Text className="border-0 bg-transparent" style={{ marginRight: '-30px' }}>$</InputGroup.Text>
                    </Col>
                    <Col xs="auto">
                        <InputGroup><Form.Control style={{ maxWidth: '50px' }} value={bill} onChange={e => setBill(e.target.value)}></Form.Control></InputGroup>
                    </Col>
                </Row>
            ) : '' }
            <Button type="submit">Update</Button>
        </Form>
    )
}

export default TablePage;

