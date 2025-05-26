import { useState, useCallback, useEffect } from "react";
import Select from "react-select";

import { useDebounce } from "@/helpers/hook";
import CustomMenuList from "./CustomMenuList";
import type { ActorItem } from "@/helpers/models";


type OptionType = { label: string; value: string };

const SelectCompoment = () => {
    const [options, setOptions] = useState<OptionType[]>([]);
    const [page, setPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const [inputValue, setInputValue] = useState(""); // Lưu giá trị input
    const debouncedSearchTerm = useDebounce(inputValue, 200);

    const fetchOptions = async (pageNumber: number) => {
        const res = await getData(`/?page=${pageNumber}&search=${debouncedSearchTerm}`);
        const newData = await res.json();
        const dataLabel = newData.results.map((item : ActorItem) => ({
            label: item.slug,
            value: item.name
        }));
        setOptions((prev) => pageNumber === 1 ? dataLabel : [...prev, ...dataLabel]);
    };

    useEffect(() => {
        fetchOptions(1);
        setPage(1);
    }, [debouncedSearchTerm]);

    const handleInputChange = (value: string) => {
        setInputValue(value);
    };

    const handleLoadMore = useCallback(() => {
        if (isLoadingMore) return;
        setIsLoadingMore(true);
        const nextPage = page + 1;
        fetchOptions(nextPage).then(() => {
            setPage(nextPage);
            setIsLoadingMore(false);
        });
    }, [page, debouncedSearchTerm, isLoadingMore]);

    return (
        <Select
            options={options}
            onInputChange={handleInputChange}
            components={{ MenuList: (props) => <CustomMenuList {...props} onLoadMore={handleLoadMore} /> }}
        />
    );
};

export default SelectCompoment;