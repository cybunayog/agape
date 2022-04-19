/**
 * Card Item Component
 */
import React, { useEffect, useCallback, useState } from "react";
import { GiftedChat } from 'react-native-gifted-chat';
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert
} from "react-native";
import Icon from "./Icon";
import { CardItemT } from "../types";
import styles, {
  DISLIKE_ACTIONS,
  FLASH_ACTIONS,
  LIKE_ACTIONS,
  STAR_ACTIONS,
  WHITE,
  GRAY
} from "../../assets/styles";

// API's
import { updateSwipedLeft, updateSwipedRight, createChat, getUserChats, postMessage } from '../utils';

import io from 'socket.io-client';

import { useAuth } from '../context';

let socket: any;

const CardItem = ({
  data,
  hasActions,
  hasVariant,
  swipe

}: CardItemT) => {
  const auth = useAuth();
  // const [, setMessages] = useState<any>([]);
  const [messages, setMessages] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const [socketConnected, isSocketConnected] = useState<boolean>(false);

  const { userId, token } = auth.authData;
  let message = "";

  //send system message for new match
  const sendMatchMessage = async (message: any) => {
    console.log(message);

    createChat(
      userId,
      data.userId,
      token)
      .then((res: any) => {
        console.log(res.data._id); //chat id
        const { _id } = res.data;

        postMessage(userId, token, message, _id)
          .then((res: any) => {
            console.log("Message Sent!", res.data);
            //TODO: navigation.navigate to chats 
          })
          .catch((e: any) => {
            console.error(e.response.data.message);
          });

      })
      .catch((e: any) => {
        console.error(e.response.data.message);
      })
  }


  const handleMatch = () => {
    Alert.prompt(
      "You matched with " + data.profile.name,
      "Say Hi!",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Send",
          onPress: message => sendMatchMessage(message)
        }
      ],
    );
  }

  // Update swipedLeft
  const handleUpdateSwipedLeft = async (
    matchUserId: string
  ) => {
    return updateSwipedLeft(
      userId,
      matchUserId,
      token)
      .then((res: any) => {
        // console.log(res.data);
        // alert('swipedLeft Updated!');
        //TODO: make card swipe
      }).catch((e: any) => {
        console.error(e.response.data.message);
        // alert(e.message);
      })
  }

  // Update swipedRight
  const handleUpdateSwipedRight = async (
    matchUserId: string
  ) => {
    return updateSwipedRight(
      userId,
      token,
      matchUserId)
      .then((res: any) => {
        // console.log(res.data);
        // console.log(res.data.match);
        //if its true
        // if ((res.data.match).localeCompare("True")) {
        handleMatch();
        // }
        // alert('swipedRight Updated!');
        //TODO: make card swipe
      }).catch((e: any) => {
        console.error(e.response.data.message);
        // alert(e.message);
      })
  }


  // Custom styling
  const fullWidth = Dimensions.get("window").width;

  const imageStyle = [
    {
      borderRadius: 8,
      width: hasVariant ? fullWidth / 2 - 30 : fullWidth - 80,
      height: hasVariant ? 170 : 350,
      margin: hasVariant ? 0 : 20,
    },
  ];

  const nameStyle = [
    {
      paddingTop: hasVariant ? 10 : 15,
      paddingBottom: hasVariant ? 5 : 7,
      color: "#363636",
      fontSize: hasVariant ? 15 : 30,
    },
  ];

  useEffect(() => {
    console.log(swipe);
  }, []);

  return (
    <View style={styles.containerCardItem}>
      {/* IMAGE */}
      {data.image ? <Image source={data.image} style={imageStyle} /> : <Image source={{ uri: data.profile.photo }} style={imageStyle} />}

      {/* MATCHES */}
      {!data.matches && (
        <View style={styles.matchesCardItem}>
          <Text style={styles.matchesTextCardItem}>
            <Icon name="heart" color={WHITE} size={13} /> {data.percentage}% Match!
          </Text>
        </View>
      )}

      {/* NAME */}
      <Text style={nameStyle}>{data.profile.name}</Text>

      {/* ABOUT ME */}
      {data.aboutMe && <Text style={styles.descriptionCardItem}>{data.profile.aboutMe}</Text>}

      <View
        style={{
          borderBottomColor: GRAY,
          borderBottomWidth: 1,
          alignSelf: "stretch",
          // paddingVertical: 5,
          marginBottom: 5,
        }}
      />

      {/* GENDER */}
      <Text style={styles.descriptionCardItem}>{data.profile.gender}</Text>

      {/* LOCATION */}
      <Text style={styles.descriptionCardItem}>{data.profile.location}</Text>

      {/* RELIGION */}
      <Text style={styles.descriptionCardItem}>{data.profile.religion}</Text>

      {/* AGE */}
      <Text style={styles.descriptionCardItem}>{data.profile.age}</Text>

      {/* HOBBIES - use a map to iterate for each hobby */}

      {/* STATUS */}
      {!data.aboutMe && (
        <View style={styles.status}>
          <View style={data.isOnline ? styles.online : styles.offline} />
          <Text style={styles.statusText}>
            {data.isOnline ? "Online" : "Offline"}
          </Text>
        </View>
      )}

      {/* ACTIONS */}
      {hasActions && (
        <View style={styles.actionsCardItem}>
          {/* <TouchableOpacity style={styles.miniButton}>
            <Icon name="star" color={STAR_ACTIONS} size={14} />
          </TouchableOpacity> */}

          <TouchableOpacity style={styles.button} onPress={() => handleUpdateSwipedLeft(data.userId)}>
            <Icon name="close" color={DISLIKE_ACTIONS} size={25} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => handleUpdateSwipedRight(data.userId)}>
            <Icon name="heart" color={LIKE_ACTIONS} size={25} />
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.miniButton}>
            <Icon name="flash" color={FLASH_ACTIONS} size={14} />
          </TouchableOpacity> */}
        </View>
      )}
    </View>
  );
};

export default CardItem;
