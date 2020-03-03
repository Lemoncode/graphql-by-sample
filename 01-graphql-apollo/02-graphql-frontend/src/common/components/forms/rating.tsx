import * as React from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { FieldRenderProps } from 'react-final-form';
import Typography from '@material-ui/core/Typography';

interface Props extends FieldRenderProps<any, any> {
  max: number;
}

export const RatingComponent: React.FunctionComponent<Props> = props => {
  const { input, meta, max } = props;

  const showError = Boolean(
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
      meta.touched
  );

  const handleChange = (e, newValue) => {
    input.onChange(newValue);
  };

  return (
    <Box component="div" mb={3} borderColor="transparent">
      <Rating
        {...input}
        value={Number(input.value)}
        onChange={handleChange}
        max={max}
        size="large"
      />
      {showError && (
        <Typography variant="caption" color="error" gutterBottom>
          {meta.error}
        </Typography>
      )}
    </Box>
  );
};
