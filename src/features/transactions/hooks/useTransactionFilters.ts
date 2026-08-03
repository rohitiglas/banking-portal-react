import { useState } from "react";
import { useDebounce } from "../../../shared/hooks/useDebounce";


export const useTransactionFilters = () => {

    const [searchTerm,setSearchTerm] = useState("");

    const [statusFilter,setStatusFilter] =
        useState<
        "all" | "success" | "pending" | "failed"
        >("all");


    const debounceSearch = useDebounce(searchTerm,500);


    return {
        searchTerm,
        setSearchTerm,

        statusFilter,
        setStatusFilter,

        debounceSearch
    };
};