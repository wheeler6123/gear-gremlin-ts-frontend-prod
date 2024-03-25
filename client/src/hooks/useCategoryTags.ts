import { useQuery } from 'react-query';
import readCategoryTagsRequest from '../api/readCategoryTagsRequest';
import { DEFAULT_CATEGORY_TAGS } from '../components/Forms/CreateItem/defaultCategoryTags';


const useCategoryTags = () => {
    return useQuery('categoryTags', async () => {
        try {
            const catTags = await readCategoryTagsRequest();
            const allTags = [...DEFAULT_CATEGORY_TAGS, ...catTags];
            console.log('allTags:', allTags);
            return allTags;
        } catch (error: any) {
            console.error('Error fetching tags: ', error.message);
            throw error;
        }
    });
}

export default useCategoryTags;