import React from 'react'


function saveValue() {
    const { question, answer, questionEditMode } = this.state;
    let object = { question, answer };

    if (questionEditMode >= 0) {
        var questions = this.state.questions;
        questions[questionEditMode] = object;
    }
    else
        var questions = [...this.state.questions, object];
    this.setState({ questions });
    resetValue.bind(this)();
}


function resetValue() {
    this.setState({ question: "", answer: "", questionToggle: false, questionEditMode: -1 })
}
export function QuestionPanel() {


    if (this.state.questionToggle) {
        return (
            <div className="edit-panel" id="quest_edit_panel">
                <div className="row">
                    <div className="col-md-12 col-sm-12">
                        <label className="application-label">Question</label>
                        <input onChange={(e) => { this.setState({ question: e.target.value }) }} value={this.state.question} className="form-control" id="quest" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-sm-12">
                        <label className="application-label">Answer</label>
                        <textarea value={this.state.answer} onChange={(e) => { this.setState({ answer: e.target.value }) }} className="form-control" rows="3"></textarea>
                    </div>
                </div>

                <div style={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    margin: "15px 0"
                }}
                >
                    <button style={{ backgroundColor: "#365679", color: "white" }} onClick={saveValue.bind(this)} className="panel-button">
                        Save
              </button>
                    <button onClick={resetValue.bind(this)} className="panel-button" >
                        Cancel
              </button>
                </div>
            </div>
        )
    }
}

