const { AUTH_STATE, ALL_PACKAGE_DETAIL, ADD_PACKAGE, DELETE_PACKAGE } = require("./constants");

let intitialState = {
    authState: false,
    packageDetail: null,
    tempPackage: null,
}

let reducerFunction = (state = intitialState, action) => {
    switch (action.type) {
        case AUTH_STATE:
            return {
                ...state,
                authState: action.payload
            }

        case ALL_PACKAGE_DETAIL:
            console.log("allpkgdetails", { ...state });
            return {
                ...state,
                packageDetail: action.payload
            }

        case ADD_PACKAGE:
            console.log(ADD_PACKAGE, action.payload);
            return {
                ...state,
                tempPackage: action.payload
            }

        case DELETE_PACKAGE:
            fetch('http://localhost:4545/api/v1/packages/removePackage/' + action.payload, {
                method: 'DELETE',
            }).then(response => response)
                .then((res) => { console.log(res) })
                .catch((err) => { console.log(err) });

            return {
                ...state,
                packageDetail: state.packageDetail.filter((item) => item._id !== action.payload)
            }

        default:
            return state;
    }
}

export default reducerFunction