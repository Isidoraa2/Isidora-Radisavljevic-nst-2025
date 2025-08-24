import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import CoffeeIcon from '@mui/icons-material/Coffee';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export const SidebarData = [
    {
        title:'Home',
        icon: <HomeIcon></HomeIcon>,
        link:'/'
    },
    {
        title:'Proizvodi',
        icon: <CoffeeIcon></CoffeeIcon>,
        link:'/proizvodi',
        iconClosed: <KeyboardArrowDownIcon></KeyboardArrowDownIcon>,
        iconOpened: <KeyboardArrowUpIcon></KeyboardArrowUpIcon>,
        subNav:[
            {
                title:'Prikaži sve proizvode',
                link:'/proizvodi'
            },
            {
                title:'Pronađi proizvod',
                link:'/'
            },
            {
                title:'Dodaj proizvod',
                link:'/dodaj-proizvod'
            }
        ]
    },
    {
        title:'Dobavljači',
        icon: <CoffeeIcon></CoffeeIcon>,
        link:'/dobavljaci',
        iconClosed: <KeyboardArrowDownIcon></KeyboardArrowDownIcon>,
        iconOpened: <KeyboardArrowUpIcon></KeyboardArrowUpIcon>,
        subNav:[
            {
                title:'Prikaži sve dobavljače',
                link:'/dobavljaci'
            },
            {
                title:'Pronađi dobavljača',
                link:'/'
            },
            {
                title:'Dodaj dobavljača',
                link:'/dodaj-dobavljaca'
            }
        ]
    },
    {
        title:'Narudžbenice',
        icon: <CoffeeIcon></CoffeeIcon>,
        link:'/',
        iconClosed: <KeyboardArrowDownIcon></KeyboardArrowDownIcon>,
        iconOpened: <KeyboardArrowUpIcon></KeyboardArrowUpIcon>,
        subNav:[
            {
                title:'Prikaži sve narudžbenice',
                link:'/'
            },
            {
                title:'Pronađi narudžbenicu',
                link:'/prikazi-narudzbenicu'
            },
            {
                title:'Dodaj narudžbenicu',
                link:'/dodaj-narudzbenicu'
            }
        ]
    }
];
