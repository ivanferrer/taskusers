import './Select.scss'
import React from 'react'

const Select = ({options, inputName, labelSelect, defaultValue, handleChangeOption}) => {

    const selectedOption = defaultValue || (options.length && options[0]) ? options[0].value : ''

    console.log(selectedOption)
    return (<div className="form-control combo-select">
                    <label>{labelSelect || 'Selecione:'}</label>
                    <select name={inputName || 'select_item'} defaultValue={selectedOption} onChange={event=>handleChangeOption(event)}>
                        {options.map((item) => {
                              const selected = (defaultValue == item.value) ? "selected" : ""
                            return <option key={item.id} value={item.value} selected={selected}>{item.title}</option>
                         })}
                    </select>
                </div>)

}
export default Select;
