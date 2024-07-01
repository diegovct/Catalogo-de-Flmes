// ===================================
// ||                               ||
// ||         CHAMA FUNÇÕES         ||
// ||                               ||
// ===================================

// window.onload = cardsCatalogo();


// ===================================
// ||                               ||
// || CONFIGURAÇÃO PÁGINA CATÁLOGO  ||
// ||                               ||
// ===================================


async function cardsCatalogo() {

  const response = await fetch('http://localhost:3000/filmes');
  if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
  }

infoFilmes = await response.json();
console.log("informacoesFilmes: ", infoFilmes)

for (let i = 0; i < 3; i++) {
  console.log('Número: ', i)
  document.getElementById('filmes').innerHTML += 
  `
  <div class="card" style="width: 18rem;">
  <img height="200px" src="${infoFilmes[i].image}" class="card-img-top" alt="...">
  <div class="card-body">
      <p class="card-text">${infoFilmes[i].synopsis}</p>
  </div>
  </div>
  `
}

}



// ===========================================//
// ||                                         ||
// ||   CONFIGURAÇÃO PÁGINA LOGIN E REGISTER  ||
// ||                                         ||
// ===========================================//


// Registro de usuário

$(document).ready(function () {
    // Registro de usuário
    $('#registerForm').on('submit', function (event) {
        event.preventDefault();
  
        const email = $('#registerEmail').val();
        const password = $('#registerPassword').val();
        const confirmPassword = $('#confirmPassword').val();
  
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  
        if (!passwordRegex.test(password)) {
            alert('A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas e um número.');
            return;
        }
  
        if (password !== confirmPassword) {
            alert('As senhas não coincidem. Por favor, digite novamente.');
            return;
        }
  
        const newUser = {
            email: email,
            password: password
        };
  
        $.ajax({
            url: 'http://localhost:3000/users',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newUser),
            success: function (response) {
                alert('Usuário registrado com sucesso!');
                $('#registerForm')[0].reset();
            },
            error: function (xhr, status, error) {
                console.error('Erro ao registrar usuário:', error);
                alert('Erro ao registrar usuário. Por favor, tente novamente.');
            }
        });
    });
  });
  $(document).ready(function () {
    $('#loginForm').on('submit', function (event) {
        event.preventDefault();

        const email = $('#loginEmail').val();
        const password = $('#loginPassword').val();

        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(users => {
                const user = users.find(user => user.email === email && user.password === password);
                if (user) {
                    alert('Login bem-sucedido!');
                    window.location.href = 'perfis.html'; 
                } else {
                    alert('Email ou senha incorretos!');
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Ocorreu um erro ao tentar fazer login.');
            });
    });
});


  $(document).ready(function () {

    const perfis = [
        {
            nome: 'Luffy',
            imagem: 'assets/img/foto_luffy.jpg',
            idade: 19
        },
        {
            nome: 'Nani',
            imagem: 'assets/img/nani.jpg',
            idade: 23
        },
        {
            nome: 'Usopp',
            imagem: 'assets/img/usoop.jpg',
            idade: 20
        },
        {
            nome: 'Sanji',
            imagem: 'assets/img/sanji.jfif',
            idade: 21
        },
        {
            nome: 'Zoro',
            imagem: 'assets/img/zoro.jpg',
            idade: 22
        }
    ];


    localStorage.setItem('perfis', JSON.stringify(perfis));

    
    const $perfisList = $('#perfisList');


    function carregarPerfis() {
      
        const perfisSalvos = JSON.parse(localStorage.getItem('perfis'));

        if (perfisSalvos && perfisSalvos.length > 0) {
            perfisSalvos.forEach(function (perfil) {
                const perfilListItem = `
                    <div class="col-6 col-sm-4 col-md-3 col-lg-2">
                        <div class="card">
                            <img src="${perfil.imagem}" class="card-img-top" alt="${perfil.nome}">
                            <div class="card-body">
                                <a href="#" class="card-title">${perfil.nome}</a>
                            </div>
                        </div>
                    </div>
                `;
                const $perfilElement = $(perfilListItem);
                
                
                $perfilElement.find('.card-body a').click(function (event) {
                    event.preventDefault(); 
                    mostrarPerfil(perfil);
                });

              
                $perfilElement.find('.card-img-top').click(function (event) {
                    event.preventDefault(); 
                    mostrarPerfil(perfil);
                });

                $perfisList.append($perfilElement);
            });
        } else {
            console.error('Erro: Dados de perfis não foram encontrados no localStorage.');
        }
    }

  
    function mostrarPerfil(perfil) {
        console.log(perfil);
     

        
        window.location.href = 'catalogo.html';
    }

    
    carregarPerfis();
});





// ===========================================//
// ||                                         ||
// ||       PAGINA PRINCIPAL ||
// ||                                         ||
// ===========================================//

document.addEventListener("DOMContentLoaded", function() {
    // Seleciona os botões de "ASSISTIR AGORA" e "MAIS INFORMAÇÕES"
    const assistirAgoraBtn = document.querySelector(".btn:nth-child(3)"); // Ajustado para evitar conflitos com outros botões
    const maisInformacoesBtn = document.querySelector(".btn:nth-child(4)"); // Ajustado para evitar conflitos com outros botões
  
    // Adiciona evento de clique ao botão "ASSISTIR AGORA"
    assistirAgoraBtn.addEventListener("click", function() {
      alert("Você clicou em ASSISTIR AGORA!");
      // Aqui você pode adicionar a lógica para redirecionar para a página de reprodução do filme
      window.location.href = "play.html"; // Exemplo de redirecionamento
    });
  
    // Adiciona evento de clique ao botão "MAIS INFORMAÇÕES"
    maisInformacoesBtn.addEventListener("click", function() {
      alert("Você clicou em MAIS INFORMAÇÕES!");
      
      window.location.href = "info.html"; 
    });
  
    // Adiciona evento de clique às miniaturas dos filmes
    const movieThumbnails = document.querySelectorAll(".movie");
    movieThumbnails.forEach(movie => {
      movie.addEventListener("click", function() {
        const movieTitle = this.querySelector("h3").textContent;
        const moviePage = `filme_${movieTitle.toLowerCase().replace(/\s+/g, "_")}.html`;
        window.location.href = moviePage;
      });
    });
  });