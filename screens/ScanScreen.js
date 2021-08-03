import React from 'react';
import { Text, TouchableOpacity,Image, View, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class Scanscreen extends React.Component {
  constructor(){
    super();
    this.state= {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: ' ',
      buttonState: 'normal',
    }
  }

  getCameraPermissions= async () => {
    const {status}= await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions: status=== "granted",
      buttonState: 'Clicked',
      scanned: false,
    })
  }

handleBarCodeScanned= async ({type,data}) => {
  this.setState({
    scanned: false,
    scannedData: data,
    buttonState: 'normal',
  })
}

    render(){
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;
      const hasCameraPermissions= this.state.hasCameraPermissions;

      if(buttonState==="clicked"&& hasCameraPermissions){
        return(
          <BarCodeScanner 
          onBarCodeScanned= {scanned? undefined: this.handleBarCodeScanned}
          style= {StyleSheet.absoluteFillObject}/>
        )
      }
      else if(buttonState==="normal"){

      
        return (
          
       <View style={styles.container}>

              <Text style= {styles.displayText}>{
              hasCameraPermissions=== true? this.state.scannedData: "Request camera permission"}
              </Text>
              <TouchableOpacity 
              onPress= {this.getCameraPermissions}
              style = {styles.scanButton}
              title = "Barcode Scanner">
             <Text style = {styles.buttonText}>Scan Qr Code</Text>
             
            </TouchableOpacity>
              
            </View>
          );
          
              }
    }
   
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  displayText:{
    fontSize: 15,
    textDecorationLine: 'underline',

  },
  scanButton:{
    backgroundColor: 'blue',
    padding: 10,
    margin: 10,
  },
  buttonText:{
    fontSize: 20,
  },

})


  