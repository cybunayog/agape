/**
 * Subscription Item Component
 */
import React, { useState } from "react";
import { Text, View } from "react-native";
import Icon from "./Icon";
import { RadioButton } from 'react-native-paper';
import { SubscriptionItemT } from "../types";

//Styles
import styles, {
    DARK_GRAY,
    WHITE,
    GRAY,
    PRIMARY_COLOR,
    SECONDARY_COLOR
} from "../../assets/styles";

const SubscriptionItem = ({ data }: SubscriptionItemT) => {
  const [checked, setChecked] = useState<any>("");

  return (
    <View style={styles.subscriptionContainer}>
      <Text style={styles.textTitles}>Subscription</Text>
      {data ? (
        <>
          <View style={styles.subscriptionOptions}>
            <Text style={styles.textTitles}>{data.name}</Text>
            <Text style={styles.textDescription}>Price: {data.price}</Text>
            <RadioButton
              value="basic"
              color={PRIMARY_COLOR}
              status={checked === "basic" ? "checked" : "unchecked"}
              onPress={() => setChecked(data.name)}
            />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.textDescription}>No Data!</Text>
        </>
      )}
    </View>
  );
}

export default SubscriptionItem;
