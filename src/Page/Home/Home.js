import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import {db} from "../../firebase";

function Home() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let list = [];
            try{
                const querySnapshot = await getDocs(collection(db, "user"));
                querySnapshot.forEach((doc) => {
                    list.push({id : doc.id, ...doc.data()})
                });
                setData(list);
            }catch(error){
                console.error(error.message);
            }
        }
        fetchData();
    },[])

    console.log("data",data);

    return (
        <div>
            Home Page
            <button onClick={() => navigate("/new")}>Add Item</button>
            <table>
                <tbody>
                {
                data.map(user => {
                    return <tr>
                        {Object.entries(user).map(([key, value]) => {
                            console.log(key, value);
                            
                            if(key !== "timeStamp") 
                                return<td>{value}</td>
                            return "abc";
                        })}
                    </tr>
                })
                }
                </tbody>
            </table>
        </div>
    )
}

export default Home