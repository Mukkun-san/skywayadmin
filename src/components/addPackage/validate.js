const isEmpty = require('is-empty')

function validatePackage(pkg, imgs) {
    let errors = []

    if (isEmpty(imgs)) {
        errors.push('No Images Uploaded')
    }

    if (isEmpty(pkg.place)) {
        errors.push('Place is empty')
    }
    if (isEmpty(pkg.duration)) {
        errors.push('Duration is empty')
    }
    if (isEmpty(pkg.overview)) {
        errors.push('Image url is empty')
    }
    if (isEmpty(pkg.pricing)) {
        errors.push('pricing is empty')
    }
    if (isEmpty(pkg.includeExclude)) {
        errors.push('includeExclude is empty')
    }
    if (isEmpty(pkg.itinerary)) {
        errors.push('itinerary is empty')
    }
    if (isEmpty(pkg.hotels)) {
        errors.push('hotels is empty')
    }
    if (isEmpty(pkg.description)) {
        errors.push('description is empty')
    }
    if (isEmpty(pkg.packageName)) {
        errors.push('packageName is empty')
    }
    if (isEmpty(pkg.termsAndConditions)) {
        errors.push('termsAndConditions is empty')
    }

    if (errors.length === 0) {
        return {
            valid: true,
            errors: null,
        }
    } else {
        return {
            valid: false,
            errors: errors,
        }
    }
}

module.exports = validatePackage
