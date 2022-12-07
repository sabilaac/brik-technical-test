import { Card, Col, Container, Row } from 'react-bootstrap';
import { Form, Button, FloatingLabel, Alert } from "react-bootstrap";
import { useEffect, useState } from 'react';
import { helper } from '../utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, getStatus } from "../state/productSlice";
import { constant } from '../utils/constant';

function Create() {
    const categoryOption = constant.categoryOption;
    const response = useSelector(getStatus);
    const dispatch = useDispatch();
    const [alertShow, setalertShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sku, setSKU] = useState(helper.createSKU());
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [weight, setWeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [length, setLength] = useState(0);
    const [height, setHeight] = useState(0);
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState({
        id: -1,
        label: null,
    });
    const [alert, setAlert] = useState({
        show: false,
        message: null,
        type: null,
    });

    const onSelectCategory = (e) => {
        const id = parseInt(e.target.value);
        const label = categoryOption.find((item) => item?.id === id).label;

        setCategory({ id, label });
    }

    useEffect(() => {
        setLoading(response?.status === "loading");
        
        setAlert({
            message: response?.message,
            type: response?.success ? "success" : "warning",
        });
        
    }, [response])

    const onCreate = async (e) => {
        e.preventDefault();

        dispatch(addProduct({
            CategoryId: category?.id,
            categoryName: category?.label,
            sku,
            name,
            description,
            weight: parseInt(weight),
            width: parseInt(width),
            length: parseInt(length),
            height: parseInt(height),
            image,
            harga: price,
        }));

        setalertShow(true)
    }
    return (
        <>
            <Container className='mt-3'>
                <Form onSubmit={onCreate}>
                    <Card>
                        <Card.Header>
                            <h5 className='my-2'>
                                Add New Product
                            </h5>
                        </Card.Header>
                        <Card.Body>
                            {alertShow ? (
                                <Alert variant={alert?.type} onClose={() => setAlert({ show: false })} dismissible>
                                    {alert?.message}
                                </Alert>
                            ) : null}
                           <Row>
                                    <Col lg={8}>
                                        <FloatingLabel label="Name" className='mb-3'>
                                            <Form.Control type="text" onChange={(e) => setName(e.target.value)} placeholder="Name"/>
                                        </FloatingLabel>
                                    </Col>
                                    <Col lg={4}>
                                        <FloatingLabel label="Category" className='mb-3'>
                                            <Form.Select defaultValue={-1} onChange={onSelectCategory}>
                                                <option value={-1} disabled>Select category</option>
                                                {categoryOption.map((item, i) => (
                                                    <option key={i} value={item.id}>{item.label}</option>
                                                ))}
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Col>
                                </Row>

                                <FloatingLabel label="Description" className='mb-3'>
                                    <Form.Control type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
                                </FloatingLabel>

                                <Row>
                                    <Col lg={3}>
                                        <FloatingLabel label="Weight" className='mb-3'>
                                            <Form.Control type="number" placeholder="Weight" onChange={(e) => setWeight(e.target.value)} min={0} />
                                        </FloatingLabel>
                                    </Col>
                                    <Col lg={3}>
                                        <FloatingLabel label="Width" className='mb-3'>
                                            <Form.Control type="number" placeholder="Width" onChange={(e) => setWidth(e.target.value)} min={0} />
                                        </FloatingLabel>
                                    </Col>
                                    <Col lg={3}>
                                        <FloatingLabel label="Length" className='mb-3'>
                                            <Form.Control type="number" placeholder="Length" onChange={(e) => setLength(e.target.value)} min={0} />
                                        </FloatingLabel>
                                    </Col>
                                    <Col lg={3}>
                                        <FloatingLabel label="Height" className='mb-3'>
                                            <Form.Control type="number" placeholder="Height" onChange={(e) => setHeight(e.target.value)} min={0} />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={9}>
                                        <FloatingLabel label="Price" className='mb-3'>
                                            <Form.Control type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} min={0} />
                                        </FloatingLabel>
                                    </Col>
                                    <Col lg={3}>
                                        <FloatingLabel label="SKU" className='mb-3'>
                                            <Form.Control onChange={(e) => setSKU(e.target.value)} value={sku} placeholder="SKU" type="text" />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <FloatingLabel label="Image URL" className='mb-3'>
                                    <Form.Control type="text" onChange={(e) => setImage(e.target.value)} min={0} placeholder="Image URL" />
                                </FloatingLabel>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="primary" type="submit" size='lg' disabled={loading}>
                                {loading ? "Creating" : "Create"}
                            </Button>
                        </Card.Footer>
                    </Card>
                </Form>
            </Container>
        </>
    );
}

export default Create;
