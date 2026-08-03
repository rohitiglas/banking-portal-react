import InputField from "../../../shared/components/InputField";
import Dropdown from "../../../shared/components/Dropdown";
import { statusOptions } from "../constants";

type Props = {
    searchTerm: string;
    statusFilter: string;
    setSearchTerm: (value: string) => void;
    setStatusFilter: (
        value:
            | "all"
            | "success"
            | "pending"
            | "failed"
    ) => void;
};

const TransactionFilters = ({
    searchTerm,
    statusFilter,
    setSearchTerm,
    setStatusFilter
}: Props) => {

    return (

        <div className="transaction-filter">

            <InputField
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) =>
                    setSearchTerm(e.target.value)
                }
            />

            <Dropdown
                label="Status"
                options={statusOptions}
                value={statusFilter}
                onChange={(e) =>
                    setStatusFilter(
                        e.target.value as
                            | "all"
                            | "success"
                            | "pending"
                            | "failed"
                    )
                }
            />

        </div>

    );

};

export default TransactionFilters;