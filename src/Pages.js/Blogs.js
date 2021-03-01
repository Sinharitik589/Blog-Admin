import React, { Component } from 'react'
import { fetchBlogs } from "../action"
import axios from "axios";
import { Container, Col, Row, Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

class Blogs extends Component {


    state = {
        modal: false,
        modalHeading: "",
        modalId: ""
    }

    closeModal() {
        this.setState({ modal: false })
    }

    async deleteBlog() {

        try {

            await axios.get(`https://zen-newton-5723fe.netlify.app/.netlify/functions/api/delete?id=${this.state.modalId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            }
            );
            this.setState({ modal: false });
            this.props.fetchBlogs();

        }
        catch (e) {
            console.log(e);
        }
    }

    renderBlogs() {
        let array = [];
        const { blogs } = this.props;
        if (blogs.length > 0) {
            array = blogs.map((val, index) => {
                return (<Col lg={4} md={6}>
                    <Container className="card">
                        <img src={val.imageUrl} />
                        <div className="card-description">
                            <h3>{val.heading}</h3>

                            <Row className="justify-content-between">
                                <button onClick={() => { this.props.history.push(`/blog:${val._id}`) }} style={{ backgroundColor: "#006200" }}>View</button>
                                <button onClick={() => { this.props.history.push(`/edit:${index}`) }} style={{ backgroundColor: "#b17200" }}>Edit</button>
                                <button onClick={() => { this.setState({ modal: true, modalHeading: val.heading, modalId: val._id }) }} style={{ backgroundColor: "#9d0000" }}>Delete</button>
                            </Row>
                        </div>
                    </Container>
                </Col>)
            })
        }
        return array;
    }
    render() {
        return (
            <Row >
                {this.renderBlogs()}
                <Modal style={{ marginTop: 100 }} show={this.state.modal} >
                    <Modal.Header >
                        <Modal.Title>Delete Blog</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete {this.state.modalHeading}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal.bind(this)}>
                            Close
                       </Button>
                        <Button variant="primary" onClick={this.deleteBlog.bind(this)}>
                            Delete
                       </Button>
                    </Modal.Footer>
                </Modal>
            </Row>
        )
    }
}

const mapStateToProps = ({ blogs }) => ({ blogs });
export default connect(mapStateToProps, { fetchBlogs })(Blogs);