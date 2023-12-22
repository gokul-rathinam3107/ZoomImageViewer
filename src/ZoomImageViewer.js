import Carousel, {Pagination} from 'react-native-snap-carousel';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef, createRef} from 'react';
import {
    GestureHandlerRootView,
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from 'react-native-gesture-handler';

const ImageViewer = props => {
  const [panEnabled, setPanEnabled] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const image = props?.image;
  const [activeSlide, setActiveSlide] = useState(0);
  const pinchRef = createRef();
  const panRef = createRef();
  const isCarousel = useRef(null);

  console.log('image', image);

  const onPinchEvent = Animated.event(
    [
      {
        nativeEvent: {scale},
      },
    ],
    {useNativeDriver: true},
  );

  const onPanEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    {useNativeDriver: true},
  );

  const handlePinchStateChange = ({nativeEvent}) => {
    // enabled pan only after pinch-zoom
    if (nativeEvent.state === State.ACTIVE) {
      setPanEnabled(true);
    }

    // when scale < 1, reset scale back to original (1)
    const nScale = nativeEvent.scale;
    if (nativeEvent.state === State.END) {
      if (nScale < 1) {
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();

        setPanEnabled(false);
      }
    }
  };

  const renderItem = ({item}) => {
    console.log("item",item);
    return (
      <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        height: '60%',
        width: '100%',
        flex: 1,
        alignSelf: 'center',
        alignContent: 'center',
        padding: 10,
      }}>
      <PanGestureHandler
        onGestureEvent={onPanEvent}
        ref={panRef}
        simultaneousHandlers={[pinchRef]}
        enabled={panEnabled}
        failOffsetX={[-1000, 1000]}
        shouldCancelWhenOutside>
        <Animated.View>
          <PinchGestureHandler
            ref={pinchRef}
            onGestureEvent={onPinchEvent}
            simultaneousHandlers={[panRef]}
            onHandlerStateChange={handlePinchStateChange}>
            <Animated.Image
              source={{
                uri: item,
              }}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                width: '100%',
                height: '100%',
                // paddingVertical: (100),
                // alignSelf: "center",
                transform: [{scale}, {translateX}, {translateY}],
              }}
              resizeMode="contain"
            />
          </PinchGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    </View>
    );
  }

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1,backgroundColor:"#36393E"}}>
      <TouchableOpacity
        activeOpacity={0.7}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          position: 'absolute',
          zIndex: 1000,
          alignSelf: 'flex-end',
          borderRadius: 100,
          margin: 30,
        }}>
        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            color: 'white',
            fontSize: 16,
            padding: 10,
          }}>
          Close
        </Text>
      </TouchableOpacity>
      <View style={{alignSelf: 'center'}}>
        <Carousel
          data={image}
          renderItem={renderItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width}
          onSnapToItem={index => setActiveSlide(index)}
          inactiveSlideOpacity={0}
          loopClonesPerSide={image?.length}
          autoplay={false}
          inactiveSlideScale={1}
          onScrollIndexChanged={index => setActiveSlide(index)}
          snapToInterval={Dimensions.get('window').width}
          snapToAlignment="center"
          enableSnap={false}
        />
        <Pagination
          dotsLength={image?.length}
          activeDotIndex={activeSlide}
          carouselRef={isCarousel}
          renderDots={activeIndex =>
            image?.map((_ioniconName, i) => (
              // eslint-disable-next-line react-native/no-inline-styles
              <View style={{alignSelf: 'center'}} key={i}>
                {activeIndex === i ? (
                  <View style={styles.carouselCard}>
                    <Text style={styles.carouselTitle}>
                      {activeIndex + 1 + '/' + image?.length}
                    </Text>
                  </View>
                ) : (
                  <>
                    <View style={styles.carouselBg}>
                      <View style={styles.carouselView} />
                    </View>
                  </>
                )}
              </View>
            ))
          }
        />
      </View>
    </View>
  );
};

export default ImageViewer;

const styles = StyleSheet.create({
  carouselContainer: {
    backgroundColor: 'grey',
    borderRadius: 100,
    // eslint-disable-next-line no-dupe-keys
    backgroundColor: 'grey',
  },
  carouselTxt: {
    color: 'white',
    fontSize: 12,
    alignSelf: 'center',
    paddingHorizontal: 8,
    marginVertical: 2,
    borderRadius: 100,
  },
  carouselTitle: {
    color: 'black',
    fontSize: 12,
    alignSelf: 'center',
    paddingHorizontal: 8,
    marginVertical: 2,
    borderRadius: 100,
  },
  carouselCard: {
    backgroundColor: 'white',
    borderRadius: 100,
    // eslint-disable-next-line no-dupe-keys
    backgroundColor: 'white',
  },

  carouselBg: {
    backgroundColor: 'white',
    borderRadius: 120,
    margin: 5,
  },
  carouselView: {
    backgroundColor: 'black',
    fontSize: 12,
    alignSelf: 'center',
    marginHorizontal: 2.5,
    marginVertical: 2.5,
  },
});
