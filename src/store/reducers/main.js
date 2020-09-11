const { AUTH_STATE, ALL_PACKAGE_DETAIL, ADD_PACKAGE, DELETE_PACKAGE } = require("../constants");

let intitialState = {
    authState: false,
    packageDetail: null,
}

let main = (state = intitialState, action) => {
    switch (action.type) {
        case AUTH_STATE:
            return {
                ...state,
                authState: action.payload
            }

        case ALL_PACKAGE_DETAIL:
            return {
                ...state,
                packageDetail: action.payload
            }

        case ADD_PACKAGE:
            let packageDetail = state.packageDetail;
            packageDetail.push(action.payload)
            return {
                ...state,
                packageDetail
            }

        case DELETE_PACKAGE:
            fetch('https://skyway-server.herokuapp.com/api/v1/packages/removePackage/' + action.payload, {
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

export default main