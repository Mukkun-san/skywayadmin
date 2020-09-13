import isEmpty from 'is-empty'

function validatePackage(pkg) {
    let errors = []

    if (isEmpty(pkg.place)) {
        errors.push('Place is empty')
    }
    if (isEmpty(pkg.duration)) {
        errors.push('Duration is empty')
    }
    if (isEmpty(pkg.imageUrl)) {
        errors.push('Image url is empty')
    }
    if (isEmpty(pkg.overview)) {
        errors.push('Image url is empty')
    }
    if (isEmpty(pkg.galleryImagesUrls)) {
        errors.push('galleryImagesUrls is empty')
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

    if (errors.length === 0) {
        return {
            result: true,
            errors: null,
        }
    } else {
        return {
            result: false,
            errors: errors,
        }
    }
}

export default validatePackage
