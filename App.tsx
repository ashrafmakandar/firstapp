import { View, Text, FlatList, SafeAreaView, TouchableOpacity, TextInput, Modal } from 'react-native'
import React, { useState } from 'react'
import states from './States'

export default function App() {

  type stateparam ={
    key:string,
    name:string

  };

  const [selected,setSelected]= useState<string>();
  const [show,setShow]= useState<boolean>(false);
  const [showModal,setShowModal]= useState<boolean>(false);
  const [vals,setVals]= useState<stateparam[]>(states);
  const [all,setAll]= useState<stateparam[]>(states);
  function search(val: string) {
   let cm=  vals.filter((va)=>{
    return va.name.toString().toUpperCase().match(val.toString().toUpperCase())
   })
   console.log("cmcmmc",cm);
   setAll(cm);
   
   

  }

  return (
    <SafeAreaView style={{
      backgroundColor:"#f8f8f8",
      flex:1,marginTop:50,width:"100%"
    }}>

<View 

style={{
  flexDirection:"row",justifyContent:"space-between",
  margin:10,borderRadius:10,borderWidth:1,padding:10,height:48,alignItems:"center",borderColor:"#000"
}}>
  <Text
  style={{
    color:"#000",fontWeight:"bold",fontSize:18
  }}
  > {selected!=null?selected:"Please select state"}</Text>
  <TouchableOpacity onPress={()=>{
    setAll(vals);
    setShowModal(!showModal);
    
  }}>

  <Text>click</Text>
  </TouchableOpacity>
</View>
           

 
  <Modal
  visible={showModal}
  onRequestClose={()=>{
    setShowModal(false);
  }}
  transparent
  >
    <View style={{
      borderRadius:10,borderWidth:1,borderColor:"#000",
      position:"absolute",top:"60%",bottom:0,width:"100%",paddingHorizontal:"1%"
    
    }}>
    <TextInput
  onChangeText={(val)=>{
    console.log(val);
    search(val)
  }}
  placeholder='Please search state '
  style={{
    height:48,borderRadius:12,borderWidth:1,
    paddingHorizontal:10,marginTop:10,marginBottom:10,marginLeft:10,marginRight:10
  }}
  
  />
  <FlatList
     
     data={all}
     scrollEnabled
     showsVerticalScrollIndicator={false}
    
     renderItem={({item,index})=>{
       return(
         <TouchableOpacity 
         onPress={()=>{
           console.log(item.name)
           setSelected(item.name);
           setShow(!show)
         }}
         style={{
           padding:10,borderRadius:10,borderWidth:1,height:56,margin:5,justifyContent:"center",alignContent:"center",alignItems:"center"
         }}>
           <Text style={{
             fontSize:16,color:"#000000",fontWeight:"bold"
           }}> {item.name}</Text>
         </TouchableOpacity>
       )
     }}
     />

    </View>
 

  </Modal>




    </SafeAreaView>
  )
}