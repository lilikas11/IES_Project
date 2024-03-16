import React from "react";
import { WiredCard } from "wired-elements";
import "../assets/css/styles.css";
import Button from "./button";

const Comment = () => {
    return (
        <>
            <div className="container">
                <form>
                    <fieldset>
                        <legend>Comentários</legend>
                        <div className="row">
                            <p>
                                <textarea
                                    className="form-control w-full"
                                    id="comment"
                                    name="comment"
                                    rows="8"
                                    placeholder="Insert your comment here...."
                                ></textarea>
                            </p>
                            <div className="col-md-6">
                                <Button label={"Submit"} style={{ width: "200px" }} />
                            </div>
                        </div>
                    </fieldset>
                    <div className="row">
                        <div id="answer"></div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Comment;
