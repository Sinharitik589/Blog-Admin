import React, { Component } from 'react'
import axios from "axios"
import { EditPanel } from "../Components/EditPanel";
import { fetchBlogs } from "../action"
import { QuestionPanel } from "../Components/QuestionPanel";
import { connect } from 'react-redux';

class EditForm extends Component {

    constructor(props) {

        super(props);
        this.state = {
            subheadings: [], heading: "", category: "", author: "", image: "", description: "", meta: "", questions: [], url: [], conclusion: "", urlValue: "", urlToggle: false, subheadingToggle: false,
            questionToggle: false, subheadingTitle: "", subheadingUrl: "", subheadingDescription: "", keyFeatures: "", amazon: "", flipkart: "", pros: "", cons: "", question: "", answer: "", subheadingEditMode: -1,
            questionEditMode: -1, blogId: null
        }

    }

    async saveBlog() {
        const { subheadings, questions, category, author, image, description, meta, url, conclusion, heading } = this.state;

        const object = {
            id: this.state.blogId,
            category,
            username: author,
            heading,
            imageUrl: image,
            meta_description: meta,
            description,
            subheading: subheadings,
            questions,
            urls: url,
            conclusion,
        }
        console.log({ blogs: object })
        try {
            await axios.put("https://zen-newton-5723fe.netlify.app/.netlify/functions/api/blog", object, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
            window.alert("submitted");
        }
        catch (e) {
            window.alert("try again");
            console.log(e);
        }
    }

    async componentDidMount() {
        const index = this.props.match.params.index.split(":")[1];
        console.log("Mounted it")

        if (this.props.blogs.length == 0) {
            await this.props.fetchBlogs();
        }
        if (this.props.blogs.length > 0) {
            const id = this.props.blogs[index]._id;
            this.setState({ blogId: id })
            console.log({ id });
            try {
                console.log("making request")

                const res = await axios.get(`https://zen-newton-5723fe.netlify.app/.netlify/functions/api/admin/blog?id=${id}`);

                if (res.data.blog != undefined) {
                    const {
                        category,
                        username,
                        heading,
                        imageUrl,
                        meta_description,
                        description,
                        subheading,
                        questions,
                        urls,
                        conclusion,
                    } = res.data.blog;
                    this.setState({ heading, category, subheadings: subheading, questions, url: urls, conclusion, description, meta: meta_description, author: username, image: imageUrl })
                }
            }
            catch (e) {
                console.log(e);
            }

        }
    }
    subheadingEdit(index) {
        const { subheadings } = this.state;
        const { title, url, content, key_feature, amazon, flipkart, pros, cons } = subheadings[index];
        console.log(title, index)
        this.setState({ subheadingToggle: true, subheadingEditMode: index, subheadingTitle: title, subheadingUrl: url, subheadingDescription: content, keyFeatures: key_feature, amazon, flipkart, pros, cons })
    }
    renderSubheading() {
        let array = [];
        if (this.state.subheadings != undefined) {
            if (this.state.subheadings.length > 0) {
                array = this.state.subheadings.map((val, index) => {
                    return (<div className="subheading-tab-container">
                        <h5 >{val.title}</h5>
                        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                            <button
                                onClick={(e) => {
                                    var subheadings = this.state.subheadings;
                                    subheadings.splice(index, 1);
                                    this.setState({ subheadings });
                                }}
                                className="btn btn-primary btn-sm" >delete</button>
                            <button
                                onClick={this.subheadingEdit.bind(this, index)}
                                className="btn btn-secondary btn-sm">edit</button>
                        </div>
                    </div>)
                })
            }
        }

        return array;

    }

    renderQuestions() {

        let array = [];
        if (this.state.questions != undefined) {
            if (this.state.questions.length > 0) {
                array = this.state.questions.map((val, index) => {
                    return (<div className="subheading-tab-container">
                        <h5 >{val.question}</h5>
                        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                            <button
                                onClick={() => {
                                    var questions = this.state.questions;
                                    questions.splice(index, 1);
                                    this.setState({ questions });
                                }}
                                className="btn btn-primary btn-sm" >
                                delete
                        </button>
                            <button
                                onClick={() => {
                                    this.setState({ questionToggle: true, question: this.state.questions[index].question, answer: this.state.questions[index].answer, questionEditMode: index });
                                }}
                                className="btn btn-secondary btn-sm">edit</button>
                        </div>
                    </div>)
                })
            }
        }

        return array;
    };


    renderUrls() {
        let array = [];
        if (this.state.url != undefined) {
            if (this.state.url.length > 0) {
                array = this.state.url.map((val, index) => {
                    return (
                        <div className="application-tag-container"  >
                            <div class="application-tags" style={{ backgroundColor: "#dfe9fb" }}>
                                <a href={val.url} >{val.keyword}</a>
                                <span onClick={() => {
                                    var urls = this.state.url;
                                    urls.splice(index, 1);
                                    this.setState({ urls });
                                }} style={{ marginLeft: 4, cursor: "pointer", color: "blue" }}    >
                                    &times;
                             </span>
                            </div>
                        </div>
                    )
                })
            }
        }
        return array;

    }
    urlInputHandle(event) {
        var array = this.state.url;
        if (event.keyCode == 13) {
            let object = this.state.urlValue.split(",");
            object.map((value, index) => {
                let arr = value.split("~");
                let object = {
                    keyword: arr[0],
                    url: arr[1],
                }
                array.push(object);

            });
            this.setState({ urlToggle: false, url: array });
        }

    }
    render() {
        const { heading, category, author, image, description, meta, conclusion, urlValue, urlToggle } = this.state;
        return (
            <div style={{ marginTop: 100 }}>
                <div className="form-group">
                    <label for="category">Category</label>
                    <select className="form-control" value={category} onChange={(e) => { this.setState({ category: e.target.value }) }}>
                        <option value="comparison">Comparison</option>
                        <option value="youtube guide">Youtube guide</option>
                        <option value="health">Health</option>
                        <option value="how to">How To</option>
                        <option value="discover">Discover</option>
                        <option value="more">More</option>
                    </select>
                </div>
                <div className="form-group">
                    <label for="heading_input">Heading</label>
                    <input value={heading} disabled onChange={(e) => { this.setState({ heading: e.target.value }) }} className="form-control" id="heading_input" placeholder="name@example.com" />
                </div>

                <div className="form-group">
                    <label for="author">Author Name</label>
                    <input value={author} onChange={(e) => { this.setState({ author: e.target.value }) }} type="text" className="form-control" id="author_input" placeholder="name" />
                </div>
                <div className="form-group">
                    <label for="url_input">Image url</label>
                    <input value={image} onChange={(e) => { this.setState({ image: e.target.value }) }} type="url" className="form-control" id="url_input" placeholder="name@example.com" />
                </div>



                <div className="form-group">
                    <label for="description_input">Description</label>
                    <textarea value={description} onChange={(e) => { this.setState({ description: e.target.value }) }} id="description_input" className="form-control" rows="4"></textarea>
                </div>
                <div className="form-group">
                    <label for="meta_description_input">Meta Description</label>
                    <textarea value={meta} onChange={(e) => { this.setState({ meta: e.target.value }) }} id="meta_description_input" className="form-control" rows="4"></textarea>
                </div>
                <hr />
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-3 col-sm-12">
                            <h3 style={{ color: "#464646", fontWeight: "bold" }} className="label_heading">
                                Subheading
          </h3>
                        </div>
                        <div className="col-md-7 col-sm-12" id="subheading_tabs">
                            {this.renderSubheading()}
                        </div>
                        <div className="col-md-2 col-sm-12 label-button">
                            <button onClick={() => { this.setState({ subheadingToggle: true }) }} className="application-button-container">
                                + Add
          </button>
                        </div>
                        <div className="col-md-12 col-sm-12">
                            {EditPanel.bind(this)()}
                        </div>
                    </div>
                </div>
                <hr />
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-3 col-sm-12">
                            <h3 style={{ color: "#464646", fontWeight: "bold" }} className="label_heading">
                                Questions
          </h3>
                        </div>
                        <div className="col-md-7 col-sm-12" id="subheading_tabs">
                            {this.renderQuestions()}
                        </div>
                        <div className="col-md-2 col-sm-12 label-button">
                            <button onClick={() => { this.setState({ questionToggle: true }) }} className="application-button-container">
                                + Add
                            </button>
                        </div>
                        <div className="col-md-12 col-sm-12">
                            {QuestionPanel.bind(this)()}
                        </div>
                    </div>
                </div>
                <hr />
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-1 col-sm-12">
                            <h3 style={{ color: " #464646", fontWeight: "bold", textAlign: " center" }} >
                                Urls
          </h3>
                        </div>
                        <div className="col-md-9 col-sm-12">
                            <div className="skills" id="url_set">
                                <input className="form-control" style={{ display: (urlToggle) ? "block" : "none" }} id="add_url"
                                    value={urlValue} onChange={(e) => { this.setState({ urlValue: e.target.value }) }}
                                    onKeyUp={this.urlInputHandle.bind(this)}
                                />
                                {this.renderUrls()}
                            </div>
                        </div>
                        <div className="col-md-2 col-sm-12" style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }} >
                            <button onClick={() => { this.setState({ urlToggle: true }) }} className="application-button-container">
                                + Add
                            </button>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="form-group">
                    <label for="conclusion">Conclusion</label>
                    <textarea value={conclusion} onChange={(e) => { this.setState({ conclusion: e.target.value }) }} className="form-control" rows="4"></textarea>
                </div>
                <hr />
                <div className="form-group">
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <button type="button" onClick={this.saveBlog.bind(this)} className="btn btn-primary btn-lg">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>

        )
    }
}
const mapStateToProps = ({ blogs }) => ({ blogs })

export default connect(mapStateToProps, { fetchBlogs })(EditForm);