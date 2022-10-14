import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function New() {
    const [data, setData] = useState([]);
    const [file, setFile] = useState();
    const [perc, setPerc] = useState();

    useEffect(() => {

        const uploadImage = () => {

            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    setPerc(progress);
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default: break;
                    }
                },
                (error) => {
                    console.error(error.message);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setData((prev) => ({ ...prev, downloadURL }))
                    });
                }
            );
        }
        file && uploadImage();
    }, [file])

    const handleChange = e => {
        const id = e.target.id;
        const value = e.target.value;

        console.log(data);

        setData({ ...data, [id]: value });
    }

    const handleAddData = async e => {
        e.preventDefault();
        const res = await createUserWithEmailAndPassword(auth, data.email, data.password)
        await setDoc(doc(db, "user", res.user.uid), {
            ...data,
            timeStamp: serverTimestamp()
        })
            .catch(err => console.error(err.message))
    }

    return (
        <div>
            <form onSubmit={handleAddData}>
                <div>
                    <label>Name and Username</label>
                    <input type="text" id="name" onChange={handleChange} />
                </div>
                <div>
                    <label>Phone</label>
                    <input type="number" id="phone" onChange={handleChange} />
                </div>
                <div>
                    <label>Address</label>
                    <input type="text" id="address" onChange={handleChange} />
                </div>
                <div>
                    <label>Username</label>
                    <input type="text" id="username" onChange={handleChange} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" id="email" onChange={handleChange} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" id="password" onChange={handleChange} />
                </div>
                <div>
                    <label>Country</label>
                    <input type="text" id="country" onChange={handleChange} />
                </div>
                <div>
                    <label>Image</label>
                    <input type="file" id="image" onChange={e => setFile(e.target.files[0])} />
                </div>

                <button type="submit" disabled={perc !== null && perc<100}>Send</button>
            </form>
        </div>
    )
}

export default New