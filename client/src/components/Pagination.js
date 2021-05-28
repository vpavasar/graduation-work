import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

export const PaginationCustom = ({page = 1, onChange}) => {
  const siblingCount = 2;

  const handleChange = (event, value) => {
      onChange(value);
      document.documentElement.scrollTop = 0;
  }

  const StyledPagination = withStyles({
    root: {
        color: '#a0a8a3'
    }
})(Pagination)

  return (
    <div>
        <StyledPagination 
            count={5} 
            page={page} 
            onChange={handleChange} 
            size="large" 
            showFirstButton 
            showLastButton 
            siblingCount={siblingCount} 
        />
    </div>
  );
}
