import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function RTKerror(error: FetchBaseQueryError | SerializedError){
    if("data" in error) return JSON.stringify(error.data)
    if ("error" in error) return error.error
    return "Unknown Error"
}