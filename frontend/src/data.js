// import Axios from 'axios';
// import React, { useContext, useEffect } from 'react'
// import {AuthContext} from "./contexts/authContext"

const data = [
    {
        id: 1,
        title: 'Showroom',
        date: '2020/10/20',
        body: 'have to buy a car',
        completed: false
    },
    {
        id: 2,
        title: 'Airport',
        date: '2020/10/20',
        body: 'have to pickup brother',
        completed: false
    },
    {
        id: 3,
        title: 'Go to mall',
        date: '2020/10/20',
        body: 'have to buy groceries and stuffs',
        completed: true
    },
    {
        id: 4,
        title: 'Go to market',
        date: '2020/10/20',
        body: 'have to buy vegetables',
        completed: true
    },

]

// function  FetchingData(){
//     const {state} =useContext(AuthContext);

   
// };


export const completed = data.filter((item) => {
    return item.completed === true
});
export const incompleted = data.filter((item) => {
    return item.completed === false
});


