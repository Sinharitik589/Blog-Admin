import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAuth, fetchBlogs } from "./action"
import { Container, Row, Col } from 'react-bootstrap';
import Login from './Pages.js/Login';
import Navigation from './Pages.js/Navigation';
import { Link } from 'react-router-dom';



class Home extends Component {

    componentDidMount() {
        this.props.fetchBlogs();
        if (localStorage.getItem("token") != null) {
            this.props.fetchAuth(true);

        }
        else
            this.props.fetchAuth(false);
    }


    renderMain() {

        if (this.props.auth == null) {

            return (
                <div >Loading</div>
            )

        }
        else if (this.props.auth) {
            return (<Row noGutters>
                <Col md={2} className="side_nav">
                    <Link to="/"> <span > Blogs  </span></Link>
                    <Link to="/add"> <span > Add new</span></Link>
                </Col>
                <Col md={10}>
                    <Container>
                        <Navigation />
                    </Container>
                </Col>
            </Row>)
        }
        else {
            return <Login />

        }
    }

    render() {
        return (
            <>
                <nav>
                    <div class="rows">
                        <div style={{ flex: 3, fontSize: "larger" }}>DASHBOARD</div>
                    </div>
                </nav>

                {
                    this.renderMain()
                }
            </>
        )
    }
}

const mapStateToProps = ({ auth }) => ({ auth });
export default connect(mapStateToProps, { fetchAuth, fetchBlogs })(Home);