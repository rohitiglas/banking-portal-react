import {useMemo} from "react";
import {useNavigate} from "react-router-dom";


import {useTransactions} from "./useTransactions";


import {useTransactionFilters} from "./useTransactionFilters";


import {useTransactionReview}
from "./useTransactionReview";


import {useInfiniteScroll}
from "./useInfiniteScroll";



export const useTransaction=()=>{


const navigate =
useNavigate();



const {
searchTerm,
setSearchTerm,
statusFilter,
setStatusFilter,
debounceSearch

}
=
useTransactionFilters();



const {

data,
isLoading,
error,
refetch,

fetchNextPage,
hasNextPage,
isFetchingNextPage,

prefetchTransaction

}

=
useTransactions(
debounceSearch,
statusFilter
);



useInfiniteScroll({

fetchNextPage,
hasNextPage:
!!hasNextPage,
isFetchingNextPage

});



const reviewMutation =
useTransactionReview();



const transactions =
useMemo(()=>{


return data?.pages.flatMap(
page=>page.data
)
?? [];


},[data]);



const filteredTransactions =
useMemo(()=>{


return transactions.filter(item=>{


const statusMatch =
statusFilter==="all"
||
item.status===statusFilter;



return (
statusMatch &&
item.description
.toLowerCase()
.includes(
debounceSearch.toLowerCase()
)
);


});


},[
transactions,
statusFilter,
debounceSearch
]);




const handleReviewClick=
(row:any)=>{

reviewMutation.mutate(
row.id
);

};



return {


data,

isLoading,

error,

refetch,


transactions:
filteredTransactions,


searchTerm,
setSearchTerm,


statusFilter,
setStatusFilter,


navigate,


prefetchTransaction,


handleReviewClick,


hasNextPage,


isFetchingNextPage


};


};