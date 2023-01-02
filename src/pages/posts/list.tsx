import {
  IResourceComponentsProps,
  getDefaultFilter,
} from "@pankod/refine-core";
import { useDelete, useNavigation } from "@pankod/refine-core";

import { Button, List, Table, useTable } from "@pankod/refine-antd";

import { ICategory, IPost } from "interfaces";
import { DeleteOutlined } from "@ant-design/icons";

export const PostList: React.FC = () => {
  const { create } = useNavigation();
  const { mutate: deleteTodo } = useDelete();

  const { tableProps, filters, sorter } = useTable({
    resource: "job",
    metaData: {
      fields: ["id", "name"],
    },
  });
  console.log(tableProps, "adasdfsdegfsrffrg");

  return (
    <>
      <Button onClick={() => create("job")}> Create</Button>
      <Table {...tableProps} rowKey="id">
        <Table.Column title="Todos" dataIndex={"name"} />
        <Table.Column
          title={"Delete"}
          render={(record: any) => (
            <>
              <DeleteOutlined
                onClick={() =>
                  deleteTodo({
                    resource: "job",
                    id: record?.id,
                    successNotification: {
                      message: "succesfully deleted Todo",
                      description: "succesfully deleted todo",
                      type: "success",
                    },
                  })
                }
              />
            </>
          )}
        />
      </Table>
    </>
  );
};
