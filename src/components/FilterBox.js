import { Button, Card, Col, Row, Form } from "react-bootstrap";
import { TbSearch } from "react-icons/tb";

const FilterBox = ({onFilter, category, keyword, onChangeCategory, onChangeKeyword}) => {
    return (
        <Card className="shadow mb-4">
                    <Card.Body>
                        <Row>
                            <Col lg={6}>
                                <Form.Group className="mb-2 mb-lg-0">
                                    <Form.Control
                                        value={keyword}
                                        type="search"
                                        placeholder="Search keywords to find product"
                                        onChange={onChangeKeyword}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group className="mb-2 mb-lg-0">
                                    <Form.Select defaultValue={category?.id} onChange={onChangeCategory}>
                                        {category.map((item, i) => (
                                            <option key={i} value={item.id}>{item.label}</option>
                                        ))}

                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={2}>
                                <Button className="w-100" onClick={onFilter}>
                                    <TbSearch className="me-2" />
                                    Search
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
    )
}

export default FilterBox;