import Navbar from "../components/Navbar";
import AppHeader from "../components/AppHeader";
import { useEffect, useState } from "react";
import DonutChart from "../components/Charts/DonutChart";
import InventoryTable from "../components/Tables/InventoryTable";
import { testItemData } from "../assets/testItemData";
import { Item } from "../types/types";
import '../assets/css/style.css'

const Dashboard = () => {
    const [items, setItems] = useState<Item[]>(testItemData);

    useEffect(() => {
        setItems(testItemData);
    }, []);

    return (
        <div>
            <Navbar />
            <AppHeader />
            <section className="pcoded-main-container">
                <div className="pcoded-wrapper">
                    <div className="pcoded-content">
                        <div className="pcoded-inner-content">
                            {/* <!-- [ breadcrumb ] start --> */}
                            {/* <div className="page-header">
                                <div className="page-block">
                                    <div className="row align-items-center">
                                        <div className="col-md-12">
                                            <div className="page-header-title">
                                                
                                            </div>
                                            <ul className="breadcrumb">
                                                <li className="breadcrumb-item"><a href=""><i className="feather icon-home"></i></a></li>
                                                <li className="breadcrumb-item"><a href="#!">Tables</a></li>
                                                <li className="breadcrumb-item"><a href="">Basic Tables</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            {/* <!-- [ breadcrumb ] end --> */}
                            <div className="main-body">
                                <div className="page-wrapper">
                                    {/* <!-- [ Main Content ] start --> */}
                                    <div className="row">
                                        <InventoryTable items={items} perPage={5} />
                                        <div className="charts-container">
                                            <DonutChart items={items} property="tags" title="Item Count by Tag" />
                                            <DonutChart items={items} property="conditions" title="Item Count by Condition" />
                                        </div>
                                        {/* <!-- [ basic-table ] start --> */}
                                        {/* <div className="col-xl-12">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h5>Basic Table</h5>
                                                    <span className="d-block m-t-5">use className <code>table</code> inside table element</span>
                                                </div>
                                                <div className="card-block table-border-style">
                                                    <div className="table-responsive">
                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>First Name</th>
                                                                    <th>Last Name</th>
                                                                    <th>Username</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <th scope="row">1</th>
                                                                    <td>Mark</td>
                                                                    <td>Otto</td>
                                                                    <td>@mdo</td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">2</th>
                                                                    <td>Jacob</td>
                                                                    <td>Thornton</td>
                                                                    <td>@fat</td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">3</th>
                                                                    <td>Larry</td>
                                                                    <td>the Bird</td>
                                                                    <td>@twitter</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                        {/* <!-- [ basic-table ] end --> */}

                                        {/* <!-- [ Hover-table ] start --> */}
                                        {/* <div className="col-xl-12">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h5>Item Inventory</h5>
                                                </div>
                                                <div className="card-block table-border-style">
                                                    <div className="table-responsive">
                                                        <table className="table table-hover">
                                                            <thead>
                                                                <tr className='inventory-table-row'>
                                                                    <th>Item Name</th>
                                                                    <th>Item Description</th>
                                                                    <th>Weight</th>
                                                                    <th>Tags</th>
                                                                    <th>Conditions</th>
                                                                    <th>Packed</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {data.map((item, i) => (
                                                                    <tr key={i} id='inventory-table-row'>
                                                                        <th id='inventory-table-item-name'>{item.name}</th>
                                                                        <td id='inventory-table-item-description'>{item.description}</td>
                                                                        <td id='inventory-table-item-weight'>{item.weight}</td>
                                                                        <td id='inventory-table-item-tags'>{item.tags?.join(', ')}</td>
                                                                        <td id='inventory-table-item-conditions'>{item.conditions?.join(', ')}</td>
                                                                        <td id='inventory-table-item-packed'>{item.packed ? 'Yes' : 'No'}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                        {/* <!-- [ Hover-table ] end --> */}

                                        {/* <!-- [ stiped-table ] start --> */}
                                        {/* <div className="col-xl-12">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h5>Striped Table</h5>
                                                    <span className="d-block m-t-5">use className <code>table-striped</code> inside table element</span>
                                                </div>
                                                <div className="card-block table-border-style">
                                                    <div className="table-responsive">
                                                        <table className="table table-striped">
                                                            <thead>
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>First Name</th>
                                                                    <th>Last Name</th>
                                                                    <th>Username</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <th scope="row">1</th>
                                                                    <td>Mark</td>
                                                                    <td>Otto</td>
                                                                    <td>@mdo</td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">2</th>
                                                                    <td>Jacob</td>
                                                                    <td>Thornton</td>
                                                                    <td>@fat</td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">3</th>
                                                                    <td>Larry</td>
                                                                    <td>the Bird</td>
                                                                    <td>@twitter</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                        {/* <!-- [ stiped-table ] end --> */}
                                        {/* <TableTest /> */}
                                    </div>
                                    {/* <!-- [ Main Content ] end --> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Dashboard;