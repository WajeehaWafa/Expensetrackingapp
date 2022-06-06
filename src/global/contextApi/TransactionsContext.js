import { createContext, useReducer } from "react";
import TransReducer from "../reducer/TransactionsReducer";

const Trans = [
    {name:"Cash",amount:789}
]

export const TransactionsContext = createContext(Trans)

function ContextProvider({children}) {
    const [state, dispatch] = useReducer(TransReducer,[] )

    function AddUsers({name,amount, amountType}) {
        dispatch({
            type:"ADD_TRANSACTIONS",
            payload:{
                name,
                amount,
                amountType
            }
        })
    }
    return(
        <TransactionsContext.Provider value={{
            Transactions : state,
            AddUsers
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}

export default ContextProvider;