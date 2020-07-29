import * as actionTypes from '../actions/actionTypes'
import { act } from 'react-dom/test-utils'
const initialState={
      token:null,
      userId:null,
      error:false,
      loading:false,
      authRedirectPath:'/'
}
 const reducer=(state=initialState,action)=>{
     switch (action.type) {
         case actionTypes.AUTH_START:
             return{
                 ...state,
                 loading:true
             }
         case actionTypes.SET_AUTH_REDIRECT_PATH:
                return{
                    ...state,
                   authRedirectPath:action.path
                }
         case actionTypes.AUTH_SUCCESS:
                return{
                    ...state,
                        token:action.idToken,
                        userId:action.userId,
                        loading:false,
                        error:false
                }
         case actionTypes.AUTH_FAIL:
                    return{
                        ...state,
                        loading:false,
                        error:action.error
                        
                    }
        case actionTypes.AUTH_LOGOUT:
                        return{
                            ...state,
                            userId:null,
                            token:null
                            
                        }
                        
                       
             
     
         default:
             return state;

     }

 }
 export default reducer