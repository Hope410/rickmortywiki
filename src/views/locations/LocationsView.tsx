import {DataWrapper} from '@/components';
import {LocationModel, LocationService} from '@/domain/location';
import {Card, Text} from '@rneui/themed';
import React, {Reducer, useReducer, useState} from 'react';
import {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Endpoint, useDLE} from 'rest-hooks';

const styles = StyleSheet.create({
  container: {
    paddingBottom: 12,
  },
  title: {
    marginLeft: 12,
    marginTop: 8,
  },
  infoContainer: {},
  fonts: {
    marginBottom: 8,
  },
  cardTitle: {
    textAlign: 'left',
    fontSize: 24,
    marginTop: 5,
  },
  infoText: {
    fontSize: 16,
    marginTop: 5,
  },
  linkText: {
    textDecorationLine: 'underline',
    color: '#5544ee',
  },
});

export const LocationsView: React.FC = () => {
  const [page, setPage] = useState(1);
  const {data, loading, error} = useDLE(
    new Endpoint(LocationService.loadLocations),
    {
      page,
    },
  );
  const [accumulatedData, reduceAccumulatedData] = useReducer<
    Reducer<LocationModel[], LocationModel[]>
  >(
    (entities, newEntities) => [...entities, ...newEntities],
    data?.results || [],
  );

  useEffect(() => reduceAccumulatedData(data?.results || []), [data]);

  return (
    <>
      <DataWrapper
        data={accumulatedData}
        loading={loading && !accumulatedData}
        error={error}>
        {results => (
          <View style={styles.container}>
            <FlatList
              data={results}
              ListHeaderComponent={
                <Text h2 style={styles.title}>
                  Locations
                </Text>
              }
              renderItem={({item}) => (
                <Card>
                  <Card.Title style={styles.cardTitle}>{item.name}</Card.Title>
                  <Card.Divider />
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>Type: {item.type}</Text>
                    <Text style={styles.infoText}>
                      Dimension: {item.dimension}
                    </Text>
                  </View>
                </Card>
              )}
              keyExtractor={item => item.id.toString()}
              onEndReached={() =>
                page < (data?.info.pages || 0) - 1 && setPage(page + 1)
              }
            />
          </View>
        )}
      </DataWrapper>
    </>
  );
};
