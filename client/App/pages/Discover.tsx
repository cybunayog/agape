/**
 * Discover Screen
 */
import React, { useState, FC } from "react";
import {
    View,
    ImageBackground,
    TouchableOpacity,
    Text
} from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";
import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useAuth } from "../navigation";
import {
    HomeNavigatorParamList,
    RootNavigatorParamsList
} from "../types";
import {
    City,
    Filters,
    CardItem
} from "../components";
import styles from "../../assets/styles";
import DEMO from "../../assets/data/demo";


export interface DiscoverProps {
    navigation: CompositeNavigationProp<NativeStackNavigationProp<HomeNavigatorParamList, 'Discover'>,
    NativeStackNavigationProp<RootNavigatorParamsList>>;
}

const Discover: FC<DiscoverProps> = ({ navigation }) => {
    const [swiper, setSwiper] = useState<CardStack | null>(null);
    const auth = useAuth();

    const signOut = async () => {
        auth.signOut()
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <ImageBackground
            source={require("../../assets/images/bg.png")}
            style={styles.bg}
        >
            <View style={styles.containerHome}>
                <View style={styles.top}>
                    {/* <City /> */}
                    {/* <Filters /> */}
                </View>
                <CardStack
                    loop
                    verticalSwipe={false}
                    renderNoMoreCards={() => null}
                    ref={(newSwiper): void => setSwiper(newSwiper)}
                >
                    {/** API Call made here */}
                    {DEMO.map((item) => (
                        <Card key={item.id}>
                            <CardItem
                                hasActions
                                image={item.image}
                                name={item.name}
                                description={item.description}
                                matches={item.match}
                            />
                        </Card>
                    ))}
                </CardStack>
            </View>
        </ImageBackground>
    );
};

export default Discover;