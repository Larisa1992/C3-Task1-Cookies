const linkDel = document.getElementsByTagName('a')[0]; //ссылка на Удаление
const field = document.getElementById('city');          //поле ввода
const btnSave = document.getElementById('btn-save');          //кнопка Сохранить

// возвращает куки с указанным name,
// или undefined, если ничего не найдено
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

function setCookie(name, value, options = {}) {

    options = {
      path: '/',
       ...options
    };

    if (options.expires) {
      options.expires = options.expires.toUTCString();
    }
  
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
    for (let optionKey in options) {
      updatedCookie += ";" + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }

    document.cookie = updatedCookie;
}

//   удаление
function deleteCookie(name) {
    setCookie(name, "", {
        'max-age': -1
    })
    showData();
}

function showData() {
  linkDel.style.display = (getCookie('city') === undefined) ? 'none' : 'inline';
  field.style.display = (getCookie('city') !== undefined) ? 'none' : 'inline';
  btnSave.style.display = (getCookie('city') !== undefined) ? 'none' : 'inline';

    // если есть кука с городом, то выводим текст по заданию
  if (getCookie('city') !== undefined) {
    document.getElementById('user-city').innerText  = 'Ваш город - ' + getCookie('city');
  } else {
    document.getElementById('user-city').innerText  = '';
    field.value='';
  }

}

btnSave.addEventListener('click', function (event) { 
    console.log('city onclick', field.value)
    setCookie('city', field.value, {'max-age': 3600});
    showData();
    }
 )

showData();
