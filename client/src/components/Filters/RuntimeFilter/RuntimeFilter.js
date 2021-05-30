import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import './RuntimeFilter.css';

const makeMarks = () => {
    const marks = [];

    for(let i = 0; i < 400; i += 15) {
        const content = {
            value: i
        };
    
        if (i === 0 || !(i % 120)) content.label = `${i}`;
    
        marks.push(content);
    }

    return marks;
}

const StyledSlider = withStyles({
    root: {
        color: '#a0a8a3'
    }
})(Slider)

export const RuntimeFilter = ({language, localizations}) => {
    const changeRunTime = () => console.log('changeRunTime');
    const [value, setValue] = React.useState([0, 400]);
    const valuetext = (time) => {
        return `${value[0]} minutes - ${value[1]} minutes`;
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);

        changeRunTime(newValue);
    };

    return (
        <div className='user-score-filter'>
            <Typography id="range-slider" gutterBottom>
            {language === localizations.EN ? 'Runtime' : 'Длительность'}
            </Typography>
            <StyledSlider
                value={value}
                max={400}
                marks={makeMarks()}
                step={15}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
            />
        </div>
    );
}
