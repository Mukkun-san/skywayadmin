import { AUTH_STATE, ALL_PACKAGE_DETAIL } from "./constants";

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

export let tempPackageDetail = (payload) => {
    return {
        type: "tempPackageDetail",
        payload
    }
}

export let deletePackage = (payload) => {
    return {
        type: "DELETE_PACKAGE",
        payload
    }
}
