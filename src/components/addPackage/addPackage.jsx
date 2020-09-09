import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import SideSlide from "../sideslide/sideslide";
import RichEditor from "./RichEditor/richeditor";
import ImageUploader from "react-images-upload";
import AddPricing from "./addPricing/AddPricing";
import Include from "./include/include";
import Exclude from "./exclude/exclude";
import Itinerary from "./itinerary/itinerary";
import Hotels from "./hotels/hotels";
import Category from "./category/addCategory";
import Places from "./places/addPlaces";
import { addPackage } from '../../store/actions'
import axios from 'axios'
import store from '../../store/index'

const AddPackage = ({ show, hideFun, title, addPackage }) => {

    const [data, setData] = useState({
        _id: '',
        category: [],
        includeExclude: {
            include: [],
            exclude: []
        },
        galleryImagesUrls: [],
        pricing: [],
        itinerary: [],
        hotels: [],
        places: [],
        duration: "",
        bannerImageUrl: "",
        overview: "",
        packageName: "",
        description: '',
        termsAndConditions: ''
    })

    const [pictures, setPictures] = useState([]);

    const [duration, setDuration] = useState('')

    const onDrop = (picture) => {
        setPictures([...pictures, picture]);
        setData({ ...data, galleryImagesUrls: pictures })
    };

    function submitDetails(e) {
        console.log(data);
        e.preventDefault();
        store.dispatch({ type: "ADD_PACKAGE", payload: data })
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

    return (
        <SideSlide show={show} hideFun={hideFun} title={title} onSubmit={(e) => {
            e.preventDefault();
            submitDetails();
        }}>
            <form
                style={{ padding: "30px", height: "90%", overflow: 'scroll', backgroundColor: '#fafafa' }}
                onSubmit={submitDetails}
            >

                <div className="form-group">
                    <h4 className="form-label">Package Name</h4>
                    <input required type="text" className={"form-control"} value={data.packageName}
                        onChange={e => { setData({ ...data, packageName: e.target.value }); }} />
                </div>

                <Category onChange={(categ) => { setData({ ...data, category: categ }) }} />

                <Places onChange={(places) => { setData({ ...data, places: places }) }} />

                <div className="form-group">
                    <h4>Duration</h4>
                    <input required type="text" className={"form-control"} value={duration}
                        onChange={e => { setDuration(e.target.value); }} />
                </div>

                <div className="form-group">
                    <h4 className="form-label">Overview</h4>
                    <RichEditor
                        onChange={(val) => { setData({ ...data, overview: val }) }}
                    />
                </div>

                <div className="form-group">
                    <h4 className="form-label">Gallery image upload</h4>
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
                <Itinerary onChange={(val) => { setData({ ...data, itinerary: val }) }} />
                <Hotels />
                <br />
                <h2>Terms and condition</h2>
                <RichEditor
                    onChange={(terms) => { setData({ ...data, termsAndConditions: terms }) }} />
                <br />
                <h2>Description</h2>
                <RichEditor
                    onChange={(desc) => { setData({ ...data, description: desc }) }}
                />

                <button className={'btn btn-primary mt-3'} type="submit">
                    Submit
                </button>

                <br />
                <br />
                <br />
                <br />
            </form>
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
