document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.getElementById('submit');
    const resultMessage = document.getElementById('result');
    const spinner = document.querySelector('.spinner'); // Spinner'ı seçin
    let isLoading = false;
  
    submitButton.addEventListener('click', function () {
      if (isLoading) {
        return; // Zaten bir istek gönderiliyor.
      }
  
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const piece = document.getElementById('piece').value || '2';
      const bio = document.getElementById('bio').checked;
      const profilePhoto = document.getElementById('profilePhoto').checked;
      const story = document.getElementById('story').checked;
  
      const url = `https://igapi.codermert1.repl.co/post?action=addpost&username=${username}&password=${password}&piece=${piece}&bio=${bio}&profilephoto=${profilePhoto}&story=${story}`;
  
      resultMessage.textContent = ''; // Her istekte sonuç mesajını temizle
  
      isLoading = true; // Yükleme işlemi başladı.
  
      // API isteğini gönder
      fetch(url)
        .then(response => response.text())
        .then(data => {
          if (data === 'successful') {
            resultMessage.textContent = 'İşlem başarılı.';
            spinner.style.display = 'block'; // Spinner'ı görünür yap
          } else {
            resultMessage.textContent = 'İşlem başarısız. Kullanıcı adı veya şifre hatalı.';
            spinner.style.display = 'none'; // Spinner'ı gizle
          }
        })
        .catch(error => {
          resultMessage.textContent = 'Hata: ' + error.message;
          spinner.style.display = 'none'; // Spinner'ı gizle
        })
        .finally(() => {
          isLoading = false;
        });
    });
  });
  