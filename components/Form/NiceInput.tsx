import React from 'react';
import { FormikHandlers, FormikState } from 'formik';

interface NiceInputProps {
    id: string;
    label: string;
    type: string;
    handleChange: FormikHandlers['handleChange'];
    handleBlur: FormikHandlers['handleBlur'];
    value: string;
    touched?: boolean;
    error?: string;
}

const NiceInput: React.FC<NiceInputProps> = ({
                                                 id,
                                                 label,
                                                 type,
                                                 handleChange,
                                                 handleBlur,
                                                 value,
                                                 touched,
                                                 error
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
                className={"bg-blue-50 border-2 text-black border-blue-200 focus:scale-x-[1.025] transition-all rounded-md px-2 py-1 focus:outline-none focus:border-blue-900"}
            />
            {touched && error ? (
                <small className="text-red-500 text-sm">{error}</small>
            ) : null}
        </>
    );
};

export default NiceInput;
