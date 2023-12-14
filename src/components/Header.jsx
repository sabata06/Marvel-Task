import Container from "react-bootstrap/Container"; //! bu yöntem performanslı olan yöntem
import {Image} from "react-bootstrap"; //! bu yöntem diğer yönteme göre daha az tavsiye edilen
import logo from "./../assets/Marvel_Logo.svg"

const Header = () => {
  return (
    <Container>
      <Image src={logo} width="300px"  />
      <h1 className="my-2 text-white">CHARACTERS</h1>
    </Container>
  );
};

export default Header;
