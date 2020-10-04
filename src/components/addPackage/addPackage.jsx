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
    let [altAttrs, setAltAttrs] = useState("")
    const [seo, setSEO] = useState({})

    function imagesGalleryChange(pictures) {
        setImages(pictures)
    }

    useEffect(() => {
        console.log(packageDetails, images);
    }, [])

    function clearPackageDetails() {
        setPackageDetails(emptyPackageDetails)
        setImages([])
        setAltAttrs("")
        setSEO({})
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
            uploadTasks.forEach((uploadTask) => {
                uploadTask.on('state_changed', function (snapshot) {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    progress = Math.round(progress);
                    setTotalUpPercent(totalUpPercent + progress)
                }, function (error) { // Upload Failed
                    setImgUpload(false)
                    toastAlert(error, "error")
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
        axios.post('https://skyway-server.herokuapp.com/api/v1/packages/addPackage', packageDetails).then((newPkg) => {
            console.log(newPkg);
            store.dispatch({ type: "ADD_PACKAGE", payload: newPkg.data.result });
            setTimeout(() => {
                setaddingPackage(false);
                hideRSideBar();
                toastAlert(<p className="m-3">Package "{newPkg.data.result.packageName}" was successfully added.'</p>, "success")
                clearPackageDetails()
            }, 1000);
        }).catch((err) => {
            setaddingPackage(false);
            console.log(err);
        });
    }

    function submitDetails() {
        uploadImages().then((imgURIs) => {
            if (imgURIs.error) {
                toastAlert(imgURIs.error, 'error')
            } else {
                packageDetails.galleryImagesUrls = imgURIs;
                packageDetails.imageUrl = imgURIs[0];
                submitPkg();
            }
        }).catch((err) => {
            toastAlert(err, "error")
        });;
    }

    function validatePackageDetails(e) {
        e.preventDefault()
        packageDetails.seo = seo;
        packageDetails.imagesAltAttrs = altAttrs.split("/");
        packageDetails.priceStartsAt = pricingAt();
        packageDetails.images = images;
        if (validatePackage(packageDetails).result && images.length) {
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

                    {/* <ImagesAltAttributes nbimages={images.length} /> */}

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
                        <h4 className="form-label">Alt Attributes</h4>
                        <img className="pl-5 pb-2 pr-1" src="https://img.icons8.com/emoji/20/000000/warning-emoji.png" alt="" />
                        <p className="d-inline text-danger">Insert alt attributes below separated by a "/".</p>
                        <input required={false} type="text" className={"mt-3 form-control"} value={altAttrs}
                            onChange={e => { setAltAttrs(e.target.value); }} />
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

                    <br />

                    <div className="form-group">
                        <h3>SEO</h3>
                        <h6 className="form-label font-weight-normal">Meta Keywords</h6>
                        <input required={false} type="text" className={"form-control mb-3"} value={seo.metaKeys}
                            onChange={e => { setSEO({ ...seo, metaKeys: e.target.value }); }} />
                        <h6 className="form-label font-weight-normal">Meta Description</h6>
                        <input required={false} type="text" className={"form-control mb-3"} value={seo.metaDesc}
                            onChange={e => { setSEO({ ...seo, metaDesc: e.target.value }); }} />
                        {/* <h6 className="form-label font-weight-normal">Page Title</h6>
                        <input required={false} type="text" className={"form-control mb-3"} value={seo.title}
                            onChange={e => { setSEO({ ...seo, title: e.target.value }); }} /> */}
                        <h6 className="form-label font-weight-normal">Package Code (URL)</h6>
                        <input required={false} type="text" className={"form-control mb-3"} value={seo.url}
                            onChange={e => { setSEO({ ...seo, url: e.target.value }); }} />
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

export default connect(mapProp, mapActions)(AddPackage);
