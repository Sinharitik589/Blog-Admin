import React from 'react'


const SubheadingTab = () => {

    return (<div className="subheading-tab-container">
        <h5 >Dummy title is there </h5>
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
            <button className="btn btn-primary btn-sm" >delete</button>
            <button className="btn btn-secondary btn-sm">edit</button>

        </div>
    </div>)
}

export default SubheadingTab;