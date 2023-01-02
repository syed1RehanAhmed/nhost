import React from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";

import {
  Create,
  Form,
  Input,
  RcFile,
  Select,
  Upload,
  useForm,
  useSelect,
} from "@pankod/refine-antd";

import MDEditor from "@uiw/react-md-editor";

import { nhost, normalizeFile } from "utility";
import { IPost, ICategory } from "interfaces";

export const PostCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm({
    resource: "job",
    metaData: {
      fields: ["name"],
    },
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item name={"name"}>
          <Input placeholder="name" />
        </Form.Item>
      </Form>
    </Create>
  );
};
