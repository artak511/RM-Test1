import { useContext } from 'react';
import { AddEditContext } from 'components/pages/source/addEdit/provider/AddEditProvider';

export function useAddEdit() {
  return useContext(AddEditContext);
}