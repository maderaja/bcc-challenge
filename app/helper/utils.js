// Function untuk mengecek variable kosong/tidak dengan mudah
const empty = (data) => {
  if (typeof data == 'number' || typeof data == 'boolean') {
    return false;
  }
  if (typeof data == 'undefined' || data === null || data == '') {
    return true;
  }
  if (typeof data.length != 'undefined') {
    return data.length == 0;
  }
  var count = 0;
  for (var i in data) {
    if (data.hasOwnProperty(i)) {
      count++;
    }
  }
  return count == 0;
};

// Function untuk menambahkan \ di setiap karakter ' ' (seperti addslashes php)
function addslashes(value) {
  let string = value.toString();
  const result = string.replace(/'/g, "\\'");
  return result;
}

// Function  (seperti htmlspecialchars php)
function escapeHtml(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };

  return text.replace(/[&<>"']/g, function (m) {
    return map[m];
  });
}

export { empty, addslashes, escapeHtml };
