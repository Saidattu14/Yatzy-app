export const initialState = { ws: WebSocket }
type AppState = typeof initialState
type Action =
  | { type: 'SetSocket',ws : WebSocket }

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SetSocket':
      return { ws : action.ws }
    default:
      throw new Error()
  }
}

export default reducer;