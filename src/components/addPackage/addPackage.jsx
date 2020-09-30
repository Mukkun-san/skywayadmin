import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import SideSlide from "../sideslide/sideslide";
import RichEditor from "./RichEditor/richeditor";
import ImageUploader from "react-images-upload";
import AddPricing from "./addPricing/AddPricing";
import JunglePricing from "./junglePricing/JunglePricing";
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

const AddPackage = ({ show, hideRSideBar, title }) => {
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
    }

    let [packageDetails, setPackageDetails] = useState(emptyPackageDetails)
    let [images, setImages] = useState([])
    let [totalUpPercent, setTotalUpPercent] = useState(0)
    let [ImgUpload, setImgUpload] = useState(false)
    let [imgUploadNb, setImgUploadNb] = useState(0)
    let [addingPackage, setaddingPackage] = useState(false)
    let [popperMsg, setpopperMsg] = useState(null)

    useEffect(() => {
        console.log(packageDetails);
        return () => {
            //cleanup
        }
    })

    function clearPackageDetails() {
        setPackageDetails(emptyPackageDetails);
    }

    function uploadImages() {
        return new Promise((resolve, reject) => {
            const randomstring = require("randomstring");

            // Start Upload Tasks
            let uploadTasks = [];
            images.forEach((picture, i) => {
                const EXT = picture.type.substr(picture.type.lastIndexOf("."), picture.type.length)
                const PATH = 'Packages/Images/' + Date.now() + '_' + randomstring.generate() + EXT;
                uploadTasks[i] = (fbStorage().ref().child(PATH).put(picture));
                setImgUpload(true)
            })

            // Add Event Listeners To Upload Tasks
            let ImgUrls = [];
            uploadTasks.forEach((uploadTask) => {
                uploadTask.on('state_changed', function (snapshot) {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    progress = Math.round(progress);
                    setTotalUpPercent(totalUpPercent + progress)
                }, function (error) { // Upload Failed
                    setImgUpload(false)
                    setpopperMsg(error)
                    reject({ error: "Error occurred while ImgUpload images", log: error })
                }, function () { // Upload Success
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        ImgUrls.push(downloadURL)
                        setImgUploadNb(imgUploadNb++);
                        setPackageDetails({ ...packageDetails, galleryImagesUrls: ImgUrls })

                        if (imgUploadNb === images.length) {
                            setImgUpload(false);
                            setaddingPackage(true);
                            let timer = setInterval(function () {
                                var test = false;
                                if (ImgUrls.length === images.length) {
                                    test = true
                                }
                                if (test) {
                                    console.log('All images uploaded');
                                    setImgUploadNb(0);
                                    resolve(ImgUrls)
                                    clearInterval(timer);
                                }
                            }, 250);
                        }
                    }).catch((err) => {
                        console.log(err);
                        reject(err);
                    });;

                })
            })
        })
    }

    function submitPkg() {
        axios.post('http://localhost:4545/api/v1/packages/addPackage', packageDetails).then((newPkg) => {
            console.log(newPkg);
            store.dispatch({ type: "ADD_PACKAGE", payload: newPkg.data.result });
            setaddingPackage(false);
            hideRSideBar();
            setTimeout(() => {
                setpopperMsg('Package "' + newPkg.data.result.packageName + '" was successfully added.');
                clearPackageDetails()
            }, 250);
        }).catch((err) => {
            setaddingPackage(false);
            console.log(err);
        });
    }

    function submitDetails() {
        uploadImages().then((imgURIs) => {
            if (imgURIs.error) {
                alert(imgURIs.error)
            } else {
                packageDetails.galleryImagesUrls = imgURIs;
                packageDetails.imageUrl = imgURIs[0];
                submitPkg();
            }
        }).catch((err) => {
            setpopperMsg(err)
        });;
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

    function loadingBar() {
        let message = '';
        let barColor = '';
        if (ImgUpload) {
            message = `Uploading Gallery Images... ( ${imgUploadNb} / ${images.length} )`;
            barColor = "bg-info";
        } else if (addingPackage) {
            message = 'Adding Package "' + packageDetails.packageName + '" ...';
            barColor = "bg-success";
        }
        return (
            <div className="float-left" style={{ backgroundColor: "#FFF", display: "block", position: 'fixed', zIndex: 10000, width: ref.current ? ref.current.offsetWidth + 'px' : 0 }}>
                < h6 className="text-center py-3 font-weight-regular" > {message}</h6 >
                <div className="progress" style={{ height: "10px" }} >
                    <div className={`progress-bar progress-bar-striped progress-bar-animated ${barColor}`} role="progressbar" style={{ width: "100%" }} aria-valuenow="100" aria-valuemin="100" aria-valuemax="100"></div>
                </div>
            </div >
        )
    }

    return (
        <div ref={ref}>
            <SideSlide
                show={show} hideRSideBar={hideRSideBar} title={title} onSubmit={(e) => {
                    validatePackageDetails(e);
                }}>

                {ImgUpload || addingPackage ?
                    <div style={{ display: "block", position: 'fixed', width: '100%', height: '100%', zIndex: 5000, backgroundColor: "#0003" }} >
                    </div> : ""
                }
                {ImgUpload || addingPackage ?
                    loadingBar() : ""
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
                    {packageDetails.category[0] === "JUNGLE LODGES"
                        ?
                        <JunglePricing onChange={(val) => { setPackageDetails({ ...packageDetails, pricing: val }) }} />
                        :
                        <AddPricing onChange={(val) => { setPackageDetails({ ...packageDetails, pricing: val }) }} />
                    }
                    <Include onChange={(val) => { setPackageDetails({ ...packageDetails, includeExclude: { ...packageDetails.includeExclude, include: val } }) }} />
                    <Exclude onChange={(val) => { setPackageDetails({ ...packageDetails, includeExclude: { ...packageDetails.includeExclude, exclude: val } }) }} />
                    <Itinerary onChange={(val) => { setPackageDetails({ ...packageDetails, itinerary: val }) }} />
                    <Hotels onChange={(val) => { setPackageDetails({ ...packageDetails, hotels: val }) }} />
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
