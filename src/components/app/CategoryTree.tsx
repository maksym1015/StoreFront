import { DslCategory } from 'graphql/generated/graphql';
import { TreeSelect, Form } from 'antd';
import React from 'react';

interface Props {
  data?: DslCategory[];
  label?: string;
  treeCheckable?: boolean;
  required?: boolean;
}

function renderTree(categories: DslCategory[]) {
  return categories.map((category) => {
    return (
      <TreeSelect.TreeNode value={category.id} title={category.name} key={category.id}>
        {renderTree((category.subCategories || []) as DslCategory[])}
      </TreeSelect.TreeNode>
    );
  });
}

export const CategoryTree: React.FC<Props> = ({ data, label, treeCheckable, required }) => {
  const categories = data || [];
  return (
    <Form.Item
      name="category"
      label={label}
      rules={required ? [{ required: true, message: 'Please select categories' }] : []}
    >
      <TreeSelect
        style={{ width: 300 }}
        treeCheckable={treeCheckable}
        treeCheckStrictly={treeCheckable}
        showSearch={false}
        placeholder="Select"
        showCheckedStrategy={TreeSelect.SHOW_PARENT}
        dropdownStyle={{ maxHeight: 500, overflow: 'auto' }}
        allowClear
      >
        {renderTree(categories)}
      </TreeSelect>
    </Form.Item>
  );
};
