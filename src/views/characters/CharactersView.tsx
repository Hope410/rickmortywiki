import {DataWrapper} from '@/components';
import {CharacterModel, CharacterService} from '@/domain/character';
import {Card, Image, Text} from '@rneui/themed';
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
  image: {
    width: '100%',
    height: 420,
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

export const CharactersView: React.FC = () => {
  const [page, setPage] = useState(1);
  const {data, loading, error} = useDLE(
    new Endpoint(CharacterService.loadCharacters),
    {
      page,
    },
  );
  const [accumulatedData, reduceAccumulatedData] = useReducer<
    Reducer<CharacterModel[], CharacterModel[]>
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
                  Characters
                </Text>
              }
              renderItem={({item}) => (
                <Card>
                  <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={{
                      uri: item.image,
                    }}
                  />
                  <Card.Title style={styles.cardTitle}>{item.name}</Card.Title>
                  <Card.Divider />
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>Status: {item.status}</Text>
                    <Text style={styles.infoText}>Species: {item.species}</Text>
                    <Text style={styles.infoText}>Gender: {item.gender}</Text>
                    <Text style={styles.infoText}>
                      Location: {item.location.name}
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
