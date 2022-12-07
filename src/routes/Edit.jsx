import { Card, Col, Container, Row } from 'react-bootstrap';
import NavbarHeader from '../components/NavbarHeader';
import { Form, Button, FloatingLabel, Alert } from "react-bootstrap";
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProductById, getStatus, updateProduct } from '../state/productSlice';
import { constant } from '../utils/constant';

function Edit() {
    const categoryOption = constant.categoryOption;
    const params = useParams();
    const response = useSelector(getStatus);
    const detail = useSelector((state) => getProductById(state, params?.id));
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [disabledUpdate, setDisabledUpdate] = useState(true);
    const [disabledDelete, setDisabledDelete] = useState(true);
    const [alertShow, setAlertShow] = useState(false);
    const [id, setId] = useState("");
    const [sku, setSKU] = useState("");
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

        onDetail();
        
    }, [response, detail])

    const onDetail = () => {

        setId(detail?._id);
        setSKU(detail?.sku);
        setName(detail?.name);
        setDescription(detail?.description);
        setImage(detail?.image);
        setWeight(detail?.weight);
        setWidth(detail?.width);
        setLength(detail?.length);
        setHeight(detail?.height);
        setPrice(detail?.harga);
        setCategory({
            id: detail?.CategoryId,
            label: detail?.categoryName
        });

        setDisabledUpdate(false);
        setDisabledDelete(false);
    }

    const onDelete = async () => {
        setDisabledDelete(true);

        dispatch(deleteProduct({id}));

        setAlertShow(true);

        setDisabledDelete(false);
    }

    const onUpdate = async () => {
        setDisabledUpdate(true);

        dispatch(updateProduct({
            id,
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

        setAlertShow(true);

        setDisabledUpdate(false);
    }

    return (
        <>
            <Container className='mt-3'>
                <Card>
                    <Card.Header>
                        <h5 className='my-2'>
                            Edit Product
                        </h5>
                    </Card.Header>
                    <Card.Body>

                        {alertShow ? (
                            <Alert variant={alert?.type} onClose={() => setAlert({ show: false })} dismissible>
                                {alert?.message}
                            </Alert>
                        ) : null}

                        {loading ? (
                            <EmptyState
                                icon={<h1>🎁</h1>}
                                title="Getting a product ..."
                                description="We hope you like it"
                            />
                        ) : (
                            <>
                                <FloatingLabel label="ID" className='mb-3'>
                                    <Form.Control value={id} type="text" disabled />
                                </FloatingLabel>
                                <Row>
                                    <Col lg={8}>
                                        <FloatingLabel label="Name" className='mb-3'>
                                            <Form.Control value={name} type="text" placeholder="Password" onChange={(e) => setName(e.target.value)} />
                                        </FloatingLabel>
                                    </Col>
                                    <Col lg={4}>
                                        <FloatingLabel label="Category" className='mb-3'>
                                            <Form.Select defaultValue={category?.id} aria-label="Default select example" onChange={onSelectCategory}>
                                                <option value={-1} disabled>Open this select menu</option>
                                                {categoryOption.map((item, i) => (
                                                    <option key={i} value={item.id}>{item.label}</option>
                                                ))}
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Col>
                                </Row>

                                <FloatingLabel label="Description" className='mb-3'>
                                    <Form.Control value={description} type="text" onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                                </FloatingLabel>

                                <Row>
                                    <Col lg={3}>
                                        <FloatingLabel label="Weight" className='mb-3'>
                                            <Form.Control value={weight} type="number" onChange={(e) => setWeight(e.target.value)} min={0} placeholder="Weight" />
                                        </FloatingLabel>
                                    </Col>
                                    <Col lg={3}>
                                        <FloatingLabel label="Width" className='mb-3'>
                                            <Form.Control value={width} type="number" onChange={(e) => setWidth(e.target.value)} min={0} placeholder="Weight" />
                                        </FloatingLabel>
                                    </Col>
                                    <Col lg={3}>
                                        <FloatingLabel label="Length" className='mb-3'>
                                            <Form.Control value={length} type="number" onChange={(e) => setLength(e.target.value)} min={0} placeholder="Length" />
                                        </FloatingLabel>
                                    </Col>
                                    <Col lg={3}>
                                        <FloatingLabel label="Height" className='mb-3'>
                                            <Form.Control value={height} type="number" onChange={(e) => setHeight(e.target.value)} min={0} placeholder="Height" />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={9}>
                                        <FloatingLabel label="Price" className='mb-3'>
                                            <Form.Control value={price} type="number" onChange={(e) => setPrice(e.target.value)} min={0} placeholder="Price" />
                                        </FloatingLabel>
                                    </Col>
                                    <Col lg={3}>
                                        <FloatingLabel label="SKU" className='mb-3'>
                                            <Form.Control value={sku} onChange={(e) => setSKU(e.target.value)} type="text" />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <FloatingLabel label="Image URL" className='mb-3'>
                                    <Form.Control value={image} type="text" onChange={(e) => setImage(e.target.value)} min={0} placeholder="Image URL" />
                                </FloatingLabel>
                            </>
                        )}
                    </Card.Body>

                    <Card.Footer className='d-flex justify-content-between'>
                        <Link to="/" className="btn btn-secondary btn-lg">
                            Home
                        </Link>
                        <div className='d-flex gap-2'>
                            <Button variant="primary" type="submit" size='lg' disabled={disabledUpdate} onClick={onUpdate}>
                                Update
                            </Button>
                            <Button variant="danger" type="button" size='lg' disabled={disabledDelete} onClick={onDelete}>
                                Delete
                            </Button>
                        </div>

                    </Card.Footer>
                </Card>
            </Container>
        </>
    );
}

export default Edit;
