import { View, Text, FlatList, SafeAreaView, TouchableOpacity, TextInput, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import states from './States'
import langs from './langs';
import CheckBox from 'react-native-check-box'

export default function App() {

  type stateparam ={
    key:string,
    name:string

  };
  type langparams={
    code:string,
    name:string,
    selected:boolean
  };

  const [selected,setSelected]= useState<string>();
  const [show,setShow]= useState<boolean>(false);
  const [showModal,setShowModal]= useState<boolean>(false);
  const [vals,setVals]= useState<stateparam[]>(states);
  const [all,setAll]= useState<stateparam[]>(states);
  const [languge,setLangugae]= useState<langparams[]>();
  function search(val: string) {
   let cm=  vals.filter((va)=>{
    return va.name.toString().toUpperCase().match(val.toString().toUpperCase())
   })
   console.log("cmcmmc",cm);
   setAll(cm);
   
   

  }


  useEffect(()=>{

    const updatedLangs = langs.map(lang => ({
      ...lang, // Spread the existing properties
      selected: false // Add selected: false
    }));
    
    // Now update the state with the modified array
    setLangugae(updatedLangs);

  },[])

  const colorItem=(ind:number)=>{
    const updatedLanguage = languge?.map((item, index) => {
      // Check if the item is clicked twice (toggle selected state)
      if (index === ind) {
        return {
          ...item,
          selected: true,  // Toggle the selected state
        };
      }else{
        return {
          ...item,
          selected: false,  // Toggle the selected state
        };
      }
      // Keep other items unchanged
      return item;
    });
  
    console.log(updatedLanguage);  // Check the updated language array
    setLangugae(updatedLanguage);
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

<FlatList
data={languge}
numColumns={2}
renderItem={({item,index})=>{
  return(


    <TouchableOpacity 
    onPress={()=>{
      colorItem(index);

    }}
    
    style={{
      flexDirection:"row",
      width:"48%",borderRadius:10,borderWidth:1,height:56,margin:5,padding:10,justifyContent:"space-between",
      alignContent:"center",alignItems:"center",backgroundColor:item.selected?"#f26422":"#fff"
    }}>
  
      <CheckBox
    style={{flex: 1, padding: 10}}
    onClick={()=>{
      colorItem(index)
    }}
    isChecked={item.selected}
    leftText={item.name}
/>
    </TouchableOpacity>
  )
}}

/>
           

 
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