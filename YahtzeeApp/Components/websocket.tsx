function websock(): void{
    var ws = new WebSocket('ws://192.168.43.99:8080/', 'echo-protocol');
    ws.onopen = () => {
        // connection opened
        console.log('connected')
      };
      
      ws.onmessage = (e) => {
        // a message was received
        console.log(e.data);
      };
      
      ws.onerror = (e) => {
        // an error occurred
        console.log(e.message);
      };
      
      ws.onclose = (e) => {
        // connection closed
        console.log(e.code, e.reason);
      };
      return ws;
}
export default websock;