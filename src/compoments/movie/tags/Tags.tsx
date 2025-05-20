
import { TabItem, Tabs } from "flowbite-react";
import { HiClipboardList } from "react-icons/hi";
import { FaUserTie, FaIndent } from "react-icons/fa";

import { MdDashboard } from "react-icons/md";

const TagLayout = () => {
    return (
        <div className="mt-3">
            <Tabs aria-label="Tabs with icons" variant="underline">
                <TabItem active title="Tập phim" icon={FaIndent}>
                    This is <span className="font-medium text-gray-800 dark:text-white">Profile tab's associated content</span>.
                    Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                    control the content visibility and styling.
                </TabItem>
                <TabItem title="Gally" icon={MdDashboard}>
                    <div className="mx-5 px-10 cursor-pointer">

                        This is <span className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</span>.
                        Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                        control the content visibility and styling.
                    </div>
                </TabItem>
                <TabItem title="Diễn viên" icon={FaUserTie}>
                    This is <span className="font-medium text-gray-800 dark:text-white">Settings tab's associated content</span>.
                    Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                    control the content visibility and styling.
                </TabItem>
                <TabItem title="Đề xuất" icon={HiClipboardList}>
                    This is <span className="font-medium text-gray-800 dark:text-white">Contacts tab's associated content</span>.
                    Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                    control the content visibility and styling.
                </TabItem>

            </Tabs>
        </div>
    );
}

export default TagLayout;
