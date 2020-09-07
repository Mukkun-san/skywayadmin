let tempPackageDetails = (state = {}, action) => {
    switch (action.type) {
        case "ADD_overview":
            return {
                ...state,
                overview: action.payload
            }
        case "ADD_includeExclude":
            return {
                ...state,
                includeExclude: action.payload
            }
        case "ADD_galleryImagesUrls":
            return {
                ...state,
                galleryImagesUrls: action.payload
            }
        case "ADD_pricing":
            return {
                ...state,
                pricing: action.payload
            }
        case "ADD_itinerary":
            return {
                ...state,
                itinerary: action.payload
            }
        case "ADD_hotels":
            return {
                ...state,
                hotels: action.payload
            }
        case "ADD_place":
            return {
                ...state,
                place: action.payload
            }
        case "ADD_duration":
            return {
                ...state,
                duration: action.payload
            }
        case "ADD_imageUrl":
            return {
                ...state,
                imageUrl: action.payload
            }
        case "ADD_packageName":
            return {
                ...state,
                packageName: action.payload
            }
        case "ADD_description":
            return {
                ...state,
                description: action.payload
            }


        default:
            return state;
    }
}

export default tempPackageDetails;