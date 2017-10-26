'use strict';

//Turn this off to disable debug console logs.
let debug = true;

// REVIEW: Configure an object to hold all of our functions for dynamic updates and article-related event handlers.
let articleView = {};

articleView.populateFilters = function() {
  $('article').each(function() {
    // REVIEW: We can declare several variables at once and assign their values later when using let. Keep in mind that we cannot do this with const.
    let authorName, category, optionTag;
    if (!$(this).hasClass('template')) {
      // REVIEW: We need to take every author name from the page, and make it an option in the Author filter.
      // To do so, Build an <option> DOM element that we can append to the author <select> element.
      // Start by grabbing the author's name from `this` article element, and then use that bit of text to create the option tag (in a variable named `optionTag`) that we can append to the #author-filter select element.
      authorName = $(this).attr('data-author');

      // TODONE: Refactor this concatenation using a template literal.
      optionTag = `<option value="${authorName}">${authorName}</option>`

      if ($('#author-filter option[value="' + authorName + '"]').length === 0) {
        $('#author-filter').append(optionTag);
      }

      // REVIEW: Similar to the above, but...
      // Avoid duplicates! We don't want to append the category name if the <select> already has this category as an option!
      category = $(this).attr('data-category');

      // TODONE: Refactor this concatenation using a template literal.
      optionTag = '<option value="' + category + '">' + category + '</option>';
      optionTag = `<option value="${category}">${category}</option>`

      if ($('#category-filter option[value="' + category + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    // REVIEW: Inside this function, "this" is the element that triggered the event handler function we are defining. "$(this)" is using jQuery to select that element (analogous to event.target that we have seen before), so we can chain jQuery methods onto it.
    if (this.value) {
      if(debug) console.log(this.value);
      $('article').hide();
      $(`article[data-author="${this.value}"]`).show();
    } else {
      $('article').show();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if (this.value) {
      $('article').hide();
      $(`article[data-category="${this.value}"]`).show();
    } else {
      $('article').show();
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = function() {

  $('.main-nav li').on('click', function() {
    let $active = $(this).data('content');
    $('.tab-content').hide();
    $(`#${$active}`).fadeIn(750);
  })

  // REVIEW: Now trigger a click on the first .tab element, to set up the page.
  $('.main-nav .tab:first').click();
};

articleView.setTeasers = function() {
  // REVIEW: Hide elements beyond the first 2 in any article body.
  // console.log('Oh jeez the teasers are being set!');
  $('.article-body *:nth-of-type(n+2)').hide();
  // console.log('Stuff past the first two elements are hidden maybe?');
  $('article').on('click', 'a.read-on', function (e) {
    // console.log('Ooohhh you did it now!');
    e.preventDefault();
    // console.log('The Default just got prevented!');
    if($(this).text() === 'Read on...') {
      // console.log(`The text in "this" is "${$(this).text()}" which matches "Read on..."`);
      $(this).parent().find('*').fadeIn();
      // console.log('FADE BREH');
      $(this).html('Show Less')
      // console.log('What was once "Read On" is now "Show Less"');
    } else {
      // console.log(`"this" is "${$(this).text()}" !== "Read on..."`);
      $('body').animate({
        scrollTop: ($(this).parent().offset().top)
      }, 200);
      // console.log('Oh god we survived...');
      $(this).html('Read on...;');
      // console.log('"Show Less" is now "Read More"');
      $(this).parent().find('.article-body *:nth-of-type(n+2)').hide();
      // console.log('Everything more than two below just got hid.');
    }
  });

  // TODONE: Add an event handler to reveal all the hidden elements, when the .read-on link is clicked. You can go ahead and hide the "Read On" link once it has been clicked. Be sure to prevent the default link-click action!
  // Ideally, we'd attach this as just one event handler on the #articles section, and let it process (in other words... delegate) any .read-on clicks that happen within child nodes.
};

// TODONE: Call all of the above functions, once we are sure the DOM is ready.
$(document).ready(function() {
  articleView.populateFilters();
  articleView.handleAuthorFilter();
  articleView.handleCategoryFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
})
