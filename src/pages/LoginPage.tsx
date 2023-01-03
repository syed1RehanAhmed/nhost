import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Spin,
  Tabs,
  useForm,
} from "@pankod/refine-antd";
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
      <Row>
        <Col span={12}></Col>
        <Col span={12} style={{ background: "#F3F4F8", height: "100vh" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              justifyContent: "center",
            }}
          >
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
                  <div
                    style={{
                      fontSize: "18px",
                      color: "black",
                    }}
                  >
                    Email
                  </div>
                  <Form.Item name={"email"}>
                    <Input
                      placeholder="Email"
                      size="large"
                      style={{ width: "250px" }}
                    />
                  </Form.Item>
                  <div
                    style={{
                      fontSize: "18px",
                      color: "black",
                    }}
                  >
                    Password
                  </div>
                  <Form.Item name={"password"}>
                    <Input
                      size="large"
                      placeholder="Password"
                      type="password"
                      style={{ width: "250px" }}
                    />
                  </Form.Item>

                  <Button
                    style={{
                      width: "250px",
                      background: "#7E56DA",
                      color: "white",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                    size="large"
                    htmlType="submit"
                  >
                    {isLoading ? <Spin /> : <>Login </>}
                  </Button>
                  <div
                    style={{ cursor: "pointer", paddingTop: "10px" }}
                    onClick={() => setValue1("b")}
                  >
                    Don't have an account?{" "}
                    <span style={{ color: "#7E56DA" }}> Sign Up </span>
                  </div>
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
                  <div
                    style={{
                      fontSize: "18px",
                      color: "black",
                    }}
                  >
                    Email
                  </div>
                  <Form.Item name={"email"}>
                    <Input
                      placeholder="email"
                      size="large"
                      style={{ width: "250px" }}
                    />
                  </Form.Item>
                  <div
                    style={{
                      fontSize: "18px",
                      color: "black",
                    }}
                  >
                    Password
                  </div>
                  <Form.Item name={"password"}>
                    <Input
                      placeholder="password"
                      type="password"
                      size="large"
                      style={{ width: "250px" }}
                    />
                  </Form.Item>

                  <Button
                    style={{
                      width: "250px",
                      background: "#7E56DA",
                      color: "white",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                    size="large"
                    htmlType="submit"
                  >
                    {isR ? <Spin /> : <>SignUp</>}
                  </Button>
                  <div
                    onClick={() => setValue1("a")}
                    style={{ cursor: "pointer", paddingTop: "10px" }}
                  >
                    Already have an account ?
                    <span style={{ color: "#7E56DA" }}>Login</span>
                  </div>
                </Form>
              </>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Login;
