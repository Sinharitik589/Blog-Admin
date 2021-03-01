import React from 'react'
import { Container } from 'react-bootstrap'
import { Route, Switch } from 'react-router'
import Blog from './Blog'
import Blogs from './Blogs'
import EditForm from './EditForm'
import Form from './Form'


const Navigation = () => {

    return (
        <Container style={{ marginTop: 100 }}>
            <Switch>
                <Route exact path="" component={Blogs} />
                <Route path="add" component={Form} />
                <Route path="edit:index" component={EditForm} />
                <Route path="blog:id" component={Blog} />
            </Switch>
        </Container>
    )
}

export default Navigation;