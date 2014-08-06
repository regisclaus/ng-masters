function vaibuscarasissues(){
    function GithubRepo(_username, _reponame){
       	var username = _username;
        var reponame = _reponame;

        function popula_tabela(issues, tableId) {

          if(issues.length > 0) { 
            $(tableId + " tr").not(':first').remove();
            var html = ""
            jQuery.each(issues, function(index, value) {
                  html += "<tr><td>" + value.number + "</td><td>" + value.title + "</td> </tr>";
            });
            $(tableId + " tr").first().after(html);
          }
          else {
            mostra_nenhuma_issue(tableId);
          }
        }

        function mostra_nenhuma_issue(tableId) {
            $(tableId + " tr").not(':first').remove();

            var htmlNenhumRegistro =
                "<tr>Nenhum Registro</tr>" ;

            $(tableId + " tr").first().after(htmlNenhumRegistro);
        }

        return {
     	    busca_issues_e_popula_tabela : function(tableId) {
              jQuery.ajax(
                  {
                    url: "https://api.github.com/repos/" + username + "/" + reponame + "/issues",
                    dataType: 'json',
                    success: function (issues) {
                        popula_tabela(issues, tableId);
                    },
                    statusCode: {
                      404: function() {
                        mostra_nenhuma_issue(tableId);
                      }
                    },                   
                  }
              );
     	    }
       };

    }

    var username = jQuery("#user")[0].value
    var reponame = jQuery("#reponame")[0].value;

    var le_repo = GithubRepo(username, reponame);
    le_repo.busca_issues_e_popula_tabela("#issuestable");
}