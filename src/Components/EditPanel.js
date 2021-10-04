import React, { useState } from 'react'
import { ContentState, convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./EditComponent.css"



function saveValue() {
    alert("saved");
    const { subheadingTitle, subheadingUrl, subheadingDescription, keyFeatures, pros, cons, amazon, flipkart, subheadingEditMode, youtubeVideo } = this.state;
    const object = { title: subheadingTitle, url: subheadingUrl, content: subheadingDescription, key_feature: keyFeatures, pros, cons, flipkart, amazon, youtubeVideo };
    console.log({ youtubeVideo });
    var subheadings = [];
    if (subheadingEditMode >= 0) {
        subheadings = this.state.subheadings;
        subheadings[subheadingEditMode] = object;
    }
    else
        subheadings = [...this.state.subheadings, object];
    this.setState({ subheadings })
    resetValue.bind(this)();


}


function resetValue() {
    this.setState({ subheadingToggle: false, subheadingTitle: "", subheadingUrl: "", subheadingDescription: "", keyFeatures: "", pros: "", cons: "", amazon: "", flipkart: "", subheadingEditMode: -1, youtubeVideo: "" })

}
export function EditPanel() {

    if (this.state.subheadingToggle) {
        return (<div className="edit-panel" id="edit_panel">
            <div className="row">
                <div className="col-md-6 col-sm-12">
                    <label className="application-label">Title</label>
                    <input value={this.state.subheadingTitle} onChange={(e) => { this.setState({ subheadingTitle: e.target.value }) }} className="form-control" id="subheading_title" />
                </div>

                <div className="col-md-6 col-sm-12">
                    <label className="application-label">Url</label>
                    <input value={this.state.subheadingUrl} onChange={(e) => { this.setState({ subheadingUrl: e.target.value }) }} className="form-control" id="subheading_url" />
                </div>
            </div>
            <div className="wrapper-class shadow-sm">

                <Editor
                    onEditorStateChange={(newState) => {
                        this.setState({ editorState: newState })
                        this.setState({ subheadingDescription: draftToHtml(convertToRaw(newState.getCurrentContent())) })
                        console.log(draftToHtml(convertToRaw(newState.getCurrentContent())), newState)
                    }}
                    editorState={this.state.editorState}
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                />
            </div>
            <div className="row">
                <div className="col-md-12 col-sm-12">
                    <label className="application-label">Key Features(seperated by comma)</label>
                    <textarea value={this.state.keyFeatures} onChange={(e) => { this.setState({ keyFeatures: e.target.value }) }} id="subheading_key_features" className="form-control" rows="3"></textarea>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 col-sm-12">
                    <label className="application-label">Pros(seperated by comma)</label>
                    <textarea value={this.state.pros} id="subheading_pros" onChange={(e) => { this.setState({ pros: e.target.value }) }} className="form-control" rows="3"></textarea>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 col-sm-12">
                    <label className="application-label">Cons(seperated by comma)</label>
                    <textarea value={this.state.cons} id="subheading_cons" onChange={(e) => { this.setState({ cons: e.target.value }) }} className="form-control" rows="3"></textarea>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 col-sm-12">
                    <label className="application-label">Youtube Link</label>
                    <input value={this.state.youtubeVideo} onChange={(e) => {
                        this.setState({ youtubeVideo: e.target.value })
                        console.log(e.target.value)
                    }} className="form-control" id="subheading_flipkart" />
                </div>

            </div>
            <div style={{
                display: "flex",
                flexDirection: "row-reverse",
                margin: " 15px 0"
            }
            }>
                <button style={{ backgroundColor: "#365679", color: "white" }} onClick={saveValue.bind(this)} className="panel-button">
                    Save
              </button>
                <button onClick={resetValue.bind(this)} className="panel-button" >
                    Cancel
              </button>
            </div>
        </div>)
    }

}

export default EditPanel;