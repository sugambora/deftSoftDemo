import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import moment from 'moment';

import Colors from '../constants/Colors';

var myInterval;
var minTime = moment('00:00:00', 'HH:mm:ss');

const TimerScreen = (props) => {
  const [timerValue, setTimerValue] = useState(
    moment('00:00:00', 'HH:mm:ss').format('HH:mm:ss'),
  );
  const [isPaused, setIsPaused] = useState(true);
  const [increment, setIncrement] = useState('1');

  const startTimer = () => {
    clearInterval(myInterval);
    myInterval = setInterval(changeTimer, 1000);
  };

  const changeTimer = () => {
    // console.log('timer changed: ', increment);

    setTimerValue((prev) => {
      //   let newTime = moment(prev, 'HH:mm:ss')
      //     .add(parseInt(increment), 'seconds')
      //     .format('HH:mm:ss');
      let newTime = moment(prev, 'HH:mm:ss').add(
        parseInt(increment),
        'seconds',
      );

      let prevTime = moment(prev, 'HH:mm:ss');

      //   console.log(
      //     'newTime: ',
      //     newTime,
      //     '  prev: ',
      //     prevTime,
      //     '  minTime: ',
      //     minTime,
      //   );

      let difference = moment(newTime).diff(minTime, 'seconds');

      //   console.log('Difference: ', difference);

      if (difference <= 0) {
        clearInterval(myInterval);
        setTimerValue(moment('00:00:00', 'HH:mm:ss').format('HH:mm:ss'));
        setIncrement('1');
        setIsPaused(true);

        Alert.alert('Timer Stopped!', 'Timer value can not be negative.', [
          {
            text: 'Okay',
          },
        ]);
        return;
      }
      return newTime.format('HH:mm:ss');
    });
  };

  useEffect(() => {
    if (isPaused == false) {
      startTimer();
    }

    if (isPaused == true) {
      clearInterval(myInterval);
    }
  }, [isPaused, increment]);

  return (
    <View style={styles.mainContainer}>
      <Text
        style={{
          color: Colors.black,
          fontSize: 20,
        }}>
        {timerValue}
      </Text>
      <TouchableOpacity
        onPress={() => {
          setIsPaused((prev) => !prev);
        }}>
        <View style={styles.mainButtons}>
          {isPaused ? (
            <Text style={styles.buttonText}>Start</Text>
          ) : (
            <Text style={styles.buttonText}>Pause</Text>
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          clearInterval(myInterval);
          setTimerValue(moment('00:00:00', 'HH:mm:ss').format('HH:mm:ss'));
          setIsPaused(true);
          setIncrement('1');
        }}>
        <View style={styles.mainButtons}>
          <Text style={styles.buttonText}>Stop</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.controlsContainer}>
        <TouchableOpacity
          onPress={() => {
            if (increment < 10) {
              setIncrement((prev) => parseInt(prev) + 1);
            }
          }}>
          <View style={styles.controls}>
            <Text style={styles.buttonText}>+</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.increment}>{increment}</Text>

        <TouchableOpacity
          onPress={() => {
            if (increment > -10) {
              setIncrement((prev) => parseInt(prev) - 1);
            }
          }}>
          <View style={styles.controls}>
            <Text style={styles.buttonText}>-</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 40,
  },
  mainButtons: {
    backgroundColor: Colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 190,
    marginVertical: 10,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
  },
  controlsContainer: {
    flexDirection: 'row',
    width: '50%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'pink',
  },
  controls: {
    width: 50,
    height: 60,
    backgroundColor: Colors.red,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  increment: {
    fontSize: 18,
  },
});

export default TimerScreen;
