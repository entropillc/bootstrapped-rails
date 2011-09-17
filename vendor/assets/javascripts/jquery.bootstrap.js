$(function() {
  
  var $window = $(window);
  
  var alertMessages = $('div.alert-message');
  var alertMessagesTimeout = setTimeout(function() {
    alertMessages.slideUp(600);
  }, 5000);
  
  alertMessages.find('a.close').bind('click', function(evt) {
    clearTimeout(alertMessagesTimeout);
    alertMessages.slideUp(600);
  });
  
  var modalLinks = $('a.modal-target');
  
  modalLinks.live('click', function(evt) {
    var modalLink = $(this);
    var modalId = modalLink.attr('href');
    
    if (!modalId) return;

    var isAjax = (modalId.charAt(0) !== '#');
    
    modalId = (isAjax) ? modalId : modalId.substr(1);
    
    if (!modalId) return;

    var modal = $('#' + modalId);
    
    if (modal.size() === 0) return;
    
    var modalBackdrop = modal.parent('div.modal-backdrop');
    
    if (modalBackdrop.size() === 0) return;
    
    modalBackdrop.addClass('active');
    modal.addClass('active');
    
    modal.find('input[autofocus]').focus();
    
    modal.find('a.close').bind('click', function(evt) {
      var closeLink = $(this);
      var closeLinkHref = closeLink.attr('href') || '#';
      var modal = closeLink.closest('div.modal.active');
      var modalBackdrop = modal.parent('div.modal-backdrop');
      
      window.location.hash = (closeLinkHref.charAt(0) !== '#') ? '#' : closeLinkHref;
      
      modal.removeClass('active');
      modalBackdrop.removeClass('active');
      
      closeLink.unbind();
      
      evt.preventDefault();
    });
    
    if (isAjax) {
      evt.preventDefault();
    }
  });
  
  $window.bind('keyup', function(evt) {
    if (evt.keyCode === 27) {
      $('div.modal.active a.close:first').trigger('click');
    }
  });
  
  var tables = $('table');
  
  if ($.tablesorter) {
    tables.each(function(idx, table) {
      var $table = $(table);
      var $thead = $table.find('thead tr:first th');
    
      var headers = {};
    
      for (var i = 0; i < $thead.size(); i++) {
        if ($thead.eq(i).is(':empty')) {
          headers[i] = { sorter: false };
        }
      }
    
      $table.tablesorter({ headers: headers });
    });
  }
  
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
      var activeViewId = activeTabButton.attr('href');

      if (!activeViewId) activeViewId = viewstack.eq(tabs.index('.active')).attr('id');
      if (!activeViewId) return;

      activeViewId = (activeViewId.charAt(0) === '#') ? activeViewId.substr(1) : activeViewId;

      if (!activeViewId) return;

      var activeView = $('#' + activeViewId);

      if (activeView.size() === 0) return;

      activeView.addClass('active');
      
      evt.preventDefault();
    });
    
    var activeTab = tabs.filter('.active');
    
    if (activeTab.size() === 0) activeTab = tabs.eq(0);
    
    activeTab.removeClass('active').children('a').trigger('click');
  });
  
});
