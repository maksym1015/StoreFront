import { Button, Row, Col, Space, Form } from 'antd';
import { Box, Text } from 'rebass';
import { useEvent } from 'hooks/event';
import React, { useRef } from 'react';
import { FormInstance } from 'antd/lib/form';
import { AnyObject } from 'types';
import { useRouter } from 'next/router';
import { Store } from 'antd/lib/form/interface';
import { useDebouncedCallback } from 'use-debounce';

interface Props {
  noAdvanced?: boolean;
  expandMode?: boolean;
  initialValues?: AnyObject;
}

export const SimpleSearch: React.FC<Props> = ({
  children,
  noAdvanced,
  expandMode,
  initialValues = {},
}) => {
  const router = useRouter();
  const openAdvancedSearchForm = useEvent('OPEN_ADVANCED_SEARCH');
  const formInstance = useRef<FormInstance>(null);

  const [onValuesChange] = useDebouncedCallback((...args: Store[]) => {
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, ...args[1], currentPage: 1, savedSearchId: null },
    });
  }, 300);

  const clearAll = async () => {
    await router.replace({ pathname: router.pathname, query: {} });
    formInstance?.current?.resetFields();
  };

  return (
    <Box variant="card">
      <Form
        layout="vertical"
        onValuesChange={onValuesChange}
        ref={formInstance}
        initialValues={{ ...initialValues, ...router.query }}
      >
        <Row
          gutter={16}
          className="simple-search"
          style={expandMode ? { maxWidth: '800px', marginBottom: '20px' } : {}}
        >
          {expandMode ? (
            children
          ) : (
            <React.Fragment>
              <Col flex={1}>
                <Space size={15} className="simple-search-inputs">
                  {children}
                </Space>
              </Col>
            </React.Fragment>
          )}
        </Row>
      </Form>
      <Row justify="space-between">
        <Col>
          {!noAdvanced && (
            <Button
              type="default"
              style={{
                textTransform: 'uppercase',
                borderWidth: '2px',
                borderColor: '#797979',
                fontWeight: 500,
              }}
              onClick={() => {
                openAdvancedSearchForm();
              }}
            >
              Advanced Search
            </Button>
          )}
        </Col>
        <Col>
          <Button
            type="link"
            style={{ paddingRight: 0, fontSize: 16, textTransform: 'uppercase' }}
            onClick={clearAll}
          >
            <Text
              sx={{
                borderBottomWidth: '1px',
                borderBottomStyle: 'solid',
                borderBottomColor: 'textColor',
                color: 'textColor',
                fontWeight: 500,
              }}
            >
              Clear All
            </Text>
          </Button>
        </Col>
      </Row>
    </Box>
  );
};
