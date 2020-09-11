export async function callAPI(url, data = {}, method = "POST", token = {}) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token.Authorization);
  myHeaders.append("Content-Type", "application/json");
  const controller = new AbortController();
  const signal = controller.signal;
  var req = {
    method: method,
    headers: myHeaders,
    body: data,
    redirect: "follow",
    signal: signal,
  };
  try {
    const res = await fetch(url, req);
    const result = await res.json();
    // console.log(result)
    controller.abort()
    return result
  } catch (error) {
    // error = error;
    console.log("callAPI error", error);
    controller.abort();
  }
}

export function authHeader() {
  const userToken = JSON.parse(localStorage.getItem('user_token'));

  if (userToken) {
    return { Authorization: 'Bearer ' + userToken };
  } else {
    return {};
  }
}