export const initialState = { ws: null, MyName : "String" }
type AppState = typeof initialState
type Action =
  | { type: 'SetSocket',ws : WebSocket }
  | { type: 'SetMyName', MyName : String }

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SetSocket':
      return { ws : action.ws}
    case 'SetMyName':
      return { MyName : action.MyName}
    default:
      throw new Error()
  }
}

export default reducer;