import React from "react";

function SelectDataKey({ onChange }) {
    return (
        <>
            <label htmlFor='key-select'>Select a key for sorting: </label>
            <select id='key-select' onChange={onChange}>
                <option value='cases'>Cases</option>
                <option value='todayCases'>today Cases</option>
                <option value='deaths'>Deaths</option>
                <option value='recovered'>Recovered</option>
                <option value='active'>Active</option>
            </select>
        </>
    )
}

export default SelectDataKey;