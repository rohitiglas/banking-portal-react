import {
useMutation,
useQueryClient
}
from "@tanstack/react-query";


import {
markTransactionReviewed
}
from "../services/transactionService";

import type {
TransactionProps
}
from "../types/transaction.types";



export const useTransactionReview=()=>{


const queryClient =
useQueryClient();



const mutation =
useMutation({


mutationFn:
markTransactionReviewed,



onMutate:async(id)=>{


await queryClient.cancelQueries({
    queryKey:["transactions"]
});



const previous =
queryClient.getQueryData(
    ["transactions"]
);



queryClient.setQueriesData(
{
queryKey:["transactions"]
},

(old:any)=>{


if(!old)
return old;



return {

...old,


pages:
old.pages.map(
(page:any)=>({

...page,

data:
page.data.map(
(item:TransactionProps)=>

item.id===id
?
{
...item,
reviewed:true
}
:
item

)

})

)

};


});


return {
previous
};

},



onError:(_,__,context)=>{


if(context?.previous){

queryClient.setQueryData(
["transactions"],
context.previous
);

}


},



onSettled:()=>{


queryClient.invalidateQueries({
queryKey:["transactions"]
});


}


});



return mutation;

};