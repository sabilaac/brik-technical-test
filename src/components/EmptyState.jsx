import React from "react";

class EmptyState extends React.Component {
    render() {
        const {icon, title, description} = this.props;

        return (
            <div className="text-center d-flex align-items-center justify-content-center flex-column h-100 w-100 py-5">
                {icon}
                    <b className="mt-3">
                        {title}
                    </b>
                    <small className="text-muted">
                        {description}
                    </small>
            </div>
        )
    }
}

export default EmptyState;