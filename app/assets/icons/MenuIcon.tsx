const MenuIcon = ({
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
      <path d="M86-191v-126h788v126H86Zm0-226v-126h788v126H86Zm0-226v-126h788v126H86Z" />
    </svg>
  );
};

export default MenuIcon;
