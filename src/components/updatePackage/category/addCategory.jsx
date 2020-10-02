import React, { useState, useEffect } from "react";

const Category = ({ onChange, oldVal }) => {
    const [category, setCategory] = useState('')
    const [subCategory1, setSubCategory1] = useState('')
    const [subCategory2, setSubCategory2] = useState('')
    const [subCategory3, setSubCategory3] = useState('')
    const [subCategories1, setSubCategories1] = useState(null)
    const [subCategories2, setSubCategories2] = useState(null)
    const [subCategories3, setSubCategories3] = useState(null)

    function noSelect() {
        return (!category && !subCategory1 && !subCategory2 && !subCategory3)
    }
    useEffect(() => {
        if (oldVal && noSelect) {
            setCategory(oldVal[0])
            renderSubCategories1(oldVal[0])
            setSubCategory1(oldVal[1])
            renderSubCategories2(oldVal[1])
            setSubCategory2(oldVal[2])
            renderSubCategories3(oldVal[2])
            setSubCategory3(oldVal[3])
            onChange([oldVal[0], oldVal[1], oldVal[2], oldVal[3]])
        }
    }, [oldVal])

    useEffect(() => {
        onChange([category, subCategory1, subCategory2, subCategory3])
    }, [category, subCategory1, subCategory2, subCategory3])

    const renderSubCategories1 = (categ) => {
        setCategory(categ);
        setSubCategory1('')
        setSubCategories1(null);
        setSubCategory2('')
        setSubCategories2(null);
        setSubCategory3('')
        setSubCategories3(null);
        switch (categ) {
            case "HOLIDAYS":
                setSubCategories1([
                    'Discover India Tours for Foreign tourists visiting India',
                    'India Tours for Indian tourists to travel within India',
                    'Honeymoon Packages',
                    'International',
                    'Destination'
                ]);
                break;
            case "EXPERIENCES":
                setSubCategories1([
                    'AYURVEDA RESORTS / PACKAGES',
                    'DAY TRIPS / EXCURSIONS',
                    'INDIAN CITY TOURS',
                    'MYSORE DASARA TOURS',
                    'TIRUPATI SPECIAL DARSHAN TOURS',
                    'WEEKEND GETAWAYS',
                ]);
                break;
            case "GROUP TOURS":
                setSubCategories1([
                    'India Tours',
                    'Foreign Tours'
                ]);
                break;
            default:
                break;
        }
    }

    const renderSubCategories2 = (categ) => {
        setSubCategory1(categ);
        setSubCategory2('')
        setSubCategories2(null);
        setSubCategory3('')
        setSubCategories3(null);
        switch (categ) {
            case "India Tours for Indian tourists to travel within India":
                setSubCategories2([
                    'Central India',
                    'North India',
                    'South India',
                    'East India',
                    'West India'
                ]);
                break;
            case "Honeymoon Packages":
                setSubCategories2([
                    'India',
                    'International'
                ]);
                break;
            case "International":
                setSubCategories2([
                    'Asia',
                    'Africa',
                    'Australia and New zealand',
                    'Europe',
                    'North and South america',
                    'Honeymoon Packages'
                ]);
                break;
            case "Destination":
                setSubCategories2([
                    'Karnataka Tours',
                    'Kerala Tours',
                    'Weekend Getaways',
                    'City Breaks',
                    'Coach Tours',
                ]);
                break;
            default:

                break;
        }
    }

    const renderSubCategories3 = (categ) => {
        setSubCategory2(categ);
        setSubCategory3('')
        setSubCategories3(null);
        switch (categ) {
            case "Asia":
                setSubCategories3([
                    'Bali',
                    'Bhutan',
                    'Cambodia',
                    'China',
                    'Dubai',
                    'Malaysia',
                    'Maldives',
                    'Nepal',
                    'Singapore',
                    'Sri Lanka',
                    'Thailand',
                    'Vietnam'
                ])
                break;
            case "Africa":
                setSubCategories3([
                    'Kenya',
                    'Mauritius',
                    'South Africa'
                ])
                break;
            default:
                break;
        }

    }

    return (
        <div className="form-group">
            <h4>Category</h4>
            <select required={false} className="custom-select my-2" value={category}
                onChange={e => { renderSubCategories1(e.target.value); onChange([category, subCategory1, subCategory2, subCategory3]) }}>
                <option value="" disabled
                ></option>
                <option value="HOLIDAYS" >HOLIDAYS</option>
                <option value="EXPERIENCES">EXPERIENCES</option>
                <option value="JUNGLE LODGES">JUNGLE LODGES</option>
                <option value="GROUP TOURS">GROUP TOURS</option>
            </select>

            {subCategories1 ?
                <select required={false} className="custom-select my-2" value={subCategory1}
                    onChange={e => { renderSubCategories2(e.target.value); onChange([category, subCategory1, subCategory2, subCategory3]) }}>
                    <option value="" disabled></option>
                    {subCategories1.map((subCateg, i) =>
                        <option value={subCateg} key={"subcateg" + i}>{subCateg}</option>
                    )}
                </select>
                : ""
            }

            {subCategories2 ?
                <select required={false} className="custom-select my-2" value={subCategory2}
                    onChange={e => { renderSubCategories3(e.target.value); onChange([category, subCategory1, subCategory2, subCategory3]) }}>
                    <option value="" disabled></option>
                    {subCategories2.map((subCateg, i) =>
                        <option value={subCateg} key={"subCateg2" + i}>{subCateg}</option>
                    )}
                </select>
                : ""
            }

            {subCategories3 ?
                <select required={false} className="custom-select my-2" value={subCategory3}
                    onChange={e => { setSubCategory3(e.target.value); onChange([category, subCategory1, subCategory2, subCategory3]) }}>
                    <option value="" disabled></option>
                    {subCategories3.map((subCateg, i) =>
                        <option value={subCateg} key={"subCateg3" + i}>{subCateg}</option>
                    )}
                </select>
                : ""
            }

        </div>

    );

}

export default Category;
