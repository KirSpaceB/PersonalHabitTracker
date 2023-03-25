import { InputProps } from "../utils/types";

const FormInput: React.FC<InputProps> = ({ type, name, placeholder, value, onChange, error,}) => {
  return (
    <div>
      <input type={type} id={name} name={name} value={value} placeholder={placeholder} onChange={onChange} required />
      {error && <span>{error}</span>}
    </div>
  );
};

export default FormInput;
