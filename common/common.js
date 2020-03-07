// const serverUrl = "http://10.3.186.123:8080"
// const serverUrl = "http://192.168.1.7:8087/tips"
const serverUrl = "https://www.seeumt.club/tips"
// const serverUrl = "http://192.168.1.7:8082"
// const serverUrl = "http://47.105.147.103:8086"

function keyUtil(){
	 function S4() {
	        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	    }
	    return (S4() + S4() + "" + S4() + "" + S4() + "" + S4() + "" + S4() + S4() + S4());
}
export default{
	serverUrl,
	keyUtil
}
