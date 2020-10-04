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
import { toast } from 'react-toastify';

const UpdatePackage = ({ oldPkg, show, hideRSideBar, title }) => {
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
        seo: {
            url: '',
            metaKeys: '',
            metaDesc: ''
        }
    }

    let [packageDetails, setPackageDetails] = useState(emptyPackageDetails)
    let [images, setImages] = useState([])
    let [totalUpPercent, setTotalUpPercent] = useState(0)
    let [ImgUpload, setImgUpload] = useState(false)
    let [imgUploadNb, setImgUploadNb] = useState(0)
    let [addingPackage, setaddingPackage] = useState(false)
    let [altAttrs, setAltAttrs] = useState("")

    useEffect(() => {
        if (oldPkg._id && !packageDetails._id) {
            setPackageDetails(oldPkg)
            setAltAttrs(oldPkg.imagesAltAttrs.join("/"))
        }
    }, [oldPkg, packageDetails, hideRSideBar, show])

    if (oldPkg._id && !packageDetails._id) {
        packageDetails = oldPkg;
        altAttrs = oldPkg.imagesAltAttrs.join("/")
    }

    function imagesGalleryChange(pictures) {
        setImages(pictures)
    }

    console.log(packageDetails.seo);

    function clearPackageDetails() {
        setPackageDetails(emptyPackageDetails)
        setImages([])
        setAltAttrs("")
        setImgUploadNb(0)
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
            uploadTasks.forEach((uploadTask, index) => {
                uploadTask.on('state_changed', function (snapshot) {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    progress = Math.round(progress);
                    setTotalUpPercent(totalUpPercent + progress)
                }, function (error) { // Upload Failed
                    setImgUpload(false)
                    toastAlert(error)
                    reject({ error: "Error occurred while ImgUpload images", log: error })
                }, function () { // Upload Success
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        ImgUrls[index] = downloadURL
                        setImgUploadNb(imgUploadNb + 1);
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
        setaddingPackage(true);
        axios.post('https://skyway-server.herokuapp.com//api/v1/packages/addPackage', packageDetails).then((newPkg) => {
            console.log(newPkg);
            store.dispatch({ type: "ADD_PACKAGE", payload: newPkg.data.result });
            store.dispatch({ type: "DELETE_PACKAGE", payload: oldPkg._id });
            setTimeout(() => {
                setaddingPackage(false);
                hideRSideBar();
                toastAlert(<p className="m-3">Package "{newPkg.data.result.packageName}" was successfully updated.</p>, "success");
                clearPackageDetails()
            }, 750);

        }).catch((err) => {
            setaddingPackage(false);
            console.log(err);
        });
    }

    function submitDetails() {
        if (!images.length) {
            delete packageDetails._id
            submitPkg();
        }
        else {
            uploadImages().then((imgURIs) => {
                if (imgURIs.error) {
                    alert(imgURIs.error)
                } else {
                    packageDetails.galleryImagesUrls = imgURIs;
                    packageDetails.imageUrl = imgURIs[0];
                    submitPkg();
                }

            }).catch((err) => {
                toastAlert(err)
            });;
        }
    }

    function validatePackageDetails(e) {
        console.log(validatePackage(packageDetails));

        e.preventDefault()
        if (altAttrs) {
            packageDetails.imagesAltAttrs = altAttrs.split("/");
        }
        packageDetails.priceStartsAt = pricingAt();
        packageDetails.images = images;
        if (validatePackage(packageDetails).result) {
            submitDetails()
        }
        else {
            let errors = '';
            if (validatePackage(packageDetails).errors) {
                errors = validatePackage(packageDetails).errors[0]
            }
            toastAlert(<pre style={{ color: "white" }}>{errors}</pre>, "error")
        }
    }

    function toastAlert(message, type) {
        switch (type) {
            case "error":
                toast.error(message, {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                break;

            case "success":
                toast.success(message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                break;

            default:
                break;
        }

    }

    function pricingAt() {
        let prices = [];

        if (packageDetails.category[0] === "JUNGLE LODGES") {
            packageDetails.pricing.forEach(price => {
                if (price.cost.singleOcc.weekday !== 0) {
                    prices.push(price.cost.singleOcc.weekday)
                }
            });
        }
        else {
            packageDetails.pricing.forEach(price => {
                if (price.name.trim().toLowerCase() !== "Children between 6 and 12 years".toLowerCase() && price.name.trim().toLowerCase() !== "Children below 6 years".toLowerCase()) {
                    prices.push(price.cost.standard)
                }
            });
        }

        let minPrice = Math.min(...prices)

        return minPrice;
    }

    function loadingBar() {
        let message = '';
        let barColor = '';
        if (ImgUpload) {
            message = `Uploading Gallery Images... ( ${imgUploadNb} / ${images.length} )`;
            barColor = "bg-info";
        } else if (addingPackage) {
            message = 'Updating Package "' + packageDetails.packageName + '" ...';
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

    // bug fixes
    if (oldPkg.imagesAltAttrs && !altAttrs) {
        setAltAttrs(oldPkg.imagesAltAttrs.join("/"))
    }
    console.log(oldPkg);
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

                    <Category oldVal={oldPkg.category} onChange={(val) => { setPackageDetails({ ...packageDetails, category: val }) }} />

                    <Places oldVal={oldPkg.place} onChange={(val) => { setPackageDetails({ ...packageDetails, place: val }) }} />

                    <div className="form-group">
                        <h4>Duration</h4>
                        <input required={false} type="text" className={"form-control"} value={packageDetails.duration}
                            onChange={e => { setPackageDetails({ ...packageDetails, duration: e.target.value }); }} />
                    </div>

                    <div className="form-group">
                        <h4 className="form-label">Overview</h4>
                        <RichEditor
                            oldVal={oldPkg.overview}
                            onChange={(val) => { setPackageDetails({ ...packageDetails, overview: val }) }}
                        />
                    </div>

                    <div className="form-group">
                        <h4 className="form-label">Alt Attributes</h4>
                        <img className="pl-5 pb-2 pr-1" src="https://img.icons8.com/emoji/20/000000/warning-emoji.png" alt="" />
                        <p className="d-inline text-danger">Insert alt attributes below separated by a "/".</p>
                        <input required={false} type="text" className={"mt-3 form-control"} value={altAttrs}
                            onChange={e => { altAttrs ? setAltAttrs(e.target.value) : setAltAttrs(oldPkg.imagesAltAttrs.join("/")) }} />
                    </div>

                    <div className="form-group">
                        <h4 className="form-label">Gallery image upload</h4>
                        <ImageUploader
                            withPreview={true}
                            withIcon={true}
                            onChange={(pictures) => { imagesGalleryChange(pictures) }}
                            imgExtension={[".jpg", ".jpeg", ".png", ".gif"]}
                            maxFileSize={7242880}
                        />
                    </div>
                    {packageDetails.category[0] === "JUNGLE LODGES"
                        ?
                        <JunglePricing oldVal={oldPkg.pricing} onChange={(val) => { setPackageDetails({ ...packageDetails, pricing: val }) }} />
                        :
                        <AddPricing oldVal={oldPkg.pricing} onChange={(val) => { setPackageDetails({ ...packageDetails, pricing: val }) }} />
                    }
                    <Include oldVal={oldPkg.includeExclude ? oldPkg.includeExclude.include : ""} onChange={(val) => { setPackageDetails({ ...packageDetails, includeExclude: { ...packageDetails.includeExclude, include: val } }) }} />
                    <Exclude oldVal={oldPkg.includeExclude ? oldPkg.includeExclude.exclude : ""} onChange={(val) => { setPackageDetails({ ...packageDetails, includeExclude: { ...packageDetails.includeExclude, exclude: val } }) }} />
                    <Itinerary oldVal={oldPkg.itinerary} onChange={(val) => { setPackageDetails({ ...packageDetails, itinerary: val }) }} />
                    <Hotels oldVal={oldPkg.hotels} onChange={(val) => { setPackageDetails({ ...packageDetails, hotels: val }) }} />
                    <br />

                    <h2>Description</h2>
                    <RichEditor
                        oldVal={oldPkg.description}
                        onChange={(val) => { setPackageDetails({ ...packageDetails, description: val }) }}
                    />

                    <br />

                    <div className="form-group">
                        <h3>SEO</h3>
                        <h6 className="form-label font-weight-normal">Meta Keywords</h6>
                        <input required={false} type="text" className={"form-control mb-3"} value={packageDetails.seo.metaKeys}
                            onChange={e => { setPackageDetails({ ...packageDetails, seo: { ...packageDetails.seo, metaKeys: e.target.value } }) }} />
                        <h6 className="form-label font-weight-normal">Meta Description</h6>
                        <input required={false} type="text" className={"form-control mb-3"} value={packageDetails.seo.metaDesc}
                            onChange={e => { setPackageDetails({ ...packageDetails, seo: { ...packageDetails.seo, metaDesc: e.target.value } }) }} />
                        {/* <h6 className="form-label font-weight-normal">Page Title</h6>
                        <input required={false} type="text" className={"form-control mb-3"} value={seo.title}
                            onChange={e => { setSEO({ ...seo, title: e.target.value }); }} /> */}
                        <h6 className="form-label font-weight-normal">Package Code (URL)</h6>
                        <input required={false} type="text" className={"form-control mb-3"} value={packageDetails.seo.url}
                            onChange={e => { setPackageDetails({ ...packageDetails, seo: { ...packageDetails.seo, url: e.target.value } }) }} />
                    </div>

                    <button className={'btn btn-primary mt-3'} type="submit">
                        Submit
                </button>

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
export default connect(mapProp, mapActions)(UpdatePackage);