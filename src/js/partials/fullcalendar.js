document.addEventListener('DOMContentLoaded', function() {
  const calendarTournamentEl = document.getElementById('calendarTournament');
  let calendar;

  const createCalendar = function (node, options) {
    return new FullCalendar.Calendar(node,  {
      plugins: [ 'dayGrid' ],
      header: {
        left: '',
        center: 'title',
        right: ''
      },
      ...options
    });
  };

  // render tournament calendar on page load
  calendar = createCalendar(calendarTournamentEl).render();

  const destroyCalendar = () => {
    calendar && calendar.destroy();
  };

  const showLoader = () => {
    $('.lds-dual-ring').each((i, el) => {
      $(el).show();
    });
  };

  const hideLoader = () => {
    $('.lds-dual-ring').each((i, el) => {
      $(el).hide();
    });
  };

  const clearContainer = (container) => {
    $(container).empty();
  };

  const renderCalendar = (calendar) => {
    return setTimeout(() => {
      hideLoader();
      calendar.render();
    }, 200)
  };

  const getEmptyContainer = (e) => {
    const target = $(e.target);
    let targetId;

    if (target.is('span')) {
      targetId = target.parent().attr("href");
    } else {
      targetId = target.attr("href");
    }

    const container = document.querySelector(targetId + ' .calendar-container');
    clearContainer(container);

    return container;
  };

  $('a[data-calendar="tab"]').on('click', function (e) {
    const container = getEmptyContainer(e);

    destroyCalendar();
    showLoader();

    calendar = createCalendar(container);
    renderCalendar(calendar);
  });
});
