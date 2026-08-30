/* =================================
   BLOG DOS PAPAGAIOS
   JavaScript
================================= */


/* =================================
   TEMA CLARO / ESCURO
================================= */

const botaoTema = document.getElementById("botaoTema");

// Verifica se o usuário já escolheu um tema
const temaSalvo = localStorage.getItem("tema");

// Aplica o tema salvo
if (temaSalvo === "escuro") {
    document.body.classList.add("tema-escuro");
    botaoTema.textContent = "☀️ Tema claro";
} else {
    document.body.classList.remove("tema-escuro");
    botaoTema.textContent = "🌙 Tema escuro";
}


// Alternar tema
botaoTema.addEventListener("click", function () {

    document.body.classList.toggle("tema-escuro");

    const temaEscuro =
        document.body.classList.contains("tema-escuro");

    if (temaEscuro) {

        botaoTema.textContent = "☀️ Tema claro";

        localStorage.setItem("tema", "escuro");

    } else {

        botaoTema.textContent = "🌙 Tema escuro";

        localStorage.setItem("tema", "claro");

    }

});


/* =================================
   LIKE E DESLIKE
================================= */

const botaoLike = document.getElementById("like");
const botaoDeslike = document.getElementById("deslike");

const contadorLike = document.getElementById("contadorLike");
const contadorDeslike = document.getElementById("contadorDeslike");

const mensagemOpiniao =
    document.getElementById("mensagemOpiniao");


// Recuperar dados salvos
let likes = Number(localStorage.getItem("likes")) || 0;
let deslikes = Number(localStorage.getItem("deslikes")) || 0;

let votoUsuario =
    localStorage.getItem("votoUsuario") || null;


// Atualizar os números
contadorLike.textContent = likes;
contadorDeslike.textContent = deslikes;


/* =================================
   MOSTRAR VOTO ANTERIOR
================================= */

function atualizarVoto() {

    if (votoUsuario === "like") {

        botaoLike.classList.add("votado");

        mensagemOpiniao.textContent =
            "Você curtiu este blog! 🦜💚";

    } 
    
    else if (votoUsuario === "deslike") {

        botaoDeslike.classList.add("votado");

        mensagemOpiniao.textContent =
            "Você marcou que não gostou. Obrigado pelo feedback!";

    }

}

atualizarVoto();


/* =================================
   BOTÃO LIKE
================================= */

botaoLike.addEventListener("click", function () {

    // Se já deu like, remove o voto
    if (votoUsuario === "like") {

        likes--;

        votoUsuario = null;

        botaoLike.classList.remove("votado");

        mensagemOpiniao.textContent =
            "Seu Like foi removido.";

    }

    // Se tinha dado deslike, troca para like
    else {

        if (votoUsuario === "deslike") {
            deslikes--;

            botaoDeslike.classList.remove("votado");
        }

        likes++;

        votoUsuario = "like";

        botaoLike.classList.add("votado");

        mensagemOpiniao.textContent =
            "Obrigado pelo Like! 🦜💚";

    }


    salvarVotos();
    atualizarContadores();

});


/* =================================
   BOTÃO DESLIKE
================================= */

botaoDeslike.addEventListener("click", function () {

    // Se já deu deslike, remove o voto
    if (votoUsuario === "deslike") {

        deslikes--;

        votoUsuario = null;

        botaoDeslike.classList.remove("votado");

        mensagemOpiniao.textContent =
            "Seu Deslike foi removido.";

    }

    // Se tinha dado like, troca para deslike
    else {

        if (votoUsuario === "like") {
            likes--;

            botaoLike.classList.remove("votado");
        }

        deslikes++;

        votoUsuario = "deslike";

        botaoDeslike.classList.add("votado");

        mensagemOpiniao.textContent =
            "Obrigado pelo feedback!";

    }


    salvarVotos();
    atualizarContadores();

});


/* =================================
   ATUALIZAR CONTADORES
================================= */

function atualizarContadores() {

    contadorLike.textContent = likes;
    contadorDeslike.textContent = deslikes;

}


/* =================================
   SALVAR NO NAVEGADOR
================================= */

function salvarVotos() {

    localStorage.setItem("likes", likes);

    localStorage.setItem("deslikes", deslikes);

    localStorage.setItem("votoUsuario", votoUsuario);

}


/* =================================
   EFEITO AO CLICAR NOS BOTÕES
================================= */

const botoesAvaliacao =
    document.querySelectorAll(".botoes-avaliacao button");

botoesAvaliacao.forEach(function (botao) {

    botao.addEventListener("click", function () {

        botao.style.transform = "scale(0.92)";

        setTimeout(function () {

            botao.style.transform = "";

        }, 150);

    });

});


/* =================================
   ANIMAÇÃO DAS SEÇÕES AO ROLAR
================================= */

const secoes =
    document.querySelectorAll(".secao");

const observador =
    new IntersectionObserver(
        function (entradas) {

            entradas.forEach(function (entrada) {

                if (entrada.isIntersecting) {

                    entrada.target.style.opacity = "1";

                    entrada.target.style.transform =
                        "translateY(0)";

                    observador.unobserve(
                        entrada.target
                    );

                }

            });

        },
        {
            threshold: 0.1
        }
    );


secoes.forEach(function (secao) {

    secao.style.opacity = "0";

    secao.style.transform = "translateY(25px)";

    secao.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

    observador.observe(secao);

});


/* =================================
   MENSAGEM NO CONSOLE
================================= */

console.log(
    "🦜 Blog dos Papagaios carregado com sucesso!"
);