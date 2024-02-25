import React from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import { Tag } from '../../../types/types';

interface TagSelectorProps {
    tags: Tag[];
    selectedTags: Tag[];
    setSelectedTags: (selectedTags: Tag[]) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({
    tags,
    selectedTags,
    setSelectedTags,
}) => {
    const handleCheckboxChange = (tag: Tag) => {
        const newSelectedTags = selectedTags.includes(tag)
            ? selectedTags.filter((t) => t !== tag)
            : [...selectedTags, tag];
        setSelectedTags(newSelectedTags);
    };

    console.log('tags:', tags) 
    
    return (
        <Dropdown>
            <Dropdown.Toggle className='dropdown-button' id="dropdown-basic">
                Select tags
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {tags.map((tag) => (
                    <Dropdown.Item as="div" key={tag._id} onClick={e => e.stopPropagation()}>
                        <Form.Check
                            type="checkbox"
                            id={tag._id}
                            label={tag.name}
                            checked={selectedTags.includes(tag)}
                            onChange={() => handleCheckboxChange(tag)}
                        />
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default TagSelector;