const PlusIcon = ({
  width = "24",
  height = "24",
  fill = "#b6d73d",
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 -960 960 960"
      className={className}
      width={width}
      fill={fill}
    >
      <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
    </svg>
  );
};

export default PlusIcon;