import { Button, ButtonGroup } from "react-bootstrap";
import { TbArrowLeft, TbArrowRight } from "react-icons/tb";

const Pagination = ({onPrev, onNext, disableNext, disablePrev}) => {
    return (
        <div className="d-flex justify-content-center">
            <ButtonGroup>
                <Button variant="outline-primary" disabled={disablePrev} onClick={onPrev}>
                    <TbArrowLeft className="me-2" />
                    Prev
                </Button>
                <Button variant="outline-primary" disabled={disableNext} onClick={onNext}>
                    Next
                    <TbArrowRight className="ms-2" />
                </Button>
            </ButtonGroup>
        </div>
    )
}

export default Pagination;