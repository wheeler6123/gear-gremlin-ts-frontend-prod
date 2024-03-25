import { useQuery } from 'react-query';
import readUsageTagsRequest from '../api/readUsageTagsRequest';
import { DEFAULT_CONDITIONS_TAGS } from '../components/Forms/CreateItem/defaultUseConditionsTags';

const useUsageTags = () => {
    return useQuery('usageTags', async () => {
        try {
            const useTags = await readUsageTagsRequest();
            const allTags = [...DEFAULT_CONDITIONS_TAGS, ...useTags];
            console.log('allTags:', allTags);
            return allTags;
        } catch (error: any) {
            console.error('Error fetching tags: ', error.message);
            throw error;
        }
    });
}

export default useUsageTags;
