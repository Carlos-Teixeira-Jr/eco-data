const CloseIcon = ({
  width = "24",
  height = "24",
  fill = "#02250D",
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      className={className}
      viewBox="0 -960 960 960"
      width={width}
      fill={fill}
    >
      <path d="m254-159-94-95 225-226-225-226 94-96 226 226 226-226 94 96-225 226 225 226-94 95-226-226-226 226Z"/>
    </svg>
  );
};

export default CloseIcon;