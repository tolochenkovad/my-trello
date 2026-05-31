import { Flex } from 'antd';
import { useActiveTagIds, useSearchValue, useTagsData } from '@/store/tasks/selectors';
import { ClearAllFilters } from './ClearAllFilters';
import { Search } from './Search';
import { TagFilter } from './TagFilter';

export const Filters = () => {
  const activeTagIds = useActiveTagIds();
  const searchValue = useSearchValue();
  const tags = useTagsData();

  return (
    <>
      <Search />
      <Flex justify="space-between">
        {!!tags.length && <TagFilter />}
        {(!!searchValue.length || !!activeTagIds.length) && <ClearAllFilters />}
      </Flex>
    </>
  );
};
