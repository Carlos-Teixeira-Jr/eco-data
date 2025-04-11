import EyeIconOff from "@/app/assets/icons/EyeIconOff";
import EyeIconOn from "@/app/assets/icons/EyeIconOn";

interface IPasswordVisibilityToggle {
  isVisible: boolean;
}

const PasswordVisibilityToggle = ({ isVisible }: IPasswordVisibilityToggle) => {
  return isVisible ? <EyeIconOff /> : <EyeIconOn />;
};

export default PasswordVisibilityToggle;
