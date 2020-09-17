import { combineReducers } from 'redux'

import usersReducer from './users'
import vouchersReducer from './vouchers'

const rootReducer = combineReducers({
  users: usersReducer,
  vouchers: vouchersReducer,
})

export default rootReducer
