import { Button, Box, Typography } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import theme from '../style/theme';

interface SortToggleProps {
  sortOrder: 'asc' | 'desc';
  onSortChange: (newSortOrder: 'asc' | 'desc') => void;
}

const SortToggle: React.FC<SortToggleProps> = ({ sortOrder, onSortChange }) => {
  const handleToggle = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    onSortChange(newSortOrder); // Pass the new sort order to the parent
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginLeft: theme.spacing(2),
      }}
    >
      <Typography
        variant="body1"
        sx={{
          marginRight: theme.spacing(1),
          color: theme.palette.text.secondary,
        }}
      >
        Sort Method:
      </Typography>
      <Button
        variant="outlined"
        startIcon={sortOrder === 'desc' ? <ArrowUpward /> : <ArrowDownward />}
        onClick={handleToggle}
      />
    </Box>
  );
};

export default SortToggle;
