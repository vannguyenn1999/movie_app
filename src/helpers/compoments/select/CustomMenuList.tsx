import { useEffect, useRef } from "react";
import { components } from "react-select";

const CustomMenuList = (props: any) => {
    const { children, onLoadMore } = props;
    const menuListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = (e: any) => {
            const target = e.target;
            if (target.scrollHeight - target.scrollTop === target.clientHeight) {
                // Đã scroll đến cuối
                onLoadMore && onLoadMore();
            }
        };

        const menuList = menuListRef.current;
        if (menuList) {
            menuList.addEventListener("scroll", handleScroll);
        }
        return () => {
            if (menuList) {
                menuList.removeEventListener("scroll", handleScroll);
            }
        };
    }, [onLoadMore]);

    return (
        <components.MenuList {...props} innerRef={menuListRef}>
            {children}
        </components.MenuList>
    );
};

export default CustomMenuList;