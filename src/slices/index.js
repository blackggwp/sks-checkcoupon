import { combineReducers } from 'redux'

import usersReducer from './users'
import vouchersReducer from './vouchers'

const rootReducer = combineReducers({
  user: usersReducer,
  voucher: vouchersReducer,
})

export default rootReducer
