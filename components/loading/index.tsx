import { CircularProgress, Grid } from '@material-ui/core';
import React, { FC } from 'react';

/*
 * Display Loading
 */
export const Loading: FC = () => {
  return (
    <Grid container alignItems="center" justify="center">
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  );
};
