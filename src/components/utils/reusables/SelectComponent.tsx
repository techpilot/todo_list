import '../../../styles/SelectStyles.css';

interface SelectComponentProps {
  disabled: boolean;
  elements: string[];
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  disabled,
  elements,
}) => {
  return (
    <div className="main-container">
      <div className="select-wrapper">
        <select className="select" disabled={disabled}>
          {elements?.map((element, index) => (
            <option key={index}>
              <p>{element}</p>
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectComponent;
