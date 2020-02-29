function reset(){
    var emailReset = document.getElementById("emailReset");
    var senhaReset = document.getElementById("senhaReset");
    var confimaSenhaReset = document.getElementById("confimaSenhaReset");
    var senhaCorreta;

    if (emailReset.value == "" || senhaReset.value == "" || confimaSenhaReset.value == ""){
        $.notify("Preencha os campos!", "warn");
    } else if (senhaReset.value != confimaSenhaReset.value){
        $.notify("Senhas diferentes!", "warn");
        senhaReset.value = "";
        confimaSenhaReset.value = "";
    } else if (confimaSenhaReset.value.length < 6) {
        $.notify("A senha precisa ter no mínimo 6 digítos!", "warn");
        senhaReset.value = "";
        confimaSenhaReset.value = "";
    } else {
        senhaCorreta = senhaReset.value;
        document.getElementById("containerReset").style.display = "none";
        document.getElementById("containerProgressReset").style.display = "block";
        
        var data = {
            email: emailReset.value,
            password: senhaCorreta
        };
    
        $.post("http://tecnova:3000/newpassword",
            data)
            .done(function(data) {
                if (data.response == "Usuário não encontrado!"){
                    setTimeout(function(){ 
                        $.notify("Usuário " + emailReset.value + " não cadastrado!", "warn");
                        document.getElementById("containerProgressReset").style.display = "none";
                        document.getElementById("containerReset").style.display = "block";
                        emailReset.value = "";
                        senhaReset.value = "";
                        confimaSenhaReset.value = "";
                    }, 2000);
                } else if (data.response == "Senha atualizada com sucesso!") {
                    setTimeout(function(){ 
                        $.notify("Senha alterada com sucesso!", "success");
                        document.getElementById("containerProgressReset").style.display = "none";
                        document.getElementById("containerReset").style.display = "none";
                        document.getElementById("containerSucesso").style.display = "block";
                        emailReset.value = "";
                        senhaReset.value = "";
                        confimaSenhaReset.value = "";
                    }, 2000);
                }
            })
            .fail(function(response) {
                setTimeout(function(){ 
                    document.getElementById("containerProgressReset").style.display = "none";
                    document.getElementById("containerReset").style.display = "block";
                    $.notify("Erro, tente novamente", "error");
                }, 2000);
        });
    }
}