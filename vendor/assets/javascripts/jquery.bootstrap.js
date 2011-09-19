$(function() {
  
  // Local jQuery objects.
  var $window = $(window);
  
  // Local variables.
  var hash = window.location.hash;
  
  // Local functions.
  var closeActiveModal = function(newLocationHash) {
    var modal = $('div.modal.active');
    var modalBackdrop = modal.parent('div.modal-backdrop');
    
    newLocationHash = newLocationHash || '#';
    
    window.location.hash = (newLocationHash.charAt(0) !== '#') ? '#' : newLocationHash;
    
    modal.removeClass('active');
    modalBackdrop.removeClass('active');
  };
  
  var startAlertMessageTimeout = function() {
    var alertMessages = $('div.alert-message');
    var alertMessagesTimeout = setTimeout(function() {
      alertMessages.slideUp(600);
    }, 5000);
  
    alertMessages.find('a.close').bind('click', function(evt) {
      clearTimeout(alertMessagesTimeout);
      alertMessages.slideUp(600);
    });
  };
  
  // Setup alert messages.
  startAlertMessageTimeout();
  
  // Setup AJAX forms.
  var ajaxForms = $('form.ajax');
  
  ajaxForms.live('submit', function(evt) {
    var ajaxForm = $(this);
    var modalBackdrop = $('<div class="modal-backdrop"/>');
    var spinnerContainer = $('<div class="spinner"/>');
    var spinnerLabel = $('<p>Loading</p>');
    var spinner = new Spinner({
      lines: 12,      // The number of lines to draw
      length: 7,      // The length of each line
      width: 4,       // The line thickness
      radius: 10,     // The radius of the inner circle
      color: '#d0d0d0',  // #rgb or #rrggbb
      speed: 1,       // Rounds per second
      trail: 60,      // Afterglow percentage
      shadow: false   // Whether to render a shadow
    });
    
    ajaxForm.append(modalBackdrop);
    modalBackdrop.append(spinnerContainer);
    spinnerContainer.append(spinnerLabel);
    
    spinner.spin(spinnerContainer.get(0));
    
    modalBackdrop.addClass('active');
    
    var ajaxURL = ajaxForm.attr('action');
    var ajaxMethod = ajaxForm.attr('method');
    var ajaxHandler = ajaxForm.attr('data-ajax-handler');
    
    $.ajax(ajaxURL, {
      type: ajaxMethod,
      data: ajaxForm.serialize(),
      success: function(data, textStatus, jqXHR) {
        if (ajaxHandler && typeof ajaxHandler === 'string' && typeof window[ajaxHandler] === 'function') {
          window[ajaxHandler](data);
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        var errorAlertHTML = '<div class="alert-message error">' +
          '<a class="close" href="#">×</a>' +
          '<p>An error occurred submitting the form</p>' +
        '</div>';
        
        $(document.body).append(errorAlertHTML);
        
        startAlertMessageTimeout();
      },
      complete: function(jqXHR, textStatus) {
        modalBackdrop.removeClass('active');
        closeActiveModal();
      }
    });
    
    evt.preventDefault();
  });
  
  // Setup modal links.
  var modalLinks = $('a.modal-target');
  
  modalLinks.live('click', function(evt) {
    var modalLink = $(this);
    var modalID = modalLink.attr('href');
    
    if (!modalID) return;

    var isAjax = (modalID.charAt(0) !== '#');
    
    modalID = (isAjax) ? modalID : modalID.substr(1);
    
    if (!modalID) return;

    var modal = $('#' + modalID);
    
    if (modal.size() === 0) return;
    
    var modalBackdrop = modal.parent('div.modal-backdrop');
    
    if (modalBackdrop.size() === 0) return;
    
    modalBackdrop.addClass('active');
    modal.addClass('active');
    
    modal.find('input[autofocus]:first').focus();
    
    modal.find('a.close').bind('click', function(evt) {
      var closeLink = $(this);
      var newLocationHash = (closeLink.hasClass('modal-target')) ? closeLink.attr('href') || '#' : '#';
      
      closeActiveModal(newLocationHash);
      
      closeLink.unbind();
      
      $('input[autofocus]:first').focus();
      
      evt.preventDefault();
    });
    
    if (isAjax) {
      evt.preventDefault();
    }
  });
  
  // Setup sortable tables.
  var tables = $('table');
  
  if ($.tablesorter) {
    tables.each(function(idx, table) {
      var $table = $(table);
      var $thead = $table.find('thead tr:first th');
    
      var headers = {};
    
      for (var i = 0; i < $thead.size(); i++) {
        if ($thead.eq(i).is(':empty') || $thead.eq(i).hasClass('no-sort')) {
          headers[i] = { sorter: false };
        }
      }
    
      $table.tablesorter({ headers: headers });
    });
  }
  
  // Setup tabs and pills.
  var tabsets = $('ul.tabs, ul.pills');
  
  tabsets.each(function(index, element) {
    var tabset = $(element);
    var tabs = tabset.children('li');
    
    if (tabs.size() === 0) return;
    
    var tabLinks = tabs.children('a');
    
    if (tabLinks.size() === 0) return;
    
    var viewstack = tabset.next('ul.viewstack');
    var views = viewstack.children('li.view');
    
    if (viewstack.size() === 0 || views.size() === 0) return;
    
    views.removeClass('active');
    
    tabLinks.bind('click', function(evt) {
      var activeTabLink = $(this);
      var activeTab = activeTabLink.parent();
      
      if (activeTab.hasClass('active')) return;
      
      tabs.removeClass('active');
      activeTab.addClass('active');
      views.removeClass('active');
      
      var activeTabButton = activeTab.children('a');
      var activeViewID = activeTabButton.attr('href');

      if (!activeViewID) activeViewID = viewstack.eq(tabs.index('.active')).attr('id');
      if (!activeViewID) return;

      activeViewID = (activeViewID.charAt(0) === '#') ? activeViewID.substr(1) : activeViewID;

      if (!activeViewID) return;

      var activeView = $('#' + activeViewID);

      if (activeView.size() === 0) return;

      activeView.addClass('active');
      
      evt.preventDefault();
    });
    
    var activeTab = tabs.filter('.active');
    
    if (activeTab.size() === 0) activeTab = tabs.eq(0);
    
    activeTab.removeClass('active').children('a').trigger('click');
  });
  
  // Global keyboard event handler.
  $window.bind('keyup', function(evt) {
    if (evt.keyCode === 27) {
      $('div.modal.active a.close:first').trigger('click');
    }
  });
  
  // Restore the state of the location hash.
  if (hash && hash.length > 0) {
    $('a[href="' + hash + '"]').trigger('click');
  }
  
});
