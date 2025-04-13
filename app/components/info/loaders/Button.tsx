
interface IButton {
  isLoading: boolean;
  text: string;
  isDark: boolean;
  onClick: () => void;
  className?: string;
}

const Button = ({ isLoading, text, isDark, className }: IButton) => {
  return (
    <>
      {isLoading ? (
        <button>{text}</button>
      ) : (
        <button className={`${className}`}>{text}</button>
      )}
    </>
  );
};

export default Button;
