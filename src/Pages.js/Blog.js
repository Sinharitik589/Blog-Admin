import axios from "axios";
import "./Css/blog.css"
import $ from "jquery";
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from "react-share";

import React, { useState, useEffect } from "react";

import { Row, Col, Container, Dropdown } from "react-bootstrap";
import { useParams } from "react-router";

export default () => {
    const [blog, setBlog] = useState(null);

    const { id } = useParams();
    let courseId = id.split(":")[1];
    useEffect(() => {
        async function fetchData() {
            try {

                const res = await axios.get(`https://zen-newton-5723fe.netlify.app/.netlify/functions/api/admin/blog?id=${courseId}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
                if (res.data.blog != undefined) {
                    setBlog(res.data.blog)
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        fetchData();

    }, [])

    const replace = (str) => {
        let array = str;
        for (let i = 0; i < str.length; i++) {
            array = array.replace(" ", "_");
        }
        return array;
    };
    const imageInsert = (url, title) => {
        if (url) {
            return <img alt={title} src={url}></img>;
        }
    };
    const openAnswer = (index) => {
        $(`#answer_${index}`).toggle();
        if ($(`#answer_${index}`).is(":hidden")) {
            $(`#question_button_${index}`)
                .html(`<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
</svg>`);
        } else {
            $(`#question_button_${index}`)
                .html(`<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
</svg>`);
        }
    };
    const replaceContentUrl = (str) => {
        let string = str;

        blog.urls.map((value) => {
            console.log(value, "value");
            string = string.replace(
                `${value.keyword}`,
                `<a href=${value.url}>${value.keyword}</a>`
            );
        });

        return string;
    };

    const renderConclusion = (conclusion_final) => {
        if (conclusion_final.length > 0) {
            return (
                <div className="subheading">
                    <h3>Conclusion</h3>
                    <p dangerouslySetInnerHTML={{ __html: conclusion_final }}></p>
                </div>
            );
        }
    };

    const renderButton = (flipkart, amazon) => {
        if (flipkart.length > 0 && amazon.length > 0) {
            return (
                <>
                    <a href={amazon} className="col-md-4 buy-button">
                        <img
                            style={{ margin: 0, padding: 0 }}
                            src="https://i.pinimg.com/originals/08/5f/d8/085fd8f7819dee3b716da73d3b2de61c.jpg"
                            alt="buy on amazon"
                        />
                        <div>Buy on amazon</div>
                    </a>
                    <a className="col-md-4 offset-md-4 buy-button" href={flipkart}>
                        <img
                            style={{ margin: 0, padding: 0 }}
                            src="https://latestnews.fresherslive.com/images/articles/ians/origin/2020/07/14/walmart-led-investors-pump-in-12-bn-in-flipkart-group-5f0da8994d322-1594730649.jpg"
                            alt="buy on flipkart"
                        />
                        <div style={{ backgroundColor: "#0b275b", color: "white" }}>
                            Buy on flipkart
            </div>
                    </a>
                </>
            );
        }
    };

    const renderList = (key_feature, value, col) => {
        if (key_feature.length > 0) {
            let key_feature_arr = key_feature.split(",");
            return (
                <>
                    <div style={{ backgroundColor: col }}>{value}</div>
                    <ul>
                        {key_feature_arr.map((val) => {
                            if (val.length > 0) {
                                return <li>{val}</li>;
                            }
                        })}
                    </ul>
                </>
            );
        }
    };
    const week_days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    var time = "";
    var description_new = "";
    if (blog != null) {
        let times = new Date(blog.createdAt);
        let day = week_days[times.getDay()];
        let date = times.getDate();
        let month = months[times.getMonth()];
        let year = times.getFullYear();

        time = `${day} ${date} ${month} ${year}`;
        description_new = blog.description.split("\n").join("<br/>");
    }
    return (
        <div className="about">

            {
                (blog == null) ? "" : <Container>
                    <main>
                        <Row>
                            <Col xs={12} md={8}>
                                <h3 id="heading">{blog.heading}</h3>
                                <hr />
                                <h5 className="time">
                                    <span>
                                        <svg
                                            width="1em"
                                            height="1em"
                                            viewBox="0 0 16 16"
                                            className="bi bi-calendar-check"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                d="M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1zm1-3a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2z"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                d="M3.5 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5zm9 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5z"
                                            />
                                        </svg>
                                        {time}
                                    </span>
                                    <span>
                                        <svg
                                            width="1em"
                                            height="1em"
                                            viewBox="0 0 16 16"
                                            className="bi bi-pencil"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"
                                            />
                                        </svg>
                                        {blog.username}
                                    </span>
                                </h5>
                                <img
                                    className="heading_img"
                                    alt={blog.heading}
                                    src={blog.imageUrl}
                                />
                                <div className="icon_container">
                                    <span>
                                        <FacebookShareButton
                                            url={`https://thtechmates.in/blogs/${blog.heading}`}
                                            quote={blog.heading}
                                        >
                                            <FacebookIcon size={50} round={true} />
                                        </FacebookShareButton>
                                    </span>

                                    <span>
                                        <WhatsappShareButton
                                            url={`https://thtechmates.in/blogs/${replace(
                                                blog.heading
                                            )}`}
                                            title={blog.heading}
                                        >
                                            <WhatsappIcon size={50} round={true} />
                                        </WhatsappShareButton>
                                    </span>
                                    <span>
                                        <TwitterShareButton
                                            url={`https://thtechmates.in/blogs/${replace(
                                                blog.heading
                                            )}`}
                                            title={blog.heading}
                                            via="dspeakingsoul"
                                        >
                                            <TwitterIcon size={50} round={true} />
                                        </TwitterShareButton>
                                    </span>
                                </div>
                                <hr />
                                <p
                                    className="subheading description_sub"
                                    dangerouslySetInnerHTML={{ __html: description_new }}
                                ></p>
                                {blog.subheading.map((value) => {
                                    let {
                                        title,
                                        content,
                                        key_feature,
                                        pros,
                                        cons,
                                        flipkart,
                                        amazon,
                                    } = value;

                                    let content_new = content.split("\n").join("<br/>");
                                    let content_final = replaceContentUrl(content_new);

                                    return (
                                        <div className="subheading">
                                            <h3 dangerouslySetInnerHTML={{ __html: title }}></h3>

                                            <div className="subheading-image">
                                                {imageInsert(value.url, title)}
                                            </div>
                                            <p dangerouslySetInnerHTML={{ __html: content_final }}></p>
                                            <div className="pro-con">
                                                {renderList(key_feature, "Key Features", "blue")}
                                            </div>

                                            <div className="pro-con">
                                                {renderList(pros, "Pros", "green")}
                                            </div>
                                            <div className="pro-con">
                                                {renderList(cons, "Cons", "red")}
                                            </div>
                                            <div className="row">{renderButton(flipkart, amazon)}</div>
                                        </div>
                                    );
                                })}

                                {renderConclusion(blog.conclusion)}
                            </Col>
                            <Col xs={12} md={4}>
                                <div className="right">
                                    <div id="ad">Space For Ad</div>

                                    <div id="quest">
                                        {blog.questions.map((value, index) => {
                                            return (
                                                <div className="quest-container">
                                                    <div id={`question_${index}`}>
                                                        {value.question}
                                                        <span
                                                            id={`question_button_${index}`}
                                                            onClick={() => {
                                                                openAnswer(index);
                                                            }}
                                                        >
                                                            <svg
                                                                width="1em"
                                                                height="1em"
                                                                viewBox="0 0 16 16"
                                                                className="bi bi-chevron-down"
                                                                fill="currentColor"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                                                                />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                    <p id={`answer_${index}`}>{value.answer}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </main>
                </Container>
            }
        </div>
    );
};

