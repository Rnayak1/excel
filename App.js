import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions'
export default class App extends React.Component {
  createExcel = async () => {
    var data = [{
      name: "john",
      city: "seattle",
    },
    {
      name: "Khushboo",
      city: "Delhi",
    }];
    try {
      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(data);

      XLSX.utils.book_append_sheet(wb, ws, "Cities");
      const wbout = XLSX.write(wb, {
        type: "base64",
        bookType: "xlsx",
      });
      const uri = FileSystem.documentDirectory + "cities.xlsx";
      //console.log(`Writing to ${uri}`);
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted") {
        const asset = await MediaLibrary.createAssetAsync(uri);
        const fp = await MediaLibrary.createAlbumAsync("Download", asset, false);
        //console.log('fp => ', fp);
      }
      else {
        console.log('eeror > persmison ');
        return;
      }
    } catch (error) {
      console.log('error in isWrittern', error);
    }

  };
  render() {
    return (
      <View >
        <TouchableOpacity onPress={this.createExcel}
          style={
            {
              marginLeft: "40%",
              marginTop: "40%",
            }
          } >
          <Text > GEt excel </Text>
        </TouchableOpacity>
      </View>
    );
  }
}