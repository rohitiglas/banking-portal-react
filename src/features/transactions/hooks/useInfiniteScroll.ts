import { useEffect } from "react";


type Props = {
    fetchNextPage:()=>void;
    hasNextPage:boolean;
    isFetchingNextPage:boolean;
}



export const useInfiniteScroll = ({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
}:Props)=>{


useEffect(()=>{

    const element =
    document.getElementById(
        "load-more-trigger"
    );


    if(!element)
        return;


    const observer =
    new IntersectionObserver(
        entries=>{

            if(
                entries[0].isIntersecting &&
                hasNextPage &&
                !isFetchingNextPage
            ){
                fetchNextPage();
            }

        },
        {
            threshold:1
        }
    );


    observer.observe(element);


    return ()=>observer.disconnect();


},[
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
]);

}