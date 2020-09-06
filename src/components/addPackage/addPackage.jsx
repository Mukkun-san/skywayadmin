import React, { useState } from "react";
import { connect } from "react-redux";
import SideSlide from "../sideslide/sideslide";
import RichEditor from "./RichEditor/richeditor";
import ImageUploader from "react-images-upload";
import AddPricing from "./addPricing/AddPricing";
import Include from "./include/include";
import Exclude from "./exclude/exclude";
import Itinerary from "./itinerary/itinerary";
import Hotels from "./hotels/hotels";
import { addPackage } from '../../store/actions'
import axios from 'axios'

const AddPackage = ({ show, hideFun, title, addPackage }) => {

    // let [data, setData] = useState([])

    function submitDetails() {
        addPackage({ name: packageName, galleryImagesUrls: pictures[0], })

        function imgUpload() {
            var formData = new FormData();
            pictures[0].forEach(img => {
                formData.append("images", img);

            });

            axios.post('http://localhost:4545/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res) => {
                console.log(res);
            }
            ).catch((err) => {
                console.log(err)
            }
            )
        }
    }

    const [packageName, setPackageName] = useState('');
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

                <button className={'btn btn-primary mt-3'} onClick={(e) => {
                    submitDetails();
                }
                }>
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

function mapProp(state) {
    return {
        tempPackage: state.tempPackage,
    };
}

function mapActions(dispatch) {
    return {
        addPackage(details) {
            dispatch(addPackage(details))
        }
    }
}

export default connect(mapProp, mapActions)(AddPackage);
