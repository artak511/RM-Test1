import React, { useCallback, useEffect, useState } from 'react';
import { Form } from 'antd';
import { request } from 'helpers';
import { Urls, Paths } from 'constant';
import { SourceModel } from 'model/Source';
import { useLocation, useNavigate, useParams } from 'react-router';

const defaultSource = {
  'ipAddress': '',
  'name': '',
  'tags': [],
  'credentials': {
    'domain': '',
    'username': '',
    'password': '',
    'confirmPassword': ''
  }
};

export const AddEditContext = React.createContext({} as any);

export const AddEditProvider = (props: any) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { pathname } = useLocation();
  const { id } = useParams();
  const mode = pathname.includes('/add') ? 'Add' : 'Edit';
  const [source, setSource] = useState<SourceModel>(defaultSource);
  const isEdit = id && id !== 'add';

  useEffect(() => {
    if (mode === 'Edit' && id) {
      (async () => {
        request(`${Urls.source.get(+id)}`).then((res) => {
          setSource(res);
          form.setFieldsValue(res);
        }).catch((err) => {
          console.log(err, '🛑 => error');
        })
      })();
    }
  }, [mode, id, form]);

  const onSubmit = useCallback(() => {
    (async () => {
      const requestUrl = isEdit ? Urls.source.edit(+id) : Urls.source.add;
      const formData = form.getFieldsValue();
      const dataToSubmit: Record<string, any> = {
        name: formData.name,
        tags: formData.tags,
        credentials: {
          domain: formData.credentials.domain,
          username: formData.credentials.username,
          password: formData.credentials.password
        }
      };
      if (isEdit) {
        if (source.ipAddress !== formData.ipAddress) {
          dataToSubmit['ipAddress'] = formData.ipAddress
        }
      } else {
        dataToSubmit['ipAddress'] = formData.ipAddress
      }
      try {
        const res = await request(requestUrl, {
          method: isEdit ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSubmit)
        })
        if (res.errors) {
          res.errors.forEach((e: any) => {
            form.setFields([
              {
                name: e.param,
                errors: [e.msg]
              }
            ]);
          });
        } else {
          navigate(Paths.source.list);
        }
      } catch (e) {
        console.log(e, '🛑 => error');
      }
    })();
  }, [source, isEdit, id, navigate, form]);

  return (
    <AddEditContext.Provider value={{ source, id, mode, onSubmit, form, navigate }}>
      {props.children}
    </AddEditContext.Provider>
  );
}