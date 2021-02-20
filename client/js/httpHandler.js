(function() {

  const serverUrl = 'http://127.0.0.1:3000';

  const ajaxGETSwimmers = (serverUrl, cb) => { $.get('http://127.0.0.1:3000', function( data ) { SwimTeam.move(data); }); }
  ajaxGETSwimmers();

  const ajaxGETBackground = () => {
    $.ajax({
      type: 'GET',
      url: serverUrl + '/background.jpg',
      success: (data) => {
        $('body').addClass('background');
        window.location = window.location.href;
      }
    });
  };
   //

    // $(document).ready(() => {
    //   console.log('doc ready');
    //   ajaxGETBackground();
    // });

//////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: serverUrl,
      cache: false,
      contentType: false,
      processData: false,
      success: (data) => {
        //do something with the data
        // reload the page
        window.location = window.location.href;
      }
    });
  };


  $('form').on('submit', function(e) {
    e.preventDefault();
    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUplaod(file);
  });

})();

//TASK:
// Connect the client to the server. Using AJAX, periodically request a random swim command from the server. Confirm your swim team is moving around randomly.
