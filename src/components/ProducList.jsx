import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Card, Col, Container, FloatingLabel, Form, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import EmptyState from "./EmptyState";
import { useSelector } from "react-redux";
import { getAllProducts, getStatus } from "../state/productSlice";
import Pagination from "./Pagination";
import FilterBox from "./FilterBox";
import { constant } from "../utils/constant";

const ProductList = () => {
    const categoryOption = constant.categoryOption;
    const status = useSelector(getStatus);
    const list = useSelector(getAllProducts);
    const limitPerPage = process.env.REACT_APP_LIMIT_ITEM;
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState(null);
    const [searching, setSearching] = useState(false);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [countFoundItem, setCountFoundItem] = useState(0);
    const [category, setCategory] = useState({
        id: -1,
        label: null
    });

    useEffect(() => {
        setLoading(status?.status === "loading");
        if(status?.success) {
            setData(list);
        }
        onFilter({});
    }, [list, status])

    const onPrev = () => {
        onFilter({ action: "prev" });
    }

    const onNext = () => {
        onFilter({ action: "next" });
    }

    const onFilter = ({ action = null }) => {
        

        let newPage = page;

        switch (action) {
            case "prev":
                newPage--;
                console.log("prev")
                break;
            case "next":
                newPage++;
                console.log("next")
                break;
        }

        if ((keyword || category.id !== -1) && list && list.length > 0) {
            const filtered = list.filter((item) => item?.name.includes(keyword ?? "") && item?.CategoryId.includes(category.id));

            setCountFoundItem(filtered.length);

            setData(filtered.splice(limitPerPage * newPage, limitPerPage));
            setPage(newPage);
            setSearching(true);
        }
        else {
            setData(list);
            setPage(0);
            setSearching(false);
        }
    }

    const onSelectCategory = (e) => {
        const id = parseInt(e.target.value);
        const label = categoryOption.find((item) => item?.id === id).label;

        setCategory({ id, label });
    }

    return (
        <>
            <div className="bg-dark" style={{ height: "2.5rem", marginBottom: "-2rem" }}></div>
            <Container className='flex-fill'>
                <FilterBox
                    onFilter={onFilter}
                    onChangeCategory={onSelectCategory}
                    onChangeKeyword={(e) => setKeyword(e.target.value)}
                    keyword={keyword}
                    category={categoryOption}
                />

                {(() => {
                    if (loading) {
                        return (
                            <EmptyState
                                icon={<h1>⚡</h1>}
                                title="Please wait..."
                                description="Abracadabra... We are doing a magic tricks"
                            />
                        )
                    }
                    else if (data && data.length > 0) {
                        return (
                            <>
                                <h5>
                                    {searching ? "Search result" : "Recommended Product"}
                                </h5>
                                <Row className="mt-2">
                                    {data.map((item, i) => (

                                        <Col xs={6} md={4} lg={3} xl={2} key={i}>
                                            <Card className="shadow overflow-hidden mb-3 mb-lg-4">
                                                <div className="position-relative bg-white" style={{ aspectRatio: 1 / 1 }}>
                                                    <Image
                                                        src={item?.image}
                                                        alt="Thumbnail"
                                                        className="w-100 h-100"
                                                        style={{ objectFit: "cover" }}
                                                    />
                                                </div>
                                                <Card.Body>
                                                    <Link to={`/product/${item?._id}`} className="d-block text-decoration-none link-primary text-truncate" style={{ boxSizing: "border-box" }}>
                                                        {item?.name}
                                                    </Link>
                                                    <small className="d-block text-muted text-truncate">
                                                        {item?.categoryName}
                                                    </small>
                                                    <b>
                                                        Rp. {item?.harga}
                                                    </b>
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                    ))}
                                </Row>
                            </>
                        )
                    }
                    else {
                        return (
                            <EmptyState
                                icon={<h1>🙈</h1>}
                                title="Data is empty"
                                description="There is notihing in here"
                            />
                        )
                    }
                })()}
                <Pagination
                    disablePrev={page === 0}
                    disableNext={page >= countFoundItem / limitPerPage - 1}
                    onNext={onNext}
                    onPrev={onPrev}
                />
            </Container>
        </>
    )
}

export default ProductList;