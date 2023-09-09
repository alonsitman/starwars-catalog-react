import { CSSProperties, FC } from "react";
import starWarsLogo from "../../star-wars-logo.png"; // Import your static image

export const headerHeight = "60px";

const HeaderStyle: CSSProperties = {
  height: headerHeight,
  backgroundColor: "#20232a",
  color: "#ffc300",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center"
};

const ImageStyle: CSSProperties = {
  maxWidth: "100%",
  maxHeight: "100%",
};

const Header: FC = () => {
  return (
    <div className="header" style={HeaderStyle}>
      <img src={starWarsLogo} alt="Star Wars Logo" style={ImageStyle} />
    </div>
  );
};

export default Header;
