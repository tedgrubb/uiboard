$(function() {
  $('#capture .pages span').click(function() {
    $(this).siblings().removeClass('active');
    $(this).toggleClass('active');
    $('.image').attr('src', $(this).data('src'));
  });
  $('#capture .chrome').click(function() {
    var next = $('#capture .pages span.active').next();
    var el = next.length ? next : $('#capture .pages span:first');
    el.click();
  });
});

$(function() {
  if(typeof window.FileReader === 'undefined') return;

  var holder = $('.files');

  holder.on('dragover', function() {
    $(this).addClass('hover');
    $(this).find('.add-file').text('Ready to drop!');
    return false;
  });

  holder.on('dragend', function() {
    $(this).removeClass('hover');
    $(this).find('.add-file').text('Drop files or <strong>click here</strong>');
    return false;
  });

  holder.on('drop', function(e) {
    e.preventDefault();

    $(this).removeClass('hover');

    var files = e.originalEvent.dataTransfer.files
    for(f=0; f<files.length; f++) {
      readFile(files[f]);
    }

    return false;
  });

  readFile = function(file) {
    reader = new FileReader();

    reader.onload = function(event) {
      holder.find('.add-file').hide();
      holder.append($('<div></div>')
        .addClass('file')
        .css({'background-image': 'url('+event.target.result+')'})
      );

      $file_container = holder.children().last();

      uploadFile($file_container, file);
    };

    reader.readAsDataURL(file);
  }

  uploadFile = function($file_container, file) {
    $file_container.append($('<progress></progress>'));

    var $progress_indicator = $file_container.find('progress');

    var formData = new FormData();
        formData.append('file', file);

    var captureID = $('#capture-form').data('capture-id');

    $.ajax({
      url: '/captures/'+captureID+'/upload',
      type: 'POST',
      xhr: function() {
        var x = $.ajaxSettings.xhr();
        if(x.upload) {
          x.upload.progress_indicator = $progress_indicator;
          x.upload.addEventListener('progress', handleProgress, false);
        }
        return x;
      },
      data: formData,
      cache: false,
      contentType: false,
      processData: false
    });
  }

  function handleProgress(e) {
    console.log(e.target.progress_indicator);
    if(e.lengthComputable){
      e.target.progress_indicator.attr({
        value: e.loaded,
        max: e.total
      });
    }
  }
});
