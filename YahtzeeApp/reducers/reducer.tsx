

export const initialState = { ws: null, firebasetoken : null }

type AppState = typeof initialState
type Action =
  | { type: 'SetSocket',ws : WebSocket }
  | { type: 'SetFirebasetoken', firebasetoken : String }

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SetSocket':
      return { 
        ...state,
        ws : action.ws}
    case 'SetFirebasetoken':
      return {
        ...state,
        firebasetoken : action.firebasetoken}
    default:
      throw new Error()
  }
}

export default reducer;