import React from 'react';
import { PageTitle } from 'components/common/pageTitle';
import { useAddEdit } from 'components/pages/source/hooks/useAddEdit';
import { AddEditForm } from 'components/pages/source/addEdit/AddEditForm';

export const AddEditComponent = React.memo(() => {
  const { mode } = useAddEdit();
  return (
    <>
      <PageTitle>
        {mode} Source
      </PageTitle>
      <div className={'add-edit'}>
        <div className={'panel'}>
          <AddEditForm />
        </div>
      </div>
    </>
  );
})