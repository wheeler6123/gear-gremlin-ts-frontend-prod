import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import TagSelector from './TagSelector';
import useCategoryTags from '../../../hooks/useCategoryTags';
import useUsageTags from '../../../hooks/useUsageTags';
import createCategoryTagRequest from '../../../api/createCategoryTagRequest';
import createUsageTagRequest from '../../../api/createUsageTagRequest';
import createItemRequest from '../../../api/createItemRequest';
import { Item, NewItem, Tag } from '../../../types/types';


const createItemForm = () => {
    const queryClient = useQueryClient();
    const [itemFormData, setItemFormData] = useState({
        name: '',
        description: '',
        weight: 0,
        categories: [],
        useConditions: [],
        packed: false
    });
    const [selectedCategories, setSelectedCategories] = useState<Tag[]>([]);
    const [newCategory, setNewCategory] = useState('');

    const [selectedUsageConditions, setSelectedUsageConditions] = useState<Tag[]>([]);
    const [newUsageCondition, setNewUsageCondition] = useState('');

    const { data: categoryTags = [] } = useCategoryTags();
    const { data: usageTags = [] } = useUsageTags();

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const createCategoryTagMutation = useMutation(createCategoryTagRequest, {
        onSuccess: () => {
            queryClient.invalidateQueries('categoryTags');
        }
    });

    const createUsageTagMutation = useMutation(createUsageTagRequest, {
        onSuccess: () => {
            queryClient.invalidateQueries('usageTags');
        }
    });

    const { mutate: createItem } = useMutation(
        (newItem: NewItem) => {  // Change here
            if (userId) {
                return createItemRequest(newItem, userId);
            } else {
                throw new Error("User ID is not available");
            }
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('items');
            },
            onError: () => {
                alert('An error occurred while creating the item.');
            }
        }
    );

    const handleNewCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCategory(e.target.value);
    }

    const handleNewUsageConditionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUsageCondition(e.target.value);
    }

    const handleNewCategorySubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const newCategoryTag = await createCategoryTagMutation.mutateAsync(newCategory);
            if (newCategoryTag._id) {
                setSelectedCategories(prevState => [...prevState, { _id: newCategoryTag._id!, name: newCategory }]);
            }
            setNewCategory('');
        } catch (error) {
            console.error('Error creating category tag: ', error);
        }
    };

    const handleNewUsageConditionSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const newUsageTag = await createUsageTagMutation.mutateAsync(newUsageCondition);
            if (newUsageTag._id) {
                setSelectedUsageConditions(prevState => [...prevState, { _id: newUsageTag._id!, name: newUsageCondition }]);
            }
            setNewUsageCondition('');
        } catch (error) {
            console.error('Error creating usage condition tag: ', error);
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (userId == '6601b0d516ee4af0e40dad37') {
            alert("You cannot change create new items for this user, please register a new account.");
            return;
        }
        if (!itemFormData.name || !userId) return;
        if (userId) {
            const newItem: NewItem = {
                ...itemFormData,
                categories: selectedCategories.map(category => category.name),
                useConditions: selectedUsageConditions.map(condition => condition.name),
                userId: userId,
            };
            await createItem(newItem);
            setItemFormData({
                name: '',
                description: '',
                weight: 0,
                categories: [],
                useConditions: [],
                packed: false
            });
            setSelectedCategories([]);
            setSelectedUsageConditions([]);
        }
    }

    

    return (
        <div className='card'>
            <div className='card-header'>
                <h5>Add New Item</h5>
            </div>
            <form className="create-item-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Item Name</label>
                <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    placeholder='Enter a name for the item'
                    onChange={(e) => setItemFormData({...itemFormData, name: e.target.value})} 
                    value={itemFormData.name}
                />
                <label htmlFor="description">Item Description</label>
                <input
                    type="text"
                    name="description"
                    id="description"
                    placeholder='Enter a description of the item'
                    onChange={(e) => setItemFormData({...itemFormData, description: e.target.value})}
                    value={itemFormData.description}
                />
                <label htmlFor="weight">Item Weight (oz)</label>
                <input
                    type="number"
                    name="weight"
                    id="weight"
                    placeholder='Enter item weight in ounces'
                    onChange={(e) => setItemFormData({...itemFormData, weight: parseInt(e.target.value)})}
                    value={itemFormData.weight}
                />
                <label htmlFor="categories">Select Categories</label>
                <TagSelector
                    tags={categoryTags}
                    selectedTags={selectedCategories}
                    setSelectedTags={setSelectedCategories}
                />
                <div className="selected-tags">
                    {selectedCategories.map((category, index) => (
                        <span key={index}>{category.name} </span>
                    ))}
                </div>
                <label htmlFor="newCategory">Add New Category</label>
                <input
                    type="text"
                    name="newCategory"
                    id="newCategory"
                    placeholder='Enter a new category for this item'
                    value={newCategory}
                    onChange={handleNewCategoryChange}
                />
                <button className='tag-submit-button' onClick={handleNewCategorySubmit}>Add Category</button>
                <label htmlFor="usageConditions">Select Use Conditions</label>
                <TagSelector
                    tags={usageTags}
                    selectedTags={selectedUsageConditions}
                    setSelectedTags={setSelectedUsageConditions}
                />
                <div className="selected-tags">
                    {selectedUsageConditions.map((useCondition, index) => (
                        <span key={index}>{useCondition.name} </span>
                    ))}
                </div>
                <label htmlFor="newUsageCondition">Add New Use Condition</label>
                <input
                    type="text"
                    name="newUsageCondition"
                    id="newUsageCondition"
                    placeholder='Enter a new use condition for this item'
                    value={newUsageCondition}
                    onChange={handleNewUsageConditionChange}
                />
                <button className='tag-submit-button' onClick={handleNewUsageConditionSubmit}>Add Use Condition</button>
                <button className='button new-item-button'>Add New Item</button>
            </form>
        </div>
    )
}

export default createItemForm;