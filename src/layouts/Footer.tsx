import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import { BsFacebook, BsYoutube, BsInstagram, BsTwitter } from "react-icons/bs";

const FooterLayout = () => {
 return (
    <Footer container className="rounded-none">
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <FooterBrand
              href="https://flowbite.com"
              src="https://flowbite.com/docs/images/logo.svg"
              alt="Flowbite Logo"
              name="Flowbite"
            />
          </div>
          <div className="grid grid-cols-2 gap-6 sm:mt-4">
            <div>
              <FooterTitle title="Thông tin về chúng tôi" />
              <FooterLinkGroup col>
                <FooterLink href="#">Giới thiệu</FooterLink>
                <FooterLink href="#">Liên hệ</FooterLink>
                <FooterLink href="#">Hỏi - đáp</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Chính Sách" />
              <FooterLinkGroup col>
                <FooterLink href="#">Chính sách bảo mật</FooterLink>
                <FooterLink href="#">Điều khoản sử dụng</FooterLink>
                <FooterLink href="#">Thông tin thêm</FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FooterCopyright href="#" by="Web Phim" year={new Date().getFullYear()} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FooterIcon href="#" icon={BsFacebook} />
            <FooterIcon href="#" icon={BsInstagram} />
            <FooterIcon href="#" icon={BsTwitter} />
            <FooterIcon href="#" icon={BsYoutube} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterLayout;
