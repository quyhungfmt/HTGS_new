import { Alert,Keyboard,ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import DrawerSceneWrapper from '../navigation/Drawerscreen';
import { AntDesign } from '@expo/vector-icons';
import Task from '../datacustom/Realtime/taskrealtime';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Realtime_Sc = ({navigation}) => {
  const [list,setlist] = useState([])
  const [token,setToken] = useState('')
  const [onpressin , setonpressin] = useState(false);
  const[islogin,setlogin] = useState(false);
  
  const _delete = () => {
    let deletes = [...list]
    if(islogin === true)
    {
      deletes.splice(list.length() - list.length(), list.length());
    setlist(deletes)
    console.log('deletes')
    }
  }
  // CHƯA XONG
  
  const _data = async () => {
    try {
      const data = await AsyncStorage.getItem('login')
      setlogin(data);
    }
    catch(error)
    {
      
    }
  }
  useEffect(() => {_data()
  _delete();
  })

const addModule = async (token) => {
  console.log('hlegns',token.length)
  console.log('hlegns')
  // const updatedata = [...list, token]
  if(list.includes(token)  || token.length === 0) 
  {
    
    alert('cc')
  }
  else
  {
  let list1 = [...list]
  list1.push(token)
  setlist(list1)
  console.log('list 1', list)
  Keyboard.dismiss();
  AsyncStorage.setItem('list', JSON.stringify(list1))
 
  console.log('settoke')
  console.log('token delet',token)
  // update();
  console.log('ok') 
  setToken('')
  }
  }
  console.log('token delet',token)

  const add = () => {
    Alert.alert('Add module','Vui long nhap ma so module', 
    [
      {
        text: 'add',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => null},
    ]);
    return true;
  };

  // new
  const deletes = (index) => {
    Alert.alert('ARE YOU SURE!','Are you sure you want to delete it?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => {
        console.log('delete',index)
        let list_let = [...list]
        list_let.splice(index, 1)
        setlist(list_let)
        AsyncStorage.setItem('list',JSON.stringify(list_let));
        // AsyncStorage.clear();
      }},
    ]);
    return true;
    
}

  const update = async () => {
    const isclear = await AsyncStorage.getItem('cleardata');
      console.log('isclear',isclear === "true");
        if(isclear === "true")
        {
          console.log('p')
          const list1 = list.splice(0, list.length);
          setlist(list);
          console.log('k',list)
          AsyncStorage.setItem('cleardata', JSON.stringify(false));
          console.log('j')
          AsyncStorage.setItem('list', JSON.stringify(list));
          console.log('if updata',list)
           update();
        }
        else
        {
          const getlist = await AsyncStorage.getItem('list');
          setlist(JSON.parse(getlist))
          console.log('else updata',list)
        }
      }
  useEffect(() => {
    update();
  },[])
    // NEW
  return (
    <DrawerSceneWrapper title={'Home'}>
  <View style={styles.container}>
  <View style={styles.input}>
    <TextInput style={{
      backgroundColor:'#e8e1e1',
      width:'80%',
      height:'80%',
      borderRadius:20,
      borderWidth:2,
      borderStyle:'solid',
      borderColor:'blue',
      paddingLeft:10,
    }}
    placeholder = 'Your modules code'
    onChangeText={text => setToken(text)}
    value={token}
    >

    </TextInput>
    <TouchableOpacity style={styles.touch} 
    onPressIn={() => setonpressin(true)}
    onPressOut={() =>{ 
      setonpressin(false);
      addModule(token);
    }}
    >
        <AntDesign name="pluscircle" size={24} color={onpressin? 'black': 'white'} />
    </TouchableOpacity>
  </View>
  <ScrollView>
      {
        list.map((item,index) => {
          return <Task key={index} token={item} item={item}  onPress={() => deletes(index)} />
        })
      }
    </ScrollView>
  </View>

</DrawerSceneWrapper>
   
  
  )
}

export default Realtime_Sc

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  input: {
    justifyContent:'center',
    alignItems: 'center',
    flexDirection:'row',
  },
  touch: {
    height:50,
      width:50,
      backgroundColor:'blue',
      borderRadius:50,
      justifyContent: 'center',
      alignItems: 'center',
  }
})
