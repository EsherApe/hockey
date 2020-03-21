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
  const tabHeight = $(calendarTournamentEl).height();

  const destroyCalendar = () => {
    calendar && calendar.destroy();
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

  const getTabPaneId = (e) => {
    const target = $(e.target);
    let tabPaneId;

    if (target.is('span')) {
      tabPaneId = target.parent().attr("href");
    } else {
      tabPaneId = target.attr("href");
    }

    return tabPaneId
  };

  const getEmptyCalendarContainer = (e) => {
    destroyCalendar();

    const tabPaneId = getTabPaneId(e);
    const container = document.querySelector(tabPaneId + ' .calendar-container');
    clearContainer(container);

    return container;
  };

  const showLoader = () => {
    console.log();
    $('.lds-dual-ring').each((i, el) => {
      $(el).height(tabHeight).show();
    });
  };

  const hideLoader = () => {
    $('.lds-dual-ring').each((i, el) => {
      $(el).hide();
    });
  };

  $('a[data-calendar="tab"]').on('click', function (e) {
    const container = getEmptyCalendarContainer(e);

    showLoader();

    calendar = createCalendar(container);
    renderCalendar(calendar);
  });
});
