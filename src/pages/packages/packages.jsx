import React, { useState } from "react";
import style from "./packages.module.css";
import { connect } from "react-redux";
import Loading from "../../components/loading/loading";
import Table from "../../components/table/table";
import AddPackage from "../../components/addPackage/addPackage";
import UpdatePackage from "../../components/updatePackage/updatePackage";
import { deletePackage } from '../../store/actions'

const Packages = ({ packageDetail, deletePackage }) => {

    //All states
    let [showAddPackage, setShowAddPackage] = useState(false);
    const [showUpdatePackage, setShowUpdatePackage] = useState(false)
    const [pkg, setPkg] = useState({})

    let hideAddPackage = () => {
        setShowAddPackage(false);
    };

    let hideUpdatePackage = () => {
        setShowUpdatePackage(false);
    };


    return (
        <div style={{ width: "100%" }} className={style.packages}>
            <h2 style={{ float: "left" }}>Packages</h2>
            <button
                onClick={() => {
                    setShowAddPackage(true);
                }}
                style={{ float: "right" }}
                className={"btn btn-outline-primary"}
            >
                Add Package
            </button>
            {packageDetail && packageDetail.length ? (
                <Table>
                    <thead>
                        <tr>
                            <th scope="col">Sr No</th>
                            <th scope="col">Package Name</th>

                            <th scope="col">Package Id</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packageDetail.map((data, index) => {
                            return (
                                <tr key={data._id}>
                                    <td>{index + 1}</td>
                                    <td>{data.packageName}</td>

                                    <td>{data._id}</td>
                                    <td style={{ display: "flex" }}>
                                        <button
                                            style={{ marginRight: "20px" }}
                                            className={"btn btn-sm btn-warning"}
                                            onClick={() => {
                                                setPkg(data)
                                                setShowUpdatePackage(true);
                                            }}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className={"btn btn-sm btn-danger"}
                                            value={data._id}
                                            onClick={(e) => { deletePackage(e.target.value) }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            ) : packageDetail && !packageDetail.length ? <><h1 className="text-danger mt-5 pt-5">No packages found</h1></> : (
                <Loading show={true}  ><div style={{ width: '100%', height: '400px' }}> </div> </Loading>
            )
            }
            <AddPackage
                show={showAddPackage}
                title={"Add new Package"}
                hideRSideBar={hideAddPackage}
            />
            <UpdatePackage
                packageDetail={pkg}
                show={showUpdatePackage}
                title={"Update Package"}
                hideRSideBar={hideUpdatePackage}
            />
        </div >
    );

};

function mapProp(state) {
    return {
        packageDetail: state.main.packageDetail,
    };
}

function mapActions(dispatch) {
    return {
        deletePackage(pkgId) {
            dispatch(deletePackage(pkgId))
        }
    }
}

export default connect(mapProp, mapActions)(Packages);
