import { View, Text, FlatList, SafeAreaView, TouchableOpacity, TextInput, Modal, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import states from './States'
import langs from './langs';
import CheckBox from 'react-native-check-box'
import countries from './Cites';

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


  type countylist={
    country:string,
    cities?:string[],
    states?: Record<string, string[]>;
  }
 
  type Users={
    userName:string,
    
  }

  const [selected,setSelected]= useState<string>();
  const [show,setShow]= useState<boolean>(false);
  const [showModal,setShowModal]= useState<boolean>(false);
  const [vals,setVals]= useState<stateparam[]>(states);
  const [all,setAll]= useState<stateparam[]>(states);
  const [languge,setLangugae]= useState<langparams[]>();
  const [allCountries,setAllCounties]= useState<countylist[]>(countries);
  const [alldata,setAllData]= useState<string[]|Record<string, string[]>  |undefined>();
  const [users,setUsers]= useState<Users[]>([]);
  const [name,setName]= useState<string>("");
  const valueref= useRef(new Animated.Value(0)).current;
  const [edited,setEdited]= useState<boolean>(false);
  const [editIndex,setEditIndex]= useState<number>();
  const valueref1= useRef(new Animated.ValueXY({
    x:10,y:20
  })).current;
  function search(val: string) {
   let cm=  vals.filter((va)=>{
    return va.name.toString().toUpperCase().match(val.toString().toUpperCase())
   })
   console.log("cmcmmc",cm);
   setAll(cm);
   
   
   

  }
  const startAnimation=()=>{
    Animated.timing(valueref1,{
      toValue:200,
      duration:2100,
      useNativeDriver:false
    }).start()
  }


  useEffect(()=>{

    const updatedLangs = langs.map(lang => ({
      ...lang, // Spread the existing properties
      selected: false // Add selected: false
    }));
    
    // Now update the state with the modified array
    setLangugae(updatedLangs);
    startAnimation();

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

  const addUser=()=>{
 
setUsers(us=>[...users,{
  userName:name
}]);

  }


  const editItem=(index:number)=>{

    const item = users.filter((it,ind)=>{
      return index===ind
    });
    setName(item[0].userName);
    setEditIndex(index);
   

  
    console.log("edited"+JSON.stringify(item));
    console.log(users);

  }


  const deleteItem=(index:number)=>{
    const item = users.filter((it,ind)=>{
      return index!=ind
    });
    console.log("dleeted"+JSON.stringify(item));
    setUsers(item);
  }

  const editItems=()=>{
    console.log("editedindex",editIndex);
    let updatedUsers = users.map((item, ind) => {
      if (editIndex === ind) {
        return { ...item, userName: name };  // Update userName at editIndex
      }
      return item;  // Return the user unchanged
    });
    
    setUsers(updatedUsers);
  }

  return (
    <SafeAreaView style={{
      backgroundColor:"#f8f8f8",
      flex:1,marginTop:100,width:"100%"
    }}>

      <View style={{
      marginTop:40
      }}>

        <TextInput
        placeholder='Enter user name'
        value={name}
        onChangeText={(e)=>{
          setName(e)
        }}
        style={{
          borderRadius:12,borderWidth:1,height:48,margin:10,padding:10,fontSize:20,fontWeight:"bold"
        }}
        />
        <TouchableOpacity 
        style={{
          elevation:5,
          margin:5,
          padding:10,
          justifyContent:"center",alignContent:"center",alignItems:"center",
          height:48,borderRadius:10,borderWidth:1,borderColor:'#fff',backgroundColor:"#000000"
        }}
        onPress={()=>{
          edited?
         editItems()
          :
          
          addUser()}}>
          <Text style={{
            color:"#fff",fontSize:20,fontWeight:"bold"
          }}> {edited?"edit user":"Add User"}</Text>
        </TouchableOpacity>
        <FlatList
        data={users}
        renderItem={({item,index}:{item:Users,index:number})=>{
          return(
            <View style={{
              height:56,borderWidth:1,borderRadius:10,
              width:"96%",
              justifyContent:"space-between",flexDirection:"row",margin:5,alignContent:"center",alignItems:"center"
            }}>
        <Text style={{
          fontSize:17,fontWeight:"bold",color:"blue"
        }}>      {item.userName}</Text>
        <TouchableOpacity
        onPress={()=>{editItem(index)
          setEdited(true);

        }}
        >
        <Text style={{
          fontSize:17,fontWeight:"bold",color:"green"
        }}>Edit</Text>

        </TouchableOpacity>
       <TouchableOpacity onPress={()=>{deleteItem(index)}}>
       <Text
        style={{
          fontSize:16,fontWeight:"bold",color:"red",margin:10
        }}
        
        >Delete</Text>

       </TouchableOpacity>
       
            </View>
          )
        }}
        />


      {/* <FlatList
      data={allCountries}
      renderItem={({item,index})=>{
        return(
          <TouchableOpacity 
          onPress={()=>{
            console.log(item);
            const states = item.states ? Object.values(item.states).flat() : [];
            setAllData(item.cities!=null?item.cities:states)
          }}
          style={{
            height:56,paddingHorizontal:10,margin:5,borderRadius:10,borderWidth:1,
       
          }}>
            <Text style={{
              paddingTop:5,paddingBottom:5,
              fontWeight:"bold",color:"#526622",fontSize:17,textTransform:"capitalize"
            }}>{item.country}</Text>
          </TouchableOpacity>
        )

      }}
      
      /> */}
      </View>
      {/* <FlatList
      data={alldata}
      renderItem={({item})=>{
     
        return(
          <View>
            <Text>{item}</Text>
          </View>
        )

      }}
      /> */}

  
    
{/* 
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
</View> */}

{/* <FlatList
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

/> */}
           

 
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
  {/* <FlatList
     
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
     /> */}

    </View>
 

  </Modal>




    </SafeAreaView>
  )
}