import React, { useState } from "react";
import SideSlide from "../sideslide/sideslide";
import RichEditor from "./RichEditor/richeditor";
import ImageUploader from "react-images-upload";
import AddPricing from "./addPricing/AddPricing";
import Include from "./include/include";
import Exclude from "./exclude/exclude";
import Itinerary from "./itinerary/itinerary";
import Hotels from "./hotels/hotels";

const AddPackage = ({ show, hideFun, title }) => {

    // let [data, setData] = useState([])

    const [packageName, setPackageName] = useState([]);
    const [pictures, setPictures] = useState([]);

    const onDrop = (picture) => {
        setPictures([...pictures, picture]);
    };

    return (
        <SideSlide show={show} hideFun={hideFun} title={title}>
            <div
                style={{ padding: "30px", height: "90%", overflow: 'scroll', backgroundColor: '#fafafa' }}
            >
                <div className="form-group">
                    <div className="form-label">Package Name</div>
                    <input type="text" className={"form-control"} value={packageName}
                        onChange={e => { setPackageName(e.target.value); }} />
                </div>
                <div className="form-group">
                    <div className="form-label">Overview</div>
                    <RichEditor />
                </div>
                <div className="form-group">
                    <div className="form-label">Gallery image upload</div>
                    <ImageUploader
                        withPreview={true}
                        withIcon={true}
                        onChange={onDrop}
                        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                        maxFileSize={5242880}
                    />
                </div>
                <AddPricing />
                <Include />
                <Exclude />
                <Itinerary />
                <Hotels />
                <br />
                <h2>Terms and condition</h2>
                <RichEditor onChange={(html) => {

                }} />
                <br />
                <h2>Description</h2>
                <RichEditor onChange={(html) => {

                }} />

                <button className={'btn btn-primary mt-3'}>
                    Submit
                </button>

                <br />
                <br />
                <br />
                <br />
            </div>
        </SideSlide>
    );
};

export default AddPackage;
