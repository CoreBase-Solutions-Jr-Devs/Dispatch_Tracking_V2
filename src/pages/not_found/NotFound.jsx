import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import corebaseLogo from "@/assets/images/corebase.png";
import notFoundImage from "@/assets/images/No tracking Found.png";
import productLogo from "@/assets/images/pcico.ico";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div
            style={{
                position: "fixed", inset: 0,
                display: "flex", justifyContent: "center",
                alignItems: "center", background: "#f8f9fa",
                padding: "1rem", zIndex: 9999,
            }}
        >
            <Card
                className="shadow-lg border-0 rounded-4"
                style={{
                    width: "100%",
                    maxWidth: "550px",
                }}
            >
                <Card.Body className="py-5 px-4 text-center">

                    {/* Product Logo */}
                    <div className="text-center mb-3">
                        <img
                            src={productLogo}
                            alt="Product Logo"
                            className="d-block mx-auto"
                            style={{
                                width: 48,
                                height: 48,
                            }}
                        />
                    </div>

                    {/* 404 Illustration */}
                    <div className="text-center mb-4">
                        <img
                            src={notFoundImage}
                            alt=""
                            className="d-block mx-auto img-fluid"
                            style={{
                                maxHeight: 180,
                                marginBottom: "2rem",
                            }}
                        />
                    </div>

                    <h2 className="fw-bold mb-3">
                        Oops! Page Not Found
                    </h2>

                    <p
                        className="text-muted mx-auto mb-4"
                        style={{ maxWidth: 460 }}
                    >
                        The page you're trying to access doesn't exist,
                        has been moved, or you don't have permission to
                        view it.
                    </p>

                    <Button
                        variant="primary"
                        className="px-4"
                        onClick={() => navigate(-1)}
                    >
                        Go Back
                    </Button>

                    <hr className="my-4" />

                    <div className="d-flex justify-content-center align-items-center gap-2 flex-nowrap text-nowrap">
                        <img
                            src={corebaseLogo}
                            alt="CoreBase Logo"
                            style={{
                                width: 28,
                                height: 28,
                                objectFit: "contain",
                                display: "block",
                            }}
                        />

                        <small className="text-muted lh-1">
                            © {new Date().getFullYear()} CoreBase Solutions
                        </small>

                        <span className="text-secondary opacity-50">•</span>

                        <small className="text-muted lh-1">
                            Dispatch Tracking System
                        </small>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}