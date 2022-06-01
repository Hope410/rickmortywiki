import {ErrorTypes} from '@rest-hooks/rest';
import {Text} from '@rneui/themed';

import _ from 'lodash';
import * as React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export interface IDataWrapperProps<T> {
  data?: T;
  loading: boolean;
  error?: ErrorTypes;
  children: (data: T) => React.ReactElement;
}

const styles = StyleSheet.create({
  title: {
    marginLeft: 12,
    marginTop: 8,
  },
  message: {
    marginLeft: 12,
  },
});

export function DataWrapper<T>(props: IDataWrapperProps<T>) {
  if (props.loading) {
    return (
      <>
        <Text style={styles.title} h2>
          Loading...
        </Text>
      </>
    );
  }

  if (!_.isNil(props.error)) {
    return (
      <>
        <Text style={styles.title} h2>
          {props.error.name}
        </Text>
        <Text style={styles.message} h4>
          {props.error.message}
        </Text>
      </>
    );
  }

  if (_.isNil(props.data)) {
    return (
      <>
        <Text style={styles.title} h2>
          Нет данных
        </Text>
      </>
    );
  }

  return <SafeAreaView>{props.children(props.data)}</SafeAreaView>;
}
