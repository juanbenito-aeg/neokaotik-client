import { useContext } from 'react';
import AcolytesContext from '../../../contexts/AcolytesContext';
import AcolyteStatus from './AcolyteStatus';
import useMetrics from '../../../hooks/use-metrics';
import { ScrollView } from 'react-native';

const AcolytesStatus = () => {
  const { acolytes } = useContext(AcolytesContext)!;

  const { moderateScale } = useMetrics();

  return (
    <ScrollView
      contentContainerStyle={{ padding: moderateScale(25, 0.25) }}
      showsVerticalScrollIndicator={false}
    >
      {acolytes.map(acolyte => {
        return (
          <AcolyteStatus
            key={acolyte._id}
            avatar={acolyte.avatar}
            nickname={acolyte.nickname}
            isInside={acolyte.isInside}
          />
        );
      })}
    </ScrollView>
  );
};

export default AcolytesStatus;
