import React from 'react';
import Pagination from '@material-ui/lab/Pagination';

export const PaginationCustom = ({page = 1, onChange}) => {
    const handleChange = (event, value) => {
        onChange(value);
        document.documentElement.scrollTop = 0;
    }

  return (
    <div>
        <Pagination 
            count={5} 
            page={page} 
            onChange={handleChange} 
            color={'rgba(0, 0, 0, 0.84)'}
            size="large" 
            showFirstButton 
            showLastButton 
            siblingCount='2' 
        />
    </div>
  );
}
