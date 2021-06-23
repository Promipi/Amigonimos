export const Encrypt = (str) => {
  let Hex = stringToHex(str);
  let Base64 = hexToBase64(Hex);

  return Base64;
}

export const Decrypt = (str) => {
  let Hex = base64ToHex(str);
  let Base64 = hexToString(Hex);

  return Base64;
}

const stringToHex = (str) => {
  var arr = [];
  for (var i = 0; i < str.length; i++) {
    arr[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
  }
  return "\\u" + arr.join("\\u");
}

const hexToString = (hex) => {
  hex = hex.toString().replace(/\s+/gi, '')
  const stack = []

  for (var i = 0; i < hex.length; i += 2) {
    const code = parseInt(hex.substr(i, 2), 16)
    if (!isNaN(code) && code !== 0) {
      stack.push(String.fromCharCode(code))
    }
  }

  return stack.join('')
}

const hexToBase64 = (str) => {
  return btoa(String.fromCharCode.apply(null,
    str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
  );
}

const base64ToHex = (str) => {
  for (var i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
      let tmp = bin.charCodeAt(i).toString(16);
      if (tmp.length === 1) tmp = "0" + tmp;
      hex[hex.length] = tmp;
  }
  return hex.join(" ");
}