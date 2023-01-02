import { Button, Form, Input, Spin, Tabs, useForm } from "@pankod/refine-antd";
import { useLogin, useRegister } from "@pankod/refine-core";
import React, { useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Radio } from "antd";

export const Login: React.FC = () => {
  const { mutate, isLoading } = useLogin();
  const { mutate: Register, isLoading: isR, error } = useRegister();
  const [value, setValue1] = useState("a");

  const { form, formProps, formLoading } = useForm();

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setValue1(value);
    form.resetFields();
  };
  if (error) {
    console.log(error, "sasfdfaesfds");
  }

  return (
    <>
      <Radio.Group
        defaultValue={value}
        size="large"
        value={value}
        onChange={onChange}
      >
        <Radio.Button value="a">Login</Radio.Button>
        <Radio.Button value="b">Sign Up</Radio.Button>
      </Radio.Group>
      {value === "a" && (
        <>
          <Form
            form={form}
            {...formProps}
            onFinish={(values: any) => {
              const { email, password } = values;
              mutate({ email, password });
            }}
          >
            <Form.Item name={"email"}>
              <Input placeholder="email" />
            </Form.Item>
            <Form.Item name={"password"}>
              <Input placeholder="password" type="password" />
            </Form.Item>

            <Button style={{ width: "100px" }} size="large" htmlType="submit">
              {isLoading ? <Spin /> : <>Login </>}
            </Button>
          </Form>
        </>
      )}
      {value === "b" && (
        <>
          <Form
            form={form}
            {...formProps}
            onFinish={(values: any) => {
              const { email, password } = values;
              Register({ email, password });
            }}
          >
            <Form.Item name={"email"}>
              <Input placeholder="email" />
            </Form.Item>
            <Form.Item name={"password"}>
              <Input placeholder="password" type="password" />
            </Form.Item>

            <Button style={{ width: "100px" }} size="large" htmlType="submit">
              {isR ? <Spin /> : <>SignUp</>}
            </Button>
          </Form>
        </>
      )}
    </>
  );
};

export default Login;
