import { AUTH_STATE, ALL_PACKAGE_DETAIL, ADD_PACKAGE, DELETE_PACKAGE } from "./constants";

export let setAuthState = (payload) => {
    return {
        type: AUTH_STATE,
        payload
    }
}

export let setPackageDetail = (payload) => {
    return {
        type: ALL_PACKAGE_DETAIL,
        payload
    }
}

export let addPackage = (payload) => {
    return {
        type: ADD_PACKAGE,
        payload
    }
}

export let deletePackage = (payload) => {
    return {
        type: DELETE_PACKAGE,
        payload
    }
}
