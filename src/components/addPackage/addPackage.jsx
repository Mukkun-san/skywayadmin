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
import Category from "./category/addCategory";
import Places from "./places/addPlaces";
import { addPackage } from '../../store/actions'
import axios from 'axios'
import store from '../../store/index'
import validatePackage from './validate';

const AddPackage = ({ show, hideFun, title, addPackage }) => {

    const emptyPackageDetails = {
        category: [],
        includeExclude: {
            include: [],
            exclude: []
        },
        galleryImagesUrls: [],
        pricing: [],
        itinerary: [],
        hotels: [],
        place: '',
        duration: '',
        bannerImageUrl: '',
        overview: '',
        packageName: '',
        description: '',
        termsAndConditions: ''
    }

    const [packageDetails, setPackageDetails] = useState(emptyPackageDetails)

    const [pictures, setPictures] = useState([]);

    async function submitDetails(e) {
        e.preventDefault();
        if (validatePackage(packageDetails, pictures).valid) {

            let Data = new FormData();
            pictures.forEach(img => {
                Data.append("images", img);
            });
            Data.append("packageDetails", JSON.stringify(packageDetails))
            const newPkg = await axios.post('https://skyway-server.herokuapp.com/api/v1/packages/addPackage', Data)
            console.log(newPkg);
            store.dispatch({ type: "ADD_PACKAGE", payload: newPkg.data.result })
        }
        else {
            let errors = '';
            validatePackage(packageDetails, pictures).errors.forEach(err => {
                errors += err + '\n';
            });
            alert(errors);
        }
    }

    return (
        <SideSlide show={show} hideFun={hideFun} title={title} onSubmit={(e) => {
            e.preventDefault();
            submitDetails(e);
        }}>
            <form
                style={{ padding: "30px", height: "90%", overflow: 'scroll', backgroundColor: '#fafafa' }}
                onSubmit={submitDetails}
            >

                <div className="form-group">
                    <h4 className="form-label">Package Name</h4>
                    <input required={false} type="text" className={"form-control"} value={packageDetails.packageName}
                        onChange={e => { setPackageDetails({ ...packageDetails, packageName: e.target.value }); }} />
                </div>

                <Category onChange={(val) => { setPackageDetails({ ...packageDetails, category: val }) }} />

                <Places onChange={(val) => { setPackageDetails({ ...packageDetails, place: val }) }} />

                <div className="form-group">
                    <h4>Duration</h4>
                    <input required={false} type="text" className={"form-control"} value={packageDetails.duration}
                        onChange={e => { setPackageDetails({ ...packageDetails, duration: e.target.value }); }} />
                </div>

                <div className="form-group">
                    <h4 className="form-label">Overview</h4>
                    <RichEditor
                        onChange={(val) => { setPackageDetails({ ...packageDetails, overview: val }) }}
                    />
                </div>

                <div className="form-group">
                    <h4 className="form-label">Gallery image upload</h4>
                    <ImageUploader
                        withPreview={true}
                        withIcon={true}
                        onChange={(pictures) => { setPictures(pictures); }}
                        imgExtension={[".jpg", ".jpeg", ".png", ".gif"]}
                        maxFileSize={7242880}
                    />
                </div>

                <AddPricing onChange={(val) => { setPackageDetails({ ...packageDetails, pricing: val }) }} />
                <Include onChange={(val) => { setPackageDetails({ ...packageDetails, includeExclude: { ...packageDetails.includeExclude, include: val } }) }} />
                <Exclude onChange={(val) => { setPackageDetails({ ...packageDetails, includeExclude: { ...packageDetails.includeExclude, exclude: val } }) }} />
                <Itinerary onChange={(val) => { setPackageDetails({ ...packageDetails, itinerary: val }) }} />
                <Hotels onChange={(val) => { setPackageDetails({ ...packageDetails, hotels: val }) }} />
                <br />
                <h2>Terms and condition</h2>
                <RichEditor
                    onChange={(val) => { setPackageDetails({ ...packageDetails, termsAndConditions: val }) }} />
                <br />
                <h2>Description</h2>
                <RichEditor
                    onChange={(val) => { setPackageDetails({ ...packageDetails, description: val }) }}
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
