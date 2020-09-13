import React, { useState, useRef, useEffect, useCallback } from "react";
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
import validatePackage from './packageValidator';
import { fbStorage } from '../../utils/firebase';

const AddPackage = ({ show, hideFun, title, addPackage }) => {
    const ref = useRef(null);

    const emptyPackageDetails = {
        category: [],
        includeExclude: {
            include: [],
            exclude: []
        },
        galleryImagesUrls: [],
        imageUrl: '',
        pricing: [],
        itinerary: [],
        hotels: [],
        place: '',
        duration: '',
        overview: '',
        packageName: '',
        description: '',
        termsAndConditions: ''
    }

    let [packageDetails, setPackageDetails] = useState(emptyPackageDetails)

    const [images, setImages] = useState([])
    const [totalUpPercent, setTotalUpPercent] = useState(0)
    const [uploading, setUploading] = useState(false)
    let [imgUploadNb, setImgUploadNb] = useState(1)


    function uploadImages() {

        return new Promise((resolve, reject) => {
            const randomstring = require("randomstring");
            let uploadTasks = [];
            images.forEach((picture, i) => {
                const EXT = picture.type.substr(picture.type.lastIndexOf("."), picture.type.length)
                const PATH = 'Packages/Images/' + Date.now() + '_' + randomstring.generate() + EXT;
                uploadTasks[i] = (fbStorage().ref().child(PATH).put(picture));
                setUploading(true)
            })

            let ImgUrls = [];
            uploadTasks.forEach((uploadTask) => {
                uploadTask.on('state_changed', function (snapshot) {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    progress = Math.round(progress);

                    setTotalUpPercent(totalUpPercent + progress)


                }, function (error) {
                    setUploading(false)
                    reject({ error: "Error occurred while uploading images" })
                }, async function () {

                    let downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                    console.log('File available at', downloadURL);
                    ImgUrls.push(downloadURL)
                    setImgUploadNb(imgUploadNb++);
                    setPackageDetails({ ...packageDetails, galleryImagesUrls: ImgUrls })

                    if (imgUploadNb === images.length) {
                        console.log('All images finished upload');
                        setUploading(false);
                        let timer = setInterval(function () {
                            var test = false;
                            if (ImgUrls.length == images.length) {
                                test = true
                            }
                            console.log(test);
                            if (test) {
                                resolve(ImgUrls)
                                clearInterval(timer);
                            }
                        }, 750);
                    }
                })
            })
        })



    }

    async function submitPkg() {
        try {
            const newPkg = await axios.post('https://skyway-server.herokuapp.com/api/v1/packages/addPackage', packageDetails);
            console.log(newPkg);
            store.dispatch({ type: "ADD_PACKAGE", payload: newPkg.data.result });
        } catch (error) {
            console.log(error);
        }
    }

    async function submitDetails() {
        let imgs = await uploadImages();
        if (imgs.error) {
            alert(imgs.error)
        } else {
            packageDetails.galleryImagesUrls = imgs;
            packageDetails.imageUrl = imgs[0];
            submitPkg(imgs);
        }
    }

    function validatePackageDetails(e) {
        e.preventDefault()
        if (validatePackage(packageDetails).result && images.length) {
            submitDetails()
        }
        else {
            let errors = '';
            validatePackage(packageDetails).errors.forEach(err => {
                errors += err + '\n';
            });
            if (!images.length) {
                errors += 'No images uploaded!\n';
            }
            alert(errors);
        }
    }

    return (
        <div ref={ref}>
            <SideSlide
                show={show} hideFun={hideFun} title={title} onSubmit={(e) => {
                    validatePackageDetails(e);
                }}>

                {uploading ?
                    <div style={{ display: "block", position: 'fixed', width: '100%', height: '100%', zIndex: 5000, backgroundColor: "#0003" }} >
                    </div> : ""
                }
                {uploading ?
                    <div className="float-left" style={{ backgroundColor: "#FFF", display: "block", position: 'fixed', zIndex: 10000, width: ref.current ? ref.current.offsetWidth + 'px' : 0 }}>
                        <h6 className="text-center py-3 font-weight-light">Uploading Images... ({imgUploadNb}/{images.length})
                        {/* <small>{totalUpPercent + "%"}.</small> */}
                        </h6>
                        <div className="progress" style={{ height: "10px" }} >
                            <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style={{ width: "100%" }} aria-valuenow="100" aria-valuemin="100" aria-valuemax="100"></div>
                        </div>
                    </div> : ""
                }
                <form
                    style={{ padding: "30px", height: "90%", overflow: 'scroll', backgroundColor: '#fafafa' }}
                    onSubmit={validatePackageDetails}
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
                            onChange={(pictures) => { setImages(pictures) }}
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
            </SideSlide >
        </div>);
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
