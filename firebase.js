


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVFXx50rCHIiv19qVSMBYkie5JIs8lZ2Q",
  authDomain: "fir-cy-9efeb.firebaseapp.com",
  projectId: "fir-cy-9efeb",
  storageBucket: "fir-cy-9efeb.appspot.com",
  messagingSenderId: "509614607981",
  appId: "1:509614607981:web:2558e8d00a3dace1353964"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//firestore database lưu trữ csdl

const db = getFirestore(app);
const auth = getAuth(app);

export {db,auth};







import React from 'react'
import { useEffect, useState } from 'react';
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc, onSnapshot, addDoc } from 'firebase/firestore';

export default function Demo() {
    const [todos, setTodos] = useState([]);

     // get data in firestore
     useEffect(() => {
   
        const collectionRef = collection(db, 'todos');
        onSnapshot(collectionRef, (snapShot) => {
            const localTodos = [];
            snapShot.forEach(doc => {
                localTodos.push({
                    id: doc.id,
                    message: doc.data().message
                });
            });
            setTodos(localTodos);
        });

    }, []);


     // add data in firestore
        const addNote = async () => {
            const collectionRef = collection(db, 'todos');
            await addDoc(collectionRef, { message });
        }

        // delete data in firestore
        const deleteNote = async (id) => {
            const docRef = doc(db, 'todos', id);
            await deleteDoc(docRef);
        }

        // edit data in firestore
        // sử dụng  useSearchParams để lấy id truyền querystring
         useEffect(() => {
            (async () => {
                const docRef = doc(db, 'todos', searchParam.get('id'));
                const docSnapshot = await getDoc(docRef);
                setMessage(docSnapshot.data().message);
            })();
         }, []);
    
        const editNote = async () => {
            const docRef = doc(db, 'todos', searchParam.get('id'));
            await updateDoc(docRef, { message: message });
        };

    return (
        <div>
            {
                todos.map((item, index) => {
                    return (
                        <div key={index}>{item.message}</div>
                    )
                })
            }
        </div>
    )
}

// upload file vào storage 

import React, {useEffect, useState} from 'react';
import {getStorage, uploadBytes, ref, getDownloadURL} from "firebase/storage"; // using upload file
import {db} from "../firebase";
import {addDoc, collection, getDocs} from "firebase/firestore";

const GalleryImage = () => {
    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);
    const storage = getStorage();

    const onChangeFile = (evt) => {
        setFile(evt.target.files[0]);//lay file từ input
    };

    const uploadFile = async (evt) => {
        const storage = getStorage();//base storage //unix
        const fileName = `images/${Date.now()}image.png`;
        const myRef = ref(storage, fileName);//tao ref
        try {
            await uploadBytes(myRef, file, fileName);
            //lưu lại file vào firestore
            const collectionRef = collection(db, 'images');

            const pathRef = ref(storage, fileName);
            const url = await getDownloadURL(pathRef);
            await addDoc(collectionRef, {
                url: url
            });
        } catch (e) {

        }
    }

    useEffect(() => {
        (async () => {
            const collectionRef = collection(db, 'images');
            const collectionSnapShot = await getDocs(collectionRef);
            const urls = [];
            collectionSnapShot.forEach(doc => {
                const {url} = doc.data();
                urls.push(url);
            });
            setFiles(urls);
            console.log(urls);
        })()
    }, []);

    return (
        <div>
            <input type="file" onChange={onChangeFile}/>
            {files.map(url => <img key={url} src={url} alt=""/>)}
            <button onClick={uploadFile}>Upload</button>
        </div>
    );
};

export default GalleryImage;
