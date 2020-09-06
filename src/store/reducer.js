const { AUTH_STATE, ALL_PACKAGE_DETAIL } = require("./constants");

let intitialState = {
    authState: false,
    packageDetail: null
}

let reducerFunction = (state = intitialState, action) => {
    switch (action.type) {
        case AUTH_STATE:
            return {
                ...state,
                authState: action.payload
            }

        case ALL_PACKAGE_DETAIL:
            console.log("allpkgdetails", action.payload);
            return {
                ...state,
                packageDetail: action.payload
            }

        case "tempPackageDetail":
            console.log(action.payload);
            break;

        case "DELETE_PACKAGE":
            fetch('http://localhost:4545/api/v1/packages/removePackage/' + action.payload, {
                method: 'DELETE',
            }).then(response => response).then((res) => {
                window.location.reload();
                console.log(res)
            }
            )
            return {
                ...state,
                deletePackage: action.payload
            }

        default:
            return state;
    }
}

export default reducerFunction