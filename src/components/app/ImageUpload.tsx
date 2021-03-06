import { Form, message, Upload } from 'antd';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Text } from 'rebass';
import { RcFile, UploadFile } from 'antd/lib/upload/interface';

export const ImageUpload: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return false;
  };

  const normFile = ({ fileList }: { fileList: UploadFile[] }) => {
    return fileList.slice(-1);
  };

  return (
    <Form.Item label="Images">
      <Form.Item
        name="image"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        style={{ margin: 0 }}
      >
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          accept="image/*"
          fileList={fileList}
          onChange={({ fileList }) => {
            setFileList(fileList.slice(-1));
          }}
          showUploadList={{ showPreviewIcon: false }}
          beforeUpload={beforeUpload}
        >
          <div>
            <PlusOutlined />
            <div className="ant-upload-text">Add Image</div>
          </div>
        </Upload>
      </Form.Item>
      <Text fontSize={12}>
        Image Requirements: Width: 250px Height: 250px Image Extension: JPG or PNG Maximum File
        Size: 2MB
      </Text>
    </Form.Item>
  );
};
