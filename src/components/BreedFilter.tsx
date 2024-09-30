import { TextField, Autocomplete, Chip } from '@mui/material';
import theme from '../style/theme';

interface BreedFilterProps {
  breeds: string[];
  selectedBreeds: string[];
  onBreedChange: (event: React.SyntheticEvent, value: string[]) => void;
}

const BreedFilter: React.FC<BreedFilterProps> = ({
  breeds,
  selectedBreeds,
  onBreedChange,
}) => {
  return (
    <Autocomplete
      multiple
      options={breeds}
      getOptionLabel={(option) => option}
      value={selectedBreeds}
      onChange={onBreedChange}
      renderTags={(value: string[], getTagProps) => (
        <div style={{ width: '100%' }}>
          {value.map((option: string, index: number) => {
            const { key, ...tagProps } = getTagProps({ index });
            return <Chip key={key} label={option} {...tagProps} />;
          })}
        </div>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Filter by Breed"
          placeholder="Search and select breeds..."
          sx={{
            color: 'white',
            minWidth: 300,
            maxWidth: 'max-content',
            '& .MuiChip-root': {
              backgroundColor: theme.palette.secondary.light,
            },
            '& .MuiInputLabel-root': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: theme.palette.secondary.light,
              },
              svg: {
                color: theme.palette.primary.main,
                '&:hover': {
                  color: theme.palette.primary.dark,
                },
              },
              '& .MuiAutocomplete-endAdornment': {
                '& .MuiAutocomplete-clearIndicator': {
                  svg: {
                    width: '25px',
                    height: '25px',
                    color: theme.palette.primary.dark,
                  },
                  '&:hover': {
                    background: theme.palette.primary.dark,
                    svg: { color: 'white' },
                  },
                },
                '.MuiAutocomplete-popupIndicator': {
                  marginLeft: '10px',
                  svg: {
                    width: '30px',
                    height: '30px',
                    color: theme.palette.primary.dark,
                  },
                  '&:hover': {
                    background: theme.palette.primary.dark,
                    svg: { color: 'white' },
                  },
                },
              },
            },
            span: {
              color: theme.palette.primary.dark,
              fontWeight: 'bold',
              fontSize: 20,
            },
            input: {
              color: 'white',
              '&::placeholder': {
                opacity: 1,
                color: theme.palette.secondary.light,
                fontStyle: 'oblique',
              },
            },
            '& .MuiAutocomplete-tag': {
              color: 'white',
            },
          }}
        />
      )}
    />
  );
};

export default BreedFilter;
