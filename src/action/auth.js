import auth from '@react-native-firebase/auth'
import Snackbar from 'react-native-snackbar'
import database from '@react-native-firebase/database'

export const signup=(data)=>async(dispatch)=>{
    console.log(data);
    const {name, instaUserName, bio, email, password, country, image}=data

    auth().createUserWithEmailAndPassword(email, password)
    .then((data)=>{
        console.log(data)
        console.log("User creation was sucess")

        database()
        .ref('/users/'+data.user.uid)
        .set({
            name,
            instaUserName,
            country,
            image,
            bio,
            uid: data.user.uid
        })
        .then(()=>console.log('Data set sucess'))
        Snackbar.show({
            text:'account created',
            textColor:'white',
            backgroundColor:'#1b262c'
        })
    })
    .catch((e)=>{
        console.log(e)
        Snackbar.show({
            text:"Signup failed",
            textColor:'white',
            backgroundColor:'red'
        })
    })
}

export const signIn=(data)=>async(dispatch)=>{
    console.log(data)
    const {email, password}=data

    auth()
    .signInWithEmailAndPassword(email, password)
    .then(()=>{
        console.log("sign in success")
        Snackbar.show({
            text:"account signed in",
            textColor:"white",
            backgroundColor:"#1b262c"
        })
    })
    .catch((e)=>{
        console.log(e)
        Snackbar.show({
            text:"Sign in failed",
            textColor:"white",
            backgroundColor:"red"
        })
    })
}

export const signOut=()=>async(dispatch)=>{
    auth()
    .signOut()
    .then(()=>{
        Snackbar.show({
            text:"signout sucess",
            textColor:"white",
            backgroundColor:"#1b262c"
        })
    })
    .catch((e)=>{
        console.log(e)
        Snackbar.show({
            text:"signout failed",
            textColor:"white",
            backgroundColor:"red"
        })
    })
}