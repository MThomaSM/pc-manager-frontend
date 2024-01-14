import React from 'react';
import { FormikHandlers, FormikState } from 'formik';

interface SimpleInputProps {
    id: string;
    label: string;
    type: string;
    handleChange: FormikHandlers['handleChange'];
    handleBlur: FormikHandlers['handleBlur'];
    value: string;
    touched?: boolean;
    error?: string;
    readOnly: boolean;
}

const SimpleInput: React.FC<SimpleInputProps> = ({
                                                     id,
                                                     label,
                                                     type,
                                                     handleChange,
                                                     handleBlur,
                                                     value,
                                                     touched,
                                                     error,
                                                     readOnly
                                                 }) => {
    return (
        <>
            <label htmlFor={id} className="font-semibold">{label}</label>
            <input
                type={type}
                id={id}
                name={id}
                onChange={handleChange}
                onBlur={handleBlur}
                value={value}
                readOnly={readOnly}
                className={"border-2 border-blue-200 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"}
            />
            {touched && error ? (
                <small className="text-red-500 text-sm">{error}</small>
            ) : null}
        </>
    );
};

export default SimpleInput;
