import React from 'react';
import { AddEditComponent } from 'components/pages/source/addEdit/addEditComponent';
import { AddEditProvider } from 'components/pages/source/addEdit/provider/AddEditProvider';
import 'components/pages/source/addEdit/styles.css';

export const AddEditSource = React.memo(() => {
  return (
    <AddEditProvider>
      <AddEditComponent />
    </AddEditProvider>
  );
})