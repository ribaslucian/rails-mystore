$(document).ready(function() {

  /**
  * Função básica do evento de clicar fora de um element
  */
  $.fn.clickOut = function (callback, selfDestroy) {
    var clicked = false;
    var parent = this;
    var destroy = selfDestroy || true;

    parent.click(function () { clicked = true; });
    $(document).click(function (event) {
      if (!clicked)
      callback(parent, event);
      clicked = false;
    });
  };


  /**
  * Efetua uma chama ajax para acessar a acao de um
  * controller e renderizar seus dados em um modal html.
  *
  * data-url       url_relative(url_for)
  * data-function  remote:modal:call
  * data-id        record(model) id
  */
 $('body').on('click', '[data-function="remote:model:call"]', function() {
    remote_call_start(t = $(this));
    remote_modal_show = '[data-function="remote:modal:show"][data-id="' + t.attr('data-id') + '"]';

    // para nao buscar novamente, verificamos se o registro ja foi buscado uma vez
    if ($(remote_modal_show).length > 0) {
      // monstramos o loader depois que o modal aparecer na tela
      $(remote_modal_show).modal({onVisible: function(){
        remote_call_finish(t);
      }}).modal('show');
    } else {
      // buscamos o registro
      $.ajax({
        dataType: 'html',
        url: t.attr('data-url'),
        success: function(data) {
          $('body').append(data);
          $(remote_modal_show).modal('show');
        },
        error: function() { alert('Error! Tente novamente mais tarde.'); },
        complete: function() { remote_call_finish(t); }
      });
    }
  });

  $('body').on('click', '[data-function="nested_field_fast:image:add:trigger"]', function() {
    $('[data-function="nested_field_fast:image:add"]').trigger('click');
    $('[data-function="nested_field_fast:image:field"]').last().trigger('click');
  });

  $('body').on('change', '[data-function="nested_field_fast:image:field"]', function() {
    // adicinando um novo elemento HTML
    item = $('[data-function="nested_field_fast:image:item"]').first();
    clone = item.clone().removeClass('hide');
    clone.appendTo(item.parent('div'));

    // definindo a imagem selecionada como fundo do elemento
    var file = this.files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
      $('img', clone).attr('src', reader.result);
    }

    if (file)
      reader.readAsDataURL(file);
  });

});
