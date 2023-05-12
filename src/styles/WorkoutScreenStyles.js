import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  workoutsContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  selectedFilterButton: {
    backgroundColor: '#eee',
  },
});

export default styles;
