import React, {useState} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import './UserScoreFilter.css';

const makeMarks = () => {
    const marks = [];

    for(let i = 0; i <= 10; i++) {
        const content = {
            value: i
        };
    
        if (i === 0 || !(i % 5)) content.label = `${i}`;
    
        marks.push(content);
    }

    return marks;
}

const StyledSlider = withStyles({
    root: {
        color: '#a0a8a3'
    }
})(Slider)

export const UserScoreFilter = () => {
    const changeUserScore = () => console.log('changeUserScore');

    const [value, setValue] = useState([0, 10]);
    const valuetext = (value) => {
        return `${value}`;
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
        changeUserScore(newValue);
    };

    return (
        <div className='user-score-filter'>
            <Typography id="range-slider" gutterBottom>
                User Score
            </Typography>
            <StyledSlider
                value={value}
                max={10}
                marks={makeMarks()}
                step={1}
                onChange={handleChange}
                valueLabelDisplay="off"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
            />
        </div>
    );
}
