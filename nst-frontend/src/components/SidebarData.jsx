import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import CoffeeIcon from '@mui/icons-material/Coffee';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DescriptionIcon from '@mui/icons-material/Description';

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
                link:'/pretrazi-proizvode'
            },
            {
                title:'Dodaj proizvod',
                link:'/dodaj-proizvod'
            }
        ]
    },
    {
        title:'Dobavljači',
        icon: <LocalShippingIcon></LocalShippingIcon>,
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
                link:'/pretrazi-dobavljace'
            },
            {
                title:'Dodaj dobavljača',
                link:'/dodaj-dobavljaca'
            }
        ]
    },
    {
        title:'Narudžbenice',
        icon: <DescriptionIcon></DescriptionIcon>,
        link:'/',
        iconClosed: <KeyboardArrowDownIcon></KeyboardArrowDownIcon>,
        iconOpened: <KeyboardArrowUpIcon></KeyboardArrowUpIcon>,
        subNav:[
            {
                title:'Pronađi narudžbenicu',
                link:'/pretrazi-narudzbenice'
            },
            {
                title:'Dodaj narudžbenicu',
                link:'/dodaj-narudzbenicu'
            }
        ]
    }
];
