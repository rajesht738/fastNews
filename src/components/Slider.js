import React, { useEffect, useRef, useState } from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Dimensions,
} from 'react-native';


let currentSlideIndex = 0;
const width = Dimensions.get('window').width - 20;
let intervalId;
const Slider = ({ data, title }) => {
    const [dataToRender, setDataToRender] = useState([]);
    const [visibleSlideIndex, setVisibleSlideIndex] = useState(0);
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        currentSlideIndex = viewableItems[0]?.index || 0;
        setVisibleSlideIndex(currentSlideIndex);
    });
    const viewabilityConfi = useRef({
        viewAreaCoveragePercentThreshold: 50,
    });
    useEffect(() => {
        const newData = [[...data].pop(), ...data, [...data].shift()];
        setDataToRender([...newData])
    }, [data.length]);

    const flateListRef = useRef();
    const handleToScrollTo = (index) => {
        flateListRef.current.scrollToIndex({ animated: false, index });
    };
    const startSlider = () => {
        if (currentSlideIndex <= dataToRender.length - 2) {
            intervalId = setInterval(() => {
                flateListRef.current?.scrollToIndex({ animated: true, index: currentSlideIndex + 1 })
            }, 4000);
        } else {
            pauseSlider();
        }
    };
    const pauseSlider = () => {
        clearInterval(intervalId);
    }

    useEffect(() => {
        if (dataToRender.length && flateListRef.current) {
           startSlider();
        }
    }, [dataToRender.length]);


    useEffect(() => {
        const length = dataToRender.length;
        // setAtiveSlideIndex(length)
        // reset slide to first
        if (visibleSlideIndex === length - 1 && length) handleToScrollTo(1);
        // reset slide to last
        if (visibleSlideIndex === 0 && length) handleToScrollTo(length - 2)
        const lastSlide = currentSlideIndex === length - 1;
        const firstSlide = currentSlideIndex === 0;

        if (lastSlide && length) setActiveSlideIndex(0);
        else if (firstSlide && length) setActiveSlideIndex(currentSlideIndex - 2);
        else setActiveSlideIndex(currentSlideIndex - 1);

    }, [visibleSlideIndex]);

    const renderItem = ({ item }) => {
        return (<View>
            <Image
                source={{ uri: item.thumbnail }}
                style={{ width, height: width / 1.7, borderRadius: 7 }}
            />
            <View style={{ width }}>
                <Text
                    numberOfLines={2}
                    style={{ fontWeight: "700", color: "#383838", fontSize: 22 }}>{item.title}</Text>
            </View>
        </View>)
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.sliderHead}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.sliderIndicatorContainer}>
                        <SlideIndicators data={data} activeSlideIndex={activeSlideIndex} />
                    </View>

                </View>
                <FlatList
                
                    ref={flateListRef}
                    data={dataToRender}
                    keyExtractor={(item, index) => item.id + index}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    onScrollBeginDrag={pauseSlider}
                    onScrollEndDrag={startSlider}
                    initialScrollIndex={1}
                    onViewableItemsChanged={onViewableItemsChanged.current}
                    viewabilityConfig={viewabilityConfi.current}
                    getItemLayout={(_, index) => (
                        {
                            length: width,
                            offset: width * index,
                            index
                        }
                    )}
                    renderItem={renderItem}
                />
            </View>
        </ScrollView>
    );
};

const SlideIndicators = ({ data, activeSlideIndex }) => 
    data.map((item, index) => {
        return (
            <View key={item.id} style={[
                styles.slides,
                {
                    backgroundColor:
                        activeSlideIndex === index ? "#383838" : "transparent"
                },
            ]}
            />
        ) 
    });


const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        width,
    },
    sliderHead: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 5,
    },
    title: { fontWeight: "700", color: "#383838", fontSize: 22 },
    sliderIndicatorContainer:
        { flexDirection: "row", alignItems: "center" },
    slides: {
        width: 12,
        height: 12,
        borderRadius: 6,
        borderWidth: 2,
        marginLeft: 5,
    },

})
export default Slider;
