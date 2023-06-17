import { InputProps } from "../utils/types";
import styles from '../styles/FormInput.module.css';
const FormInput: React.FC<InputProps> = ({ type, name, placeholder, value, onChange, error,}) => {
  return (
    <div className={styles.form_input_container}>
      <input
      className={styles.FormInput_input}
      type={type}
      id={name}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required
      />
      {error && <span>{error}</span>}
    </div>
  );
};

export default FormInput;