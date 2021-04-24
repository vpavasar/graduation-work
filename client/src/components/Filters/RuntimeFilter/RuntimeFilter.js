import React from 'react'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import './RuntimeFilter.css';

const marks = [
    {
        value: 0,
        label: '0',
    },
    {
        value: 15,
    },
    {
        value: 30,
    },
    {
        value: 35,
    },
    {
        value: 40,
    },
    {
        value: 45,
    },
    {
        value: 50,
    },
    {
        value: 60,
    },
    {
        value: 65,
    },
    {
        value: 70,
    },
    {
        value: 75,
    },
    {
        value: 50,
    },
    {
        value: 85,
    },
    {
        value: 90,
    },
    {
        value: 95,
    },
    {
        value: 100,
    },
    {
        value: 105,
    },
    {
        value: 110,
    },
    {
        value: 115,
    },
    {
        value: 120,
        label: '120',
    },
    {
        value: 125,
    },
    {
        value: 130,
    },
    {
        value: 135,
    },
    {
        value: 140,
    },
    {
        value: 145,
    },
    {
        value: 150,
    },
    {
        value: 155,
    },
    {
        value: 160,
    },
    {
        value: 165,
    },
    {
        value: 170,
    },
    {
        value: 175,
    },
    {
        value: 180,
    },
    {
        value: 185,
    },
    {
        value: 190,
    },
    {
        value: 195,
    },
    {
        value: 200,
    },
    {
        value: 205,
    },
    {
        value: 210,
    },
    {
        value: 215,
    },
    {
        value: 220,
    },
    {
        value: 225,
    },
    {
        value: 230,
    },
    {
        value: 235,
    },
    {
        value: 240,
        label: '240',
    },
    {
        value: 245,
    },
    {
        value: 250,
    },
    {
        value: 255,
    },
    {
        value: 260,
    },
    {
        value: 265,
    },
    {
        value: 270,
    },
    {
        value: 275,
    },
    {
        value: 280,
    },
    {
        value: 285,
    },
    {
        value: 290,
    },
    {
        value: 295,
    },
    {
        value: 300,
    },
    {
        value: 305,
    },
    {
        value: 310,
    },
    {
        value: 315,
    },
    {
        value: 320,
    },
    {
        value: 325,
    },
    {
        value: 330,
    },
    {
        value: 335,
    },
    {
        value: 340,
    },
    {
        value: 345,
    },
    {
        value: 350,
    },
    {
        value: 355,
    },
    {
        value: 360,
        label: '360',
    },
    {
        value: 365,
    },
    {
        value: 370,
    },
    {
        value: 375,
    },
    {
        value: 380,
    },
    {
        value: 385,
    },
    {
        value: 390,
    },
    {
        value: 395,
    },
    {
        value: 400,
    }
];

export const RuntimeFilter = () => {
    const changeRunTime = () => console.log('changeRunTime');
    const [value, setValue] = React.useState([0, 400]);
    const valuetext = (value) => {
        return `${value} minutes`;
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);

        changeRunTime(newValue);
    };

    return (
        <div className='user-score-filter'>
            <Typography id="range-slider" gutterBottom>
                Runtime
            </Typography>
            <Slider
                value={value}
                max={400}
                marks={marks}
                step={15}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
            />
        </div>
    );
}
