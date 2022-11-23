import { useMemo } from 'react';
import React, { useState, useEffect } from 'react';
import { request } from 'helpers';
import { RuleObject } from 'antd/es/form';
import { Paths, Urls } from 'constant';
import { DefaultOptionType } from 'antd/es/select';
import { Form, Button, Input, Row, Col, Select } from 'antd';
import { useAddEdit } from 'components/pages/source/hooks/useAddEdit';

export const AddEditForm = React.memo(() => {
  const { onSubmit, source, form, navigate, mode } = useAddEdit();
  const [allTags, setAllTags] = useState<DefaultOptionType[]>([]);
  const requiredRule = { required: true, message: 'Required Field' };
  const isAddMode = useMemo(() => mode === 'Add', []);

  useEffect(() => {
    (async () => {
      request(`${Urls.source.getTags}`).then((res) => {
        setAllTags(res.map((tag: string) => ({ label: tag, value: tag })));
      }).catch((err) => {
        console.log(err, '🛑 => error');
      })
    })();
  }, []);

  const ipAddressValidator = async (_: RuleObject, ip: string) => {
    const regexExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
    if (!regexExp.test(ip)) {
      return Promise.reject(new Error('Wrong Ip Address format. (example: x.x.x.x)'));
    }
  }
  const confirmPasswordValidator = async (_: RuleObject, confirmPassword: string) => {
    const initialPassword = source.credentials.password;
    const formPassword = form.getFieldValue(['credentials', 'password']);
    if (initialPassword !== formPassword && formPassword !== confirmPassword) {
      return Promise.reject(new Error('Password and confirm password does not match'));
    }
  }

  return (
    <Form form={form} onFinish={onSubmit} layout={'vertical'}>
      <Row gutter={[20, 20]}>

        <Col span={12}>
          <Form.Item name="name" label="Name" rules={[requiredRule]}>
            <Input placeholder={'Enter Name'} />
          </Form.Item>
          <Form.Item name="ipAddress" label="IP Address"
                     rules={[requiredRule,{ validator: ipAddressValidator }]}>
            <Input placeholder={'Enter IP Address'} />
          </Form.Item>
          <Form.Item name="tags" label="Tags">
            <Select mode="tags" placeholder="Tags Mode" options={allTags} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name={['credentials', 'domain']} label="Domain">
            <Input placeholder={'Enter Domain'} />
          </Form.Item>
          <Form.Item name={['credentials', 'username']} label="Username" rules={[requiredRule]}>
            <Input placeholder={'Enter username'} />
          </Form.Item>
          <Form.Item name={['credentials', 'password']} label="Password" rules={[requiredRule]}>
            <Input placeholder={'Enter password'} type={'password'} />
          </Form.Item>
          <Form.Item name={['credentials', 'confirmPassword']} label="Confirm Password"
                     rules={[{ validator: confirmPasswordValidator }]}>
            <Input type={'password'} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button
          style={{ height: 33 }}
          type={'default'}
          onClick={() => navigate(Paths.source.list)}>
          cancel
        </Button>
        <Button
          className={isAddMode ? '' : 'warning'}
          type={isAddMode ? 'primary' : undefined}
          htmlType="submit">
          {mode}
        </Button>
      </Form.Item>
    </Form>
  );
})