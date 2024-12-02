import {
  HeaderText,
  HeaderWrapper,
} from "@/app/components/common/header.styles";
import Image from "next/image";
import LionIcon from "@/assets/icons/singapore-lion.svg";

const Header = () => {
  return (
    <HeaderWrapper>
      <Image src={LionIcon} width={24} height={24} alt="Lion Icon" />
      <HeaderText>
        <span>An Official Website of the </span>
        <strong>Singapore Government</strong>
      </HeaderText>
    </HeaderWrapper>
  );
};

export default Header;
