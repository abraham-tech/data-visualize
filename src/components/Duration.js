import React from 'react';
import PropTypes from 'prop-types';

const COUNTER_ARRAY = Array.from({length: 30}, (_, index) => index + 1);
const Duration = props =>  
    <>
        <label> Start date </label>    
        <select
            value={props.startDate}
            onChange={ (e) =>props.handleStartDate(e.target.value)}
            >
            { COUNTER_ARRAY.map((value) => (<option key={value} value={value}>{value}</option>))}
        </select>

        <label> End date </label>
        <select
            value={props.endDate}
            onChange={ (e) => props.handleEndDate(e.target.value) }
            >
            { COUNTER_ARRAY.map((value) => (<option key={value} value={value}>{value}</option>))}
        </select>
    </>

    
Duration.propTypes = {
    startDate: PropTypes.number.isRequired,
    endDate: PropTypes.number.isRequired,
    handleStartDate: PropTypes.func.isRequired,
    handleEndDate: PropTypes.func.isRequired,
}

export default Duration;