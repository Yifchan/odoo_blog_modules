odoo.define("Upload_skim_pdf", function (require) {
  "use strict";
  var AbstractField = require("web.AbstractField");
  var field_registry = require("web.field_registry");
  var core = require('web.core');

  var qweb = core.qweb;
  var Upload_skim_pdf = AbstractField.extend({
    template: "FieldBinaryFileUploader",
    template_files: "PdcDocument.files",
    supportedFieldTypes: ['many2many'],
    fieldsToFetch: {
      name: { type: 'char' },
      mimetype: { type: 'char' },
    },
    events: {
      'click .o_attach': '_onAttach',
      'click .o_attachment_delete': '_onDelete',
      'change .o_input_file': '_onFileChanged',
      'click .o_image_box': '_onFilePDF',
      'click .pdc_close' : '_onclosePDF',
    },
    /**
     * @constructor
     */
    init: function () {
      this._super.apply(this, arguments);

      if (this.field.type !== 'many2many' || this.field.relation !== 'ir.attachment') {
        var msg = _t("The type of the field '%s' must be a many2many field with a relation to 'ir.attachment' model.");
        throw _.str.sprintf(msg, this.field.string);
      }

      this.uploadedFiles = {};
      this.uploadingFiles = [];
      this.fileupload_id = _.uniqueId('oe_fileupload_temp');
      $(window).on(this.fileupload_id, this._onFileLoaded.bind(this));

      this.metadata = {};
    },
    destroy: function () {
      this._super();
      $(window).off(this.fileupload_id);
    },

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------
    _getFileId: function (attachment) {
      return attachment.id
    },
    _getId: function (attachment) {
      return attachment.attributes[1].value
    },
    _generatedMetadata: function () {
      var self = this;
      _.each(this.value.data, function (record) {
        // tagging `allowUnlink` ascertains if the attachment was user
        // uploaded or was an existing or system generated attachment
        self.metadata[record.id] = {
          allowUnlink: self.uploadedFiles[record.data.id] || false,
          FileId: self._getFileId(record.data)
        };
      });
    },
    _render: function () {
      // render the attachments ; as the attachments will changes after each
      // _setValue, we put the rendering here to ensure they will be updated
        console.log("test123");
      this._generatedMetadata();
      this.$('.oe_placeholder_files, .o_attachments')
        .replaceWith($(qweb.render(this.template_files, {
          widget: this,
        })));
      this.$('.oe_fileupload').show();

      // display image thumbnail
      this.$('.o_image[data-mimetype^="image"]').each(function () {
        var $img = $(this);
        if (/gif|jpe|jpg|png/.test($img.data('mimetype')) && $img.data('src')) {
          $img.css('background-image', "url('" + $img.data('src') + "')");
        }
      });
    },
    _onAttach: function () {
      // This widget uses a hidden form to upload files. Clicking on 'Attach'
      // will simulate a click on the related input.
      this.$('.o_input_file').click();
    },
    _onclosePDF: function () {
      console.log(this.$el.find('.zPDF_iframe').remove());
      console.log('111111');
    },
    _onDelete: function (ev) {
      ev.preventDefault();
      ev.stopPropagation();

      var fileID = $(ev.currentTarget).data('id');
      var record = _.findWhere(this.value.data, { res_id: fileID });
      if (record) {
        this._setValue({
          operation: 'FORGET',
          ids: [record.id],
        });
        var metadata = this.metadata[record.id];
        if (!metadata || metadata.allowUnlink) {
          this._rpc({
            model: 'ir.attachment',
            method: 'unlink',
            args: [record.res_id],
          });
        }
      }
    },
    _onFileChanged: function (ev) {
      var self = this;
      ev.stopPropagation();

      var files = ev.target.files;
      var attachment_ids = this.value.res_ids;

      // Don't create an attachment if the upload window is cancelled.
      if (files.length === 0)
        return;

      _.each(files, function (file) {
        var record = _.find(self.value.data, function (attachment) {
          return attachment.data.name === file.name;
        });
        if (record) {
          var metadata = self.metadata[record.id];
          if (!metadata || metadata.allowUnlink) {
            // there is a existing attachment with the same name so we
            // replace it
            attachment_ids = _.without(attachment_ids, record.res_id);
            self._rpc({
              model: 'ir.attachment',
              method: 'unlink',
              args: [record.res_id],
            });
          }
        }
        self.uploadingFiles.push(file);
      });

      this._setValue({
        operation: 'REPLACE_WITH',
        ids: attachment_ids,
      });

      this.$('form.o_form_binary_form').submit();
      this.$('.oe_fileupload').hide();
      ev.target.value = "";
    },
    _onFileLoaded: function () {
      var self = this;
      // the first argument isn't a file but the jQuery.Event
      var files = Array.prototype.slice.call(arguments, 1);
      // files has been uploaded, clear uploading
      this.uploadingFiles = [];

      var attachment_ids = this.value.res_ids;
      _.each(files, function (file) {
        if (file.error) {
          self.do_warn(_t('Uploading Error'), file.error);
        } else {
          attachment_ids.push(file.id);
          self.uploadedFiles[file.id] = true;
        }
      });

      this._setValue({
        operation: 'REPLACE_WITH',
        ids: attachment_ids,
      });
    },
    _onFilePDF: function (ev) {
      var self = this;
      var fieldId = self._getId(ev.currentTarget);
      self.$el.append(`
      <div class="zPDF_iframe">
        <div class="pdc_close btn btn-primary">关闭</div>&nbsp;&nbsp;&nbsp;
        <div class="btn btn-primary"><a href="/web/content/${fieldId}?download=true" style="text-decoration: none; color: white">下载</a></div><br>
        <iframe  class="zPDF" scrolling="no" id="main" name="main" frameborder="0"  style="min-height:600px;width:1000px;height:100%;" src="/web/content/${fieldId}"></iframe>
      </div>
      `)
    }
  });

  field_registry.add("Upload_skim_pdf", Upload_skim_pdf);
  return Upload_skim_pdf
});

