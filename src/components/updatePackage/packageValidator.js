import isEmpty from 'is-empty'

function validatePackage(pkg) {
    let errors = []

    if (isEmpty(pkg.packageName)) {
        errors.push('PACKAGE NAME is empty')
    }
    if (isEmpty(pkg.category[0])) {
        errors.push('Category is empty')
    }
    if (isEmpty(pkg.place)) {
        errors.push('PLACES is empty')
    }
    if (isEmpty(pkg.duration)) {
        errors.push('DURATION is empty')
    }
    if (isEmpty(pkg.overview)) {
        errors.push('OVERVIEW is empty')
    }
    if (isEmpty(pkg.imagesAltAttrs)) {
        errors.push('Image Alt Attributes is empty')
    }
    if (isEmpty(pkg.images)) {
        errors.push('No images were uploaded')
    }
    if (isEmpty(pkg.pricing)) {
        errors.push('PRICING is empty')
    }
    if (isEmpty(pkg.includeExclude.include)) {
        errors.push('INCLUDE is empty')
    }
    if (isEmpty(pkg.includeExclude.exclude)) {
        errors.push('EXCLUDE is empty')
    }
    if (isEmpty(pkg.itinerary)) {
        errors.push('ITINERARY is empty')
    }
    if (isEmpty(pkg.hotels)) {
        errors.push('HOTELS is empty')
    }
    if (isEmpty(pkg.description)) {
        errors.push('DESCRIPTION is empty')
    }
    if (isEmpty(pkg.seo.metaKeys) || isEmpty(pkg.seo.metaDesc) || isEmpty(pkg.seo.metaKeys) || isEmpty(pkg.seo.title) || isEmpty(pkg.seo.url)) {
        errors.push('seo not completed')
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
