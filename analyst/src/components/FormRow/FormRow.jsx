import './FormRow.scss';

const FormRow = ({ type, name, value, hangleChange, labelText }) => {
    return (
        <div className="form-row">
            <label htmlFor={name} className="form-label">
                {labelText || name}
            </label>
            <input
                type={type}
                value={value}
                name={name}
                onChange={hangleChange}
                className="form-input" />
        </div>
    )
}

export default FormRow