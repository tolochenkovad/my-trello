import { Flex } from 'antd';
import { useActiveTagIds, useSearchValue } from '@/store/tasks/selectors';
import { ClearAllFilters } from './ClearAllFilters';
import { Search } from './Search';
import { TagFilter } from './TagFilter';

export const Filters = () => {
  const activeTagIds = useActiveTagIds();
  const searchValue = useSearchValue();
  return (
    <>
      <Search />
      <Flex justify="space-between">
        <TagFilter />
        {(!!searchValue.length || !!activeTagIds.length) && <ClearAllFilters />}
      </Flex>
    </>
  );
};
