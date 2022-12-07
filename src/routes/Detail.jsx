import { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { TbEdit, TbShoppingCart } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import { getProductById, getStatus } from "../state/productSlice";

function Detail() {
    const params = useParams();
    const status = useSelector(getStatus);
    const detail = useSelector((state) => getProductById(state, params?.id));
    const [loading, setLoading] = useState(true);

    const onBuy = () => {
        alert(`Yeay... You are buying ${detail?.name}`);
    }

    setTimeout(() => {
        setLoading(false)
    }, 150)

    useEffect(() => {
        setLoading(status?.status === "loading");
    }, [detail, status])

    return (
        <>
            <Container className="flex-fill mt-3">
                {loading ? (
                    <EmptyState
                        icon={<h1>🎁</h1>}
                        title="Getting a product ..."
                        description="We hope you like it"
                    />
                ) : (
                    <Row>
                        <Col lg={4}>
                            <div className="position-relative bg-white border rounded overflow-hidden position-sticky mb-3" style={{ aspectRatio: 1 / 1, top: "1.5rem" }}>
                                <Image
                                    src={detail?.image}
                                    alt="Thumbnail"
                                    className="w-100 h-100"
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                        </Col>
                        <Col lg={8}>
                            <h5>
                                {detail?.name}
                            </h5>
                            <span className="text-muted">
                                {detail?.categoryName}
                            </span>
                            <h4 className="text-warning">
                                Rp. {detail?.harga},-
                            </h4>
                            <div className="my-3 border-top pt-3">
                                <b>
                                    Info
                                </b>
                                <Row>
                                    <Col xs={5} lg={3}>
                                        No SKU
                                    </Col>
                                    <Col xs={7} lg={9}>
                                        {detail?.sku}
                                    </Col>
                                    <Col xs={5} lg={3}>
                                        Weight
                                    </Col>
                                    <Col xs={7} lg={9}>
                                        {detail?.weight} gram
                                    </Col>
                                    <Col xs={5} lg={3}>
                                        Height
                                    </Col>
                                    <Col xs={7} lg={9}>
                                        {detail?.height} mm
                                    </Col>
                                    <Col xs={5} lg={3}>
                                        Width
                                    </Col>
                                    <Col xs={7} lg={9}>
                                        {detail?.width} mm
                                    </Col>
                                    <Col xs={5} lg={3}>
                                        Length
                                    </Col>
                                    <Col xs={7} lg={9}>
                                        {detail?.length} mm
                                    </Col>
                                </Row>
                            </div>
                            <div className="mb-3">
                                <b>
                                    Description
                                </b>
                                <p style={{ textAlign: "justify" }}>
                                    {detail?.description}
                                </p>
                            </div>
                            <div className="position-sticky bottom-0 start-0 end-0 position-md-block bg-white py-3 d-flex gap-3 border-top">
                                <Link to={`/product/edit/${detail?._id}`} className="btn btn-outline-secondary flex-fill">
                                    <TbEdit className="me-2" />
                                    Edit
                                </Link>
                                <Button variant="primary" className="flex-fill" onClick={onBuy}>
                                    <TbShoppingCart className="me-2" />
                                    Buy
                                </Button>
                            </div>
                        </Col>
                    </Row>
                )}
            </Container>
        </>
    )
}

export default Detail;