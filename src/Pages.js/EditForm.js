import React, { Component } from 'react'
import axios from "axios"
import { EditPanel } from "../Components/EditPanel";
import { fetchBlogs } from "../action"
import { QuestionPanel } from "../Components/QuestionPanel";
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { EditorState, ContentState } from "draft-js"
import htmlToDraft from 'html-to-draftjs';


let url = (process.env.NODE_ENV == "production") ? "https://zen-newton-5723fe.netlify.app" : "http://localhost:9000";
class EditForm extends Component {

    constructor(props) {

        super(props);
        this.state = {
            subheadings: [], heading: "", category: "", author: "", image: "", description: "", meta: "", questions: [], url: [], conclusion: "", urlValue: "", urlToggle: false, subheadingToggle: false,
            questionToggle: false, subheadingTitle: "", subheadingUrl: "", subheadingDescription: "", keyFeatures: "", amazon: "", flipkart: "", pros: "", cons: "", question: "", answer: "", subheadingEditMode: -1,
            questionEditMode: -1, blogId: null, progress: false, name: "", blogs: [], more: [], editorState: EditorState.createEmpty()
        }
        if (process.env.NODE_ENV == "production") {
            this.state.endpoint = "https://zen-newton-5723fe.netlify.app"
        }
        else {
            this.state.endpoint = "http://localhost:9000"
        }

    }

    changeOrder(type, index) {
        let temp;
        let subheadings = this.state.subheadings;
        if (type == "up") {
            temp = subheadings[index];
            subheadings[index] = subheadings[index - 1];
            subheadings[index - 1] = temp;
            this.setState({ subheadings });

        }
        else {
            temp = subheadings[index];
            subheadings[index] = subheadings[index + 1];
            subheadings[index + 1] = temp;
            this.setState({ subheadings });
        }
    }

    async saveBlog() {
        const { subheadings, questions, category, author, image, description, meta, url, conclusion, heading, name, more } = this.state;

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
            name,
            more
        }
        console.log({ blogs: object })
        try {
            this.setState({ progress: true })
            await axios.put(`${this.state.endpoint}/.netlify/functions/api/blog`, object, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
            window.alert("submitted");
            this.setState({ progress: false })
        }
        catch (e) {
            window.alert("try again");
            this.setState({ progress: false });
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

                const res = await axios.get(`${this.state.endpoint}/.netlify/functions/api/admin/blog?id=${id}`);
                console.log(res);

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
                        more,
                        name
                    } = res.data.blog;
                    let array = [];
                    for (let x in subheading) {
                        let val = subheading[x];
                        const blocksFromHtml = htmlToDraft(val.content);
                        const { contentBlocks, entityMap } = blocksFromHtml;
                        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
                        const editorState = EditorState.createWithContent(contentState);
                        val.content = editorState;
                        array.push(val);
                    }
                    this.setState({
                        heading, category, subheadings: array, questions, more,
                        url: urls, conclusion, description, meta: meta_description, author: username, image: imageUrl, name
                    })
                };
                const names = await axios.get(`${this.state.endpoint}/.netlify/functions/api/admin/blog/name`);
                if (names.data.blog != undefined) {
                    this.setState({ blogs: names.data.blog });
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
        let ncontent = content;
        if (content._immutable === undefined) {
            const blocksFromHtml = htmlToDraft(content);
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            const editorState = EditorState.createWithContent(contentState);
            ncontent = editorState;
        }
        this.setState({ subheadingToggle: true, subheadingEditMode: index, subheadingTitle: title, subheadingUrl: url, editorState: ncontent, subheadingDescription: ncontent, keyFeatures: key_feature, amazon, flipkart, pros, cons })
    }
    renderSubheading() {
        let array = [];
        if (this.state.subheadings != undefined) {
            if (this.state.subheadings.length > 0) {
                array = this.state.subheadings.map((val, index) => {
                    return (<div className="row no-gutters align-items-center">
                        <div className=" col-10 subheading-tab-container">
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
                        </div>
                        <div className="col-2">
                            {(index != this.state.subheadings.length - 1) ? <div onClick={this.changeOrder.bind(this, "down", index)} className="tab-move-icon-container" style={{ display: "inline" }} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <g id="keyboard_arrow_down_24px">
                                        <path id="icon/hardware/keyboard_arrow_down_24px" d="M8.12499 8.99999L12.005 12.88L15.885 8.99999C16.275 8.60999 16.905 8.60999 17.295 8.99999C17.685 9.38999 17.685
                                         10.02 17.295 10.41L12.705 15C12.315 15.39 11.685 15.39 11.295 15L6.70499 10.41C6.51774 10.2232 6.41251 9.96951 6.41251 9.70499C6.41251 9.44047 6.51774 9.18682 6.70499
                                          8.99999C7.09499 8.61999 7.73499 8.60999 8.12499 8.99999Z" fill="black" fill-opacity="0.54" />
                                    </g>
                                </svg>
                            </div> : ""}
                            {(index != 0) ? <div onClick={this.changeOrder.bind(this, "up", index)} className="tab-move-icon-container" style={{ display: "inline" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <g id="keyboard_arrow_up_24px">
                                        <path id="icon/hardware/keyboard_arrow_up_24px" d="M8.12498 15L12.005 11.12L15.885 15C16.275 15.39 16.905 15.39 17.295 15C17.685 14.61 17.685 13.98 17.295 13.59L12.705 
                                        9.00001C12.5181 8.81275 12.2645 8.70752 12 8.70752C11.7355 8.70752 11.4818 8.81275 11.295 9.00001L6.70498 13.59C6.31498 13.98 6.31498 14.61 6.70498 15C7.09498 15.38 7.73498
                                         15.39 8.12498 15Z" fill="black" fill-opacity="0.54" />
                                    </g>
                                </svg>
                            </div> : ""}
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
        const { heading, category, author, image, description, meta, conclusion, urlValue, urlToggle, name } = this.state;
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
                    <label >Page name</label>
                    <input value={name} disabled onChange={(e) => { this.setState({ name: e.target.value }) }} className="form-control" placeholder="name@example.com" />
                </div>
                <div className="form-group">
                    <label >Heading</label>
                    <input value={heading} onChange={(e) => { this.setState({ heading: e.target.value }) }} className="form-control" placeholder="name@example.com" />
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
                <div className="form-group">
                    <label for="category" >Read More</label><br />
                    {
                        this.state.blogs.map(val => {
                            let index = this.state.more.findIndex(value => value == val._id);
                            let backGround = (index >= 0) ? " rgb(0, 0, 58)" : "rgb(71, 71, 255)";
                            if (val.name != undefined && val.name != "" && val.name != name) {
                                return (<div className="read-more-tag" onClick={() => {
                                    let more = this.state.more;
                                    if (index >= 0) {
                                        more.splice(index, 1);
                                    }
                                    else {
                                        more.push(val._id);
                                    };
                                    this.setState({ more });
                                }} style={{ backgroundColor: `${backGround}` }} >
                                    {val.name.slice(0, 15)}
                                </div>)
                            }
                        }
                        )
                    }
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
                            {(this.state.progress) ? <div><Spinner as={'span'} animation="border" variant="light" /><span>Saving</span> </div> : "Save Changes"}
                        </button>
                    </div>
                </div>
            </div>

        )
    }
}
const mapStateToProps = ({ blogs }) => ({ blogs })

export default connect(mapStateToProps, { fetchBlogs })(EditForm);