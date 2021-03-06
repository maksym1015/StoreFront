// eslint disable
import { BASE_PATH } from '@/utils/constant';

if (!window.RedactorPlugins) window.RedactorPlugins = {};

(function ($) {
  window.RedactorPlugins.imageupload = function () {
    return {
      getTemplate: function () {
        return (
          String() +
          '<section>' +
          '<div id="redactor-progress" class="redactor-progress redactor-progress-striped" style="display: none;">' +
          '<div id="redactor-progress-bar" class="redactor-progress-bar" style="width: 100%;"></div>' +
          '</div>' +
          '<div id="redactor_tab3" class="redactor_tab">' +
          '<label>' +
          this.opts.curLang.image_web_link +
          '</label>' +
          '<input type="text" name="redactor_file_link" id="redactor_file_link" style="box-sizing: border-box;" />' +
          '<button style="margin-top: 10px;" id="elfinder_control">' +
          'browse' +
          '</button>' +
          '</div>' +
          '</section>'
        );
      },
      init: function () {
        var button = this.button.addAfter('indent', 'image', this.lang.get('image'));
        this.button.addCallback(button, this.imageupload.load);
      },
      load: function () {
        this.modal.addTemplate('imageupload', this.imageupload.getTemplate());

        this.modal.addCallback('imageupload', function () {
          $('#redactor_file_link').focus();
          $('#elfinder_control').click(function () {
            $('<div id="elfinder_browser"/>')
              .elfinder({
                url: `${BASE_PATH}?dispatch=elf_connector.images`,
                lang: 'en',
                resizable: false,
                getFileCallback: function (file) {
                  $('#elfinder_browser').dialog('close');
                  $('#redactor_file_link').val(file.url + '?' + new Date().getTime());
                },
              })
              .dialog({
                width: 900,
                modal: true,
                title: 'File browser',
                close: function () {
                  $('#elfinder_browser').dialog('destroy').elfinder('destroy').remove();
                },
              })
              .closest('.ui-dialog')
              .css('z-index', 50001);
          });
        });

        this.modal.load('imageupload', this.lang.get('image'), 610);
        this.modal.createCancelButton();

        var button = this.modal.createActionButton(this.lang.get('insert'));
        button.on('click', this.imageupload.insert);

        this.selection.save();
        this.modal.show();
      },
      insert: function () {
        var val = $('#redactor_file_link').val();

        if (val !== '') {
          this.image.insert('<img src="' + val + '" />');
        } else {
          this.modal.show();
        }
      },
    };
  };
})(window.jQuery);
