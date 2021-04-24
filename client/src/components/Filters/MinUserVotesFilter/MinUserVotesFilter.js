import React, {useState} from 'react'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import './MinUserVotesFilter.css';

const marks = [
    {
        value: 0,
        label: '0',
    },
    {
        value: 50,
    },
    {
        value: 100,
        label: '100',
    },
    {
        value: 150,
    },
    {
        value: 200,
        label: '200',
    },
    {
        value: 250,
    },
    {
        value: 300,
        label: '300',
    },
    {
        value: 350,
    },
    {
        value: 400,
        label: '400',
    },
    {
        value: 450,
    },
    {
        value: 500,
        label: '500',
    },
];

export const MinUserVotesFilter = (props) => {
    const changeMinUserVoteCount = () => console.log('changeMinUserVoteCount');
    const [value, setValue] = useState(0);
    const valuetext = (value) => {
        return `${value}`;
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log('changeMinUserVoteCount:', value);
        changeMinUserVoteCount(newValue);
    };

    return (
        <div className='minimum-user-votes-filter'>
            <Typography id="range-slider" gutterBottom>
                Minimum User Votes
            </Typography>
            <Slider
                value={value}
                max={500}
                marks={marks}
                step={50}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
            />
        </div>
    );
}
