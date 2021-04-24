import React, {useState} from 'react'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import './UserScoreFilter.css';

const marks = [
    {
        value: 0,
        label: '0',
    },
    {
        value: 1,
    },
    {
        value: 2,
    },
    {
        value: 3,
    },
    {
        value: 4,
    },
    {
        value: 5,
        label: '5',
    },
    {
        value: 6,
    },
    {
        value: 7,
    },
    {
        value: 8,
    },
    {
        value: 9,
    },
    {
        value: 10,
        label: '10',
    },
];

export const UserScoreFilter = () => {
    const changeUserScore = () => console.log('changeUserScore');

    const [value, setValue] = React.useState([0, 10]);
    const valuetext = (value) => {
        return `${value}`;
    };
    const handleChange = (event, newValue) => {
        console.log('User score:', newValue);
        setValue(newValue);

        changeUserScore(newValue);
    };

    return (
        <div className='user-score-filter'>
            <Typography id="range-slider" gutterBottom>
                User Score
            </Typography>
            <Slider
                value={value}
                max={10}
                marks={marks}
                step={1}
                onChange={handleChange}
                valueLabelDisplay="off"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
            />
        </div>
    );
}
