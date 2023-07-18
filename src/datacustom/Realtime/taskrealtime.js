import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDatabase, onValue, ref, update } from 'firebase/database';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome, Entypo } from '@expo/vector-icons';

function Task  (props) {
    const [led, setled] = useState('');
    const [sound, setsound] = useState(true);
    const [warning, setWarning] = useState('');
    const [DetectionValue, setDetectionValue] = useState('');
    const database = getDatabase();
   useEffect(() => {
    const data = ref(database,'FirebaseIOT/admin/' + props.token+ '/LEDvalue');
    onValue(data, (ischange) => {
      const value = ischange.val();
      console.log({value});
      setled(value);
    })
    const warning = ref(database,'FirebaseIOT/admin/' + props.token+ '/Detection');
    onValue(warning, (ischange) => {
        const value = ischange.val();
        setWarning(value) 
    })
    const DetectionValue = ref(database,'FirebaseIOT/admin/' + props.token+ '/DetectionValue');
    onValue(DetectionValue, (ischange) => {
        const value = ischange.val();
        setDetectionValue(value) 
    })
   })
   console.log({DetectionValue})
   const onOffLed = () => {
    update(ref(database,'FirebaseIOT/admin/' + props.token),{
        LEDvalue: led==1 ? 0 : 1,
    })
   }
   return (
    <TouchableOpacity>
       <View style={styles.container}>
           {/* token */}
           <View style={{flex:5}}>
               <View style={{flexDirection:'row'}}>
                   <View style={{flex:3,backgroundColor:'#eeebeb',borderRadius:5,}}>
                       <Text 
                           style={styles.token}>{props.token} 
                       </Text>
                   </View>
                   <View>
                       <TouchableOpacity onPress={props.onPress}>
                           <MaterialCommunityIcons
                               name="delete-circle-outline" size={24} color="black" />
                       </TouchableOpacity>
                   </View>
                   </View>
           {/* data  */}
           <View style={styles.body}>
               <View style={styles.viewdata}>
                   <Text style={styles.id}>Led:  </Text>
                   <Text style={styles.data}>{led == 1? 'SÁNG' : 'TẮT' }</Text> 
                   <MaterialCommunityIcons
                   style={{marginLeft:30,}}
                   name={led==1? "alarm-light-outline" : "alarm-light-off-outline"} size={24}
                   color={led==1 ? '#ea8a77' : 'black' } /> 
               </View>

               {/*  */}
                   <View style={styles.viewdata}>
                   <Text style={styles.id}>Detection:  </Text>
                   <Text style={styles.data}>{warning}</Text>
                   <FontAwesome style={{marginLeft:10,}}
                   name="warning" size={24} color={DetectionValue == '1'? 'red': 'green'} />
                   </View>
                   <View style={styles.viewdata}>
                   <Text style={styles.id}>Loa Cảnh Báo  </Text>
                   <Text style={styles.data}>{sound? 'Bật': 'Tắt'}</Text>
                   <Entypo
                        style={{marginLeft:10,}}
                        name="controller-record" size={24} color={sound? 'green' :'black'} />
                   </View>
           </View>
           </View>
       {/* change Data */}
       <View style={styles.changevalue}>
           <Text style={{color:led =='ON' ? 'green' : 'black'}}>
               {led==1? "Tắt Đèn" : "Bật Đèn"}
           </Text>
           <Switch trackColor={{false: '#767577', true: '#81b0ff'}}
               thumbColor={led==1 ? '#f5dd4b' : '#f4f3f4'}
               ios_backgroundColor="#3e3e3e"
               onValueChange={()=> {onOffLed()}}
               value={led==1? true : false} />
           <Text style={{color:sound? 'green' : 'black'}}>
               {sound? 'Tắt Loa': 'Bật Loa'}
           </Text>
           <MaterialIcons 
               name={sound? "notifications-on": "notifications-off"} 
               size={30} 
               color={sound? 'blue' :'black'}
               onPress={()=> {setsound((prev) => !prev)}}
               />
       </View>
    </View>
   </TouchableOpacity>
  

 )
}

export default Task

const styles = StyleSheet.create({
   container:{
       backgroundColor:'white',
       width:'100%',
       borderRadius:20,
       // alignItems:'center',
       paddingVertical:5,
       paddingHorizontal:10,
       paddingBottom:5,
       borderColor:'black',
       borderWidth:2,
       marginTop:10,
       flexDirection:'row'
   },
   body:{
       alignItems:'flex-start',
       width:'100%',
   },
   token:{
       fontSize:20,
       fontWeight:'800',
       color:'blue',
   },
   id:{
       fontSize:18,
       fontWeight:'600',
   },
   data: {
       fontSize:16,
       fontWeight:'400',
   },
   viewdata:{
       flexDirection:'row',width:'100%',
       alignItems: 'center',
       borderBottomWidth:2,
       borderBottomColor:'black',
       borderRadius:5,
   },
   changevalue:
   {
       flex:1,
       alignItems:'center',
       transform:[
           {scale:0.95}
           ],
       borderWidth:2,
       borderColor:'black',
       borderRadius:5,
   },
})