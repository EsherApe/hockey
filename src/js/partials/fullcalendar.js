document.addEventListener('DOMContentLoaded', function() {
  const calendarTodayEl = document.getElementById('calendarToday');
  const calendarTournamentEl = document.getElementById('calendarTournament');
  const calendarOtherEl = document.getElementById('calendarOther');
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

  const renderCalendar = (calendar) => {
    return setTimeout(() => {
      hideLoader();
      calendar.render();
    }, 200)
  };

  const getId = (e) => {
    const target = $(e.target);
    let targetId;

    if (target.is('span')) {
      targetId = target.parent().attr("href");
    } else {
      targetId = target.attr("href");
    }

    // $(targetId + ' .calendar-container');

    return targetId;
  };

  $('a[data-calendar="tab"]').on('click', function (e) {
    showLoader();
    destroyCalendar();

    switch (getId(e)) {
      case '#pills-today':
        calendar = createCalendar(calendarTodayEl);
        renderCalendar(calendar);
        break;
      case '#pills-tournament':
        $(calendarTournamentEl).empty();
        calendar = createCalendar(calendarTournamentEl);
        renderCalendar(calendar);
        break;
      case '#pills-other':
        calendar = createCalendar(calendarOtherEl);
        renderCalendar(calendar);
        break;
    }
  });
});
