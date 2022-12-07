import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getProduct } from "../state/productSlice";
import EmptyState from "./EmptyState";

export const Preloader = ({content}) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!localStorage.getItem("data2")) {
            setLoading(true);
            dispatch(getProduct());
            setLoading(false);
        }
    }, [dispatch])

    return (
        <>
            {loading ? (
                <div className="position-fixed top-0 start-0 end-0 bottom-0 bg-white" style={{ zIndex: 99 }}>
                    <Container className="h-100">
                        <EmptyState
                            icon={<h1>🥁</h1>}
                            title="Wait a second"
                            description="We will prepare something extraordinary"
                        />
                    </Container>
                </div>
            ) : (
                <>
                    {content}
                </>
            )}
        </>
    )
}

export default Preloader;