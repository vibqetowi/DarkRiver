import { Spinner } from "react-bootstrap";

export default function LoadingBox(){
    return (
        <Spinner animation='border' role='statusx'>
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )
}