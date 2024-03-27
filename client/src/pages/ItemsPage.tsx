import Navbar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
import InventoryTable from "../components/Tables/InventoryTable";
import DonutChart from "../components/Charts/DonutChart";
import readItemsRequest from "../api/readItemsRequest";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useEffect } from "react";
import { useMatomo } from "@jonkoops/matomo-tracker-react";
import CreateItemForm from "../components/Forms/CreateItem/CreateItemForm";
import { ClipLoader } from "react-spinners";
import deleteItemRequest from "../api/deleteItemRequest";


const ItemsPage: React.FC = () => {
    const {isLoading, data: items} = useQuery('items', () => readItemsRequest());   
    const { trackPageView } = useMatomo();

    // Track page view
    useEffect(() => {
        trackPageView()
    }, []);

    const queryClient = useQueryClient();

    const deleteItemMutation = useMutation(deleteItemRequest, {
        onSuccess: () => {
            queryClient.invalidateQueries('items');
        }
    });

    // const updateItemMutation = useMutation(updateItemRequest, {
    //     onSuccess: () => {
    //         queryClient.invalidateQueries('items');
    //     }
    // });

    const demoItemIds = [
        '6601b41216ee4af0e40dadb6',
        '6601b86d16ee4af0e40dae69',
        '6601b89716ee4af0e40dae73',
        '6601b8cb16ee4af0e40dae7d',
        '6601b90316ee4af0e40dae89',
        '6601b98416ee4af0e40dae9e',
        '6601b94516ee4af0e40dae94',
        '6601b98416ee4af0e40dae9e',
        '6601b9b516ee4af0e40daeac',
        '6601ba7f16ee4af0e40daee0',
        '6601bb8d16ee4af0e40daefd',
        '6601bbd416ee4af0e40daf0a',
        '6601bc6e16ee4af0e40daf2a',
        '6601bd0e16ee4af0e40daf4f',
        '6601bda016ee4af0e40daf6c',
        '6601be1216ee4af0e40daf86'
    ];

    const handleDeleteItem = async (itemId: string) => {
        if(demoItemIds.includes(itemId)) {
            alert('This item is part of the demo and cannot be deleted.');
            return;
        }
        if(window.confirm('Are you sure you want to delete this item?')) {
            await deleteItemMutation.mutateAsync(itemId);
        }
    }

    // const handleUpdateItem = async (itemId: string, updatedValues: Item) => {
    //     await updateItemMutation.mutateAsync({itemId, updatedValues});
    // }

    return (
        <div>
            <Navbar />
            <MobileNavbar className='mobile-navbar-component'/>
            <div className="items-page-container">
                {isLoading ? (
                    <ClipLoader color="#4A90E2" loading size={150} />
                ) : (
                    <section className="main-container">
                        <div className="item-visualization-container">
                            <div className="charts-container">
                                <DonutChart
                                    items={items}
                                    property="useConditions"
                                    title="Item Count by Condition"
                                />
                                <DonutChart
                                    items={items}
                                    property="categories"
                                    title="Item Count by Category"
                                />
                            </div>
                        </div>
                        <div className="inventory-container">
                            <InventoryTable 
                                items={items} 
                                perPage={5} 
                                handleDeleteItem={handleDeleteItem}
                                isDeleteColumnVisible={true}
                                // handleUpdateItem={handleUpdateItem}
                            />
                        </div>
                        <div className="create-item-container">
                            <CreateItemForm />
                        </div>
                    </section>
                )}
            </div>
        </div>
    );


};

export default ItemsPage;