

export let failedQueue: {
    resolve: (value: string) => void;
    reject: (error: any) => void;
}[] = [];

export const promiseQueue=(error:unknown,token:string | null)=>{
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token as string);
        }
    });

    failedQueue = [];   
}