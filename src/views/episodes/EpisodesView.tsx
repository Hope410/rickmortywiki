import {DataWrapper} from '@/components';
import {EpisodeModel, EpisodeService} from '@/domain/episode';
import {PagedData} from '@/types';
import {Card, Text} from '@rneui/themed';
import _ from 'lodash';
import React, {Reducer, useReducer, useState} from 'react';
import {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

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

export const EpisodesView: React.FC = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<PagedData<EpisodeModel> | null>(null);
  const [accumulatedData, reduceAccumulatedData] = useReducer<
    Reducer<EpisodeModel[], EpisodeModel[]>
  >(
    (entities, newEntities) => [...entities, ...newEntities],
    data?.results || [],
  );

  useEffect(() => reduceAccumulatedData(data?.results || []), [data]);
  useEffect(() => {
    EpisodeService.loadEpisodes({page}).then(setData);
  }, [page]);

  return (
    <>
      <DataWrapper
        data={accumulatedData}
        loading={_.isNil(data) && accumulatedData.length === 0}
        error={undefined}>
        {results => (
          <View style={styles.container}>
            <FlatList
              data={results}
              ListHeaderComponent={
                <Text h2 style={styles.title}>
                  Episodes
                </Text>
              }
              renderItem={({item}) => (
                <Card>
                  <Card.Title style={styles.cardTitle}>{item.name}</Card.Title>
                  <Card.Divider />
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>Episode: {item.episode}</Text>
                    <Text style={styles.infoText}>
                      Air date: {item.air_date}
                    </Text>
                  </View>
                </Card>
              )}
              keyExtractor={item =>
                'episode_' + item.id.toString() + page.toString()
              }
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
