import {handleActions} from 'redux-actions'
import $ from 'jquery';
import Immutable from 'immutable'

const initialState = Immutable.Map({
  device_type: null,
  device_model: null,
  device_serial_no: null,
  device_screen_size: null,
  contact_name: null,
  contact_email: null,
  submitted: false,
  errors: null
})

let submitTicket = (state, action) => {
  $.ajax({
    type: 'POST',
    url: '/api/tickets',
    data: JSON.stringify(action.payload),
    contentType: 'application/json',
    success(response) {
      return state.set('submitted', true)
    }, error(xhr, ajaxOptions, thrownError) {
      return state.set('errors', xhr.status + ': ' + thrownError)
    }
  })
}

export default handleActions({
  'set_device_type' (state, action) {
    return state.set('device_type', action.payload)
  },
  'set_device_model' (state, action) {
    return state.set('device_model', action.payload)
  },
  'set_device_serial_number' (state, action) {
    return state.set('device_serial_no', action.payload)
  },
  'set_device_screen_size' (state, action) {
    return state.set('device_screen_size', action.payload)
  },
  'set_contact_name' (state, action) {
    return state.set('contact_name', action.payload)
  },
  'set_contact_email' (state, action) {
    return state.set('contact_email', action.payload)
  },
  'submit_ticket' (state, action) {
    return submitTicket(state, action)
  }
}, initialState)